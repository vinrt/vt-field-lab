export function bookAnchor(title: string): string {
  return `book-${encodeURIComponent(title)}`;
}
export function bookRoute(title: string): string {
  return `/books#${bookAnchor(title)}`;
}
