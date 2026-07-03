import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// Web app manifest. Next injects <link rel="manifest"> with the correct basePath,
// but values INSIDE the manifest (start_url, icon src) must carry the sub-path
// themselves - so they are built from SITE.url (which includes any base path).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.fullName,
    short_name: SITE.short,
    description: SITE.description,
    start_url: `${SITE.url}/`,
    display: "standalone",
    background_color: "#0B0D14",
    theme_color: "#0B0D14",
    icons: [
      {
        src: `${SITE.url}/assets/optimatx-mark.png`,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
