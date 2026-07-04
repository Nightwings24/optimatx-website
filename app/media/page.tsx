import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { VideoEmbed } from "@/components/sections/VideoEmbed";
import { CtaBand } from "@/components/sections/CtaBand";
import { catVar } from "@/lib/categories";
import { asset } from "@/lib/assets";
import { albums, videos } from "@/content/media";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Photos from OptimatX events and recordings of talks and explainers - the club, on camera.",
};

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="The club, on camera."
        lead="Photos from events and recordings of talks and explainers. For the interactive math art, see the Gallery."
        color="amber"
      />

      {/* Photo albums */}
      <section className="container-site pb-16">
        <SectionEyebrow color="amber">Photos</SectionEyebrow>
        <h2 className="sr-only">Event photo albums</h2>
        {albums.length === 0 ? (
          <p className="mt-6 text-[15px] text-ink2">
            No albums yet - photos land here after each event.
          </p>
        ) : (
          <div className="mt-6 space-y-[18px]">
            {albums.map((album) => {
              const c = catVar(album.color);
              return (
                <div
                  key={album.id}
                  className="overflow-hidden rounded-card border-[1.5px] border-line2 bg-surface"
                >
                  <div className="flex flex-wrap items-center gap-4 border-b border-line p-5">
                    <span
                      aria-hidden
                      className="inline-flex h-11 w-11 items-center justify-center rounded-icon text-xl font-bold"
                      style={{
                        color: c,
                        background: `color-mix(in srgb, ${c} 15%, transparent)`,
                      }}
                    >
                      {album.glyph}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[17px] font-bold tracking-tight text-ink">
                        {album.title}
                      </h3>
                      <p className="text-[13.5px] text-ink2">{album.description}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-ink3">
                      {album.dateChip}
                    </span>
                  </div>
                  {album.photos.length === 0 ? (
                    <p className="p-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink3">
                      Photos coming soon
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3 lg:grid-cols-4">
                      {album.photos.map((p) => (
                        <img
                          key={p.src}
                          src={asset(p.src)}
                          alt={p.alt}
                          loading="lazy"
                          className="aspect-square w-full rounded-btn border border-line2 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Videos */}
      <section className="container-site pb-16">
        <SectionEyebrow color="violet">Videos</SectionEyebrow>
        <h2 className="mb-2 mt-2 text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold tracking-tight text-ink">
          Talks & explainers
        </h2>
        <p className="mb-6 max-w-2xl text-[15px] text-ink2">
          Recordings from Friday Evening Talks, animated explainers, and event
          aftermovies.
        </p>
        {videos.length === 0 ? (
          <p className="text-[15px] text-ink2">
            No recordings yet - check back after the next talk.
          </p>
        ) : (
          <div className="grid gap-[18px] md:grid-cols-2">
            {videos.map((v) => (
              <VideoEmbed key={v.id} url={v.url} title={v.title} caption={v.caption} />
            ))}
          </div>
        )}
      </section>

      <section className="container-site pb-8">
        <CtaBand
          title="Caught a good moment?"
          subtitle="Send us your photos from any event and we'll add them to the album - the best shot makes the poster next year."
          primary={{ label: "Contact us →", href: "/contact" }}
          secondary={{ label: "See events", href: "/events" }}
        />
      </section>
    </>
  );
}
