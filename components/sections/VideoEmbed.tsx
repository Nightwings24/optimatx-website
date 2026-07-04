// Bordered video embed for talk recordings, Manim explainers, and event
// aftermovies. Accepts ordinary YouTube / Vimeo URLs (watch links, youtu.be,
// or embed links) and converts them to the privacy-enhanced embed form.
// Unrecognized URLs fall back to a plain external link, so a typo in
// content/media.ts never renders a broken iframe.

function embedSrc(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export function VideoEmbed({
  url,
  title,
  caption,
}: {
  url: string;
  title: string;
  caption?: string;
}) {
  const src = embedSrc(url);

  return (
    <figure>
      {src ? (
        <div className="overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface">
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
            style={{ border: 0 }}
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="flex aspect-video w-full items-center justify-center rounded-card border-[1.5px] border-dashed border-line2 bg-surface p-6 text-center font-mono text-[13px] text-accent hover:underline"
        >
          Watch: {title} ↗
        </a>
      )}
      {caption && (
        <figcaption className="mt-2 text-[13px] text-ink2">{caption}</figcaption>
      )}
    </figure>
  );
}
