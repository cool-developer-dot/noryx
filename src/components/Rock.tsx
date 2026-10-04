/**
 * The hero monolith. It used to be a live SVG with turbulence / displacement / lighting / blur filters,
 * which the browser had to re-rasterise whenever anything near it repainted. It is now the same artwork
 * rendered once to a transparent WebP (source: design/rock-source.svg), so scrolling and the hero
 * animations stay smooth on phones.
 */
export default function Rock({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/rock.webp"
      alt=""
      aria-hidden
      width={1600}
      height={1280}
      decoding="async"
      fetchPriority="low"
      className={`${className} select-none object-cover object-right-bottom`}
    />
  );
}
