import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bezgradski",
    start_url: "/login",
    display: "standalone",
    short_name: "Bezgradski",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/pwa-logox192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/pwa-logox512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  };
}
