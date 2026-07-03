// 2D linear-programming engine for the Optimization Corner visualiser.
//
// Variables x, y >= 0. Each constraint is a*x + b*y (<=|>=) c. The objective is
// p*x + q*y, maximised or minimised. The feasible region is the intersection of
// the constraint half-planes with the non-negative quadrant, clipped to the
// view box [0,xMax] x [0,yMax]. Because the region is convex and bounded (by the
// view box), the optimum is attained at a vertex - we enumerate the polygon
// vertices by successive half-plane clipping (Sutherland-Hodgman) and pick the
// best one.

export interface Constraint {
  a: number;
  b: number;
  op: "<=" | ">=";
  c: number;
  label?: string;
}

export interface Objective {
  p: number;
  q: number;
}

export type Sense = "max" | "min";

export interface Point {
  x: number;
  y: number;
}

export interface View {
  xMax: number;
  yMax: number;
}

export interface LPResult {
  /** Ordered feasible polygon vertices (clipped to the view). Empty if infeasible. */
  feasible: Point[];
  optimum: Point | null;
  value: number | null;
  status: "optimal" | "infeasible";
}

const EPS = 1e-9;

/** Intersection of segment p→q with the line a*x + b*y = c. Only called when p
 *  and q lie on opposite sides, so (dp - dq) is safely non-zero. */
function intersect(p: Point, q: Point, a: number, b: number, c: number): Point {
  const dp = a * p.x + b * p.y - c;
  const dq = a * q.x + b * q.y - c;
  const t = dp / (dp - dq);
  return { x: p.x + t * (q.x - p.x), y: p.y + t * (q.y - p.y) };
}

/** Clip a convex polygon by the half-plane a*x + b*y <= c (Sutherland-Hodgman). */
function clipHalfPlane(
  poly: Point[],
  a: number,
  b: number,
  c: number
): Point[] {
  if (poly.length === 0) return poly;
  const out: Point[] = [];
  const inside = (pt: Point) => a * pt.x + b * pt.y <= c + EPS;
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const cur = poly[i];
    const prev = poly[(i - 1 + n) % n];
    const curIn = inside(cur);
    const prevIn = inside(prev);
    if (curIn) {
      if (!prevIn) out.push(intersect(prev, cur, a, b, c));
      out.push(cur);
    } else if (prevIn) {
      out.push(intersect(prev, cur, a, b, c));
    }
  }
  return out;
}

/** Drop consecutive (and wrap-around) near-duplicate vertices. */
function dedupe(poly: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of poly) {
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - p.x) > 1e-7 || Math.abs(last.y - p.y) > 1e-7) {
      out.push(p);
    }
  }
  if (out.length > 1) {
    const first = out[0];
    const last = out[out.length - 1];
    if (Math.abs(first.x - last.x) < 1e-7 && Math.abs(first.y - last.y) < 1e-7) {
      out.pop();
    }
  }
  return out;
}

export function solveLP(
  constraints: Constraint[],
  objective: Objective,
  sense: Sense,
  view: View
): LPResult {
  // Start from the view box, which already encodes x >= 0, y >= 0 and the
  // outer bounds x <= xMax, y <= yMax.
  let poly: Point[] = [
    { x: 0, y: 0 },
    { x: view.xMax, y: 0 },
    { x: view.xMax, y: view.yMax },
    { x: 0, y: view.yMax },
  ];

  for (const con of constraints) {
    let { a, b, c } = con;
    if (con.op === ">=") {
      a = -a;
      b = -b;
      c = -c;
    }
    poly = clipHalfPlane(poly, a, b, c);
    if (poly.length === 0) {
      return { feasible: [], optimum: null, value: null, status: "infeasible" };
    }
  }

  poly = dedupe(poly);
  if (poly.length === 0) {
    return { feasible: [], optimum: null, value: null, status: "infeasible" };
  }

  const evalObj = (pt: Point) => objective.p * pt.x + objective.q * pt.y;
  let best = poly[0];
  let bestVal = evalObj(best);
  for (const v of poly) {
    const val = evalObj(v);
    const better = sense === "max" ? val > bestVal + EPS : val < bestVal - EPS;
    if (better) {
      best = v;
      bestVal = val;
    }
  }

  return { feasible: poly, optimum: best, value: bestVal, status: "optimal" };
}
