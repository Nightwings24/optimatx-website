// Clean bordered iframe slots for a Google Calendar (Events) and a map
// (Contact). If no src is configured (env var unset), a tidy placeholder shows
// instead of a broken embed.

function EmbedFrame({
  src,
  title,
  placeholder,
}: {
  src?: string;
  title: string;
  placeholder: string;
}) {
  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-card border-[1.5px] border-dashed border-line2 bg-surface p-6 text-center font-mono text-[13px] text-ink3">
        {placeholder}
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="aspect-video w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}

export function CalendarEmbed({
  src = process.env.NEXT_PUBLIC_GCAL_SRC,
}: {
  src?: string;
}) {
  return (
    <EmbedFrame
      src={src}
      title="OptimatX event calendar"
      placeholder="Calendar embed goes here - set NEXT_PUBLIC_GCAL_SRC to your Google Calendar."
    />
  );
}

export function MapEmbed({
  src = process.env.NEXT_PUBLIC_MAP_SRC,
}: {
  src?: string;
}) {
  return (
    <EmbedFrame
      src={src}
      title="IIT Patna campus map"
      placeholder="Map embed goes here - set NEXT_PUBLIC_MAP_SRC to a Google Maps embed URL."
    />
  );
}
