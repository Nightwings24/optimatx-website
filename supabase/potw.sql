-- OptimatX Problem-of-the-Week leaderboard schema.
-- Run this ONCE in the Supabase SQL editor (Dashboard -> SQL -> New query -> Run).
--
-- Security model:
--   * potw_problems holds the accepted answers and is NEVER readable by the
--     browser (no RLS policy => the anon role is denied). Only the SECURITY
--     DEFINER function submit_potw() reads it, so answers stay hidden.
--   * potw_solves is publicly READABLE (that's the leaderboard) but NOT writable
--     by anyone directly - the only way a row lands there is a correct answer
--     through submit_potw().
--   * Identity is honor-system: name + roll. Points de-dupe by (problem, roll).

-- ---------- tables ----------
create table if not exists public.potw_problems (
  id       text primary key,             -- the POTW number as text, e.g. '14'
  title    text not null,
  accepted text[] not null,              -- accepted answers
  active   boolean not null default false
);

create table if not exists public.potw_solves (
  id         bigint generated always as identity primary key,
  problem_id text not null,
  roll       text not null,
  name       text not null,
  solved_at  timestamptz not null default now(),
  unique (problem_id, roll)              -- one score per person per problem
);

alter table public.potw_problems enable row level security;
alter table public.potw_solves   enable row level security;

-- Anyone may READ solves (public leaderboard); no one may write directly.
drop policy if exists "solves are public" on public.potw_solves;
create policy "solves are public" on public.potw_solves for select using (true);
-- potw_problems has RLS on and NO policies => anon cannot read the answers.

-- ---------- leaderboard view ----------
create or replace view public.potw_leaderboard as
  select roll,
         (array_agg(name order by solved_at desc))[1] as name,
         count(*)::int                                as points,
         max(solved_at)                               as last_solved
  from public.potw_solves
  group by roll
  order by points desc, last_solved asc;

grant select on public.potw_leaderboard to anon, authenticated;

-- ---------- submission function (server-side answer check) ----------
create or replace function public.submit_potw(
  p_problem_id text,
  p_answer     text,
  p_name       text,
  p_roll       text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  prob       public.potw_problems%rowtype;
  norm       text := lower(btrim(p_answer));
  a          text;
  is_correct boolean := false;
  inserted   boolean := false;
  pts        int;
begin
  if btrim(coalesce(p_name, '')) = '' or btrim(coalesce(p_roll, '')) = '' then
    return jsonb_build_object('status', 'error', 'message', 'Name and roll are required.');
  end if;

  select * into prob from public.potw_problems where id = p_problem_id;
  if not found or not prob.active then
    return jsonb_build_object('status', 'closed');
  end if;

  foreach a in array prob.accepted loop
    if lower(btrim(a)) = norm then
      is_correct := true;
      exit;
    end if;
    begin                               -- numeric-tolerant compare
      if a::numeric = p_answer::numeric then
        is_correct := true;
        exit;
      end if;
    exception when others then
      null;                             -- not numeric, ignore
    end;
  end loop;

  if not is_correct then
    return jsonb_build_object('status', 'incorrect');
  end if;

  insert into public.potw_solves (problem_id, roll, name)
  values (p_problem_id, btrim(p_roll), btrim(p_name))
  on conflict (problem_id, roll) do nothing;
  inserted := found;                    -- false if the person had already solved it

  select count(*)::int into pts from public.potw_solves where roll = btrim(p_roll);

  return jsonb_build_object(
    'status',  'correct',
    'already', not inserted,
    'points',  pts
  );
end;
$$;

grant execute on function public.submit_potw(text, text, text, text) to anon, authenticated;

-- ---------- live updates (optional but recommended) ----------
-- Lets every open leaderboard refresh the instant someone solves.
alter publication supabase_realtime add table public.potw_solves;

-- ---------- seed the current open problem ----------
-- EDIT the id (POTW number) and accepted answers, then keep exactly ONE row
-- active = true. To open a new week: set the old row active=false and insert
-- the new one active=true.
insert into public.potw_problems (id, title, accepted, active) values
  ('14', 'A definite integral', array['1'], true)
on conflict (id) do update
  set title = excluded.title, accepted = excluded.accepted, active = excluded.active;
