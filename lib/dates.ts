/** "June 15, 2026" from an ISO date, build-time safe (no locale surprises).
 *  Lives here (not lib/blog.ts) so client islands can import it without
 *  dragging node:fs into the browser bundle. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}
