export function generateManifest(appName: string = "Your App", themeColor: string = "#ffffff", backgroundColor: string = "#ffffff") {
  return {
    name: appName,
    short_name: appName,
    description: `${appName} Progressive Web App`,
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/favicon-384x384.png",
        sizes: "384x384",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
} 