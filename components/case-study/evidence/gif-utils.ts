/** Strip cache-bust query from GIF src (safe for server + client). */
export function stripGifQuery(src: string): string {
  const q = src.indexOf("?");
  return q >= 0 ? src.slice(0, q) : src;
}

export function isGifSrc(src: string): boolean {
  return stripGifQuery(src).toLowerCase().endsWith(".gif");
}
