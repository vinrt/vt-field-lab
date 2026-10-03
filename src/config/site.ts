/** Public, owner-confirmed destinations only. Null keeps an unverified link hidden. */
export const siteLinks: { instagram: `https://www.instagram.com/${string}` | null; repository: `https://github.com/${string}` | null } = {
  // Keep the canonical profile URL here. QR/tracking parameters can expire or change.
  instagram: "https://www.instagram.com/asi_tattvam/",
  repository: null,
};
