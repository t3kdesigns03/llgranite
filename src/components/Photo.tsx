import { preload } from "react-dom";
import { images, type ImageName } from "@/lib/images.generated";

type Props = {
  name: ImageName;
  alt: string;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes?: string;
  /** Above-the-fold hero: loads eagerly at high priority and is preloaded in <head>. */
  priority?: boolean;
  /** Fill the (positioned) parent and crop with object-fit: cover. Otherwise keeps its own aspect ratio. */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Responsive WebP photo built by `npm run images`. Width/height are always set (no layout shift),
 * and a 16px blurred copy sits underneath as a placeholder until the real image paints.
 */
export default function Photo({ name, alt, sizes = "100vw", priority, fill, className = "", imgClassName = "" }: Props) {
  const img = images[name];
  const srcSet = img.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ");
  const src = `/images/${name}-${img.widths[Math.min(2, img.widths.length - 1)]}.webp`;

  if (priority) preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });

  return (
    <span
      className={`photo block overflow-hidden bg-stone-200 ${fill ? "absolute inset-0" : "relative"} ${className}`}
      style={{ backgroundImage: `url(${img.blur})` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimized static files, see scripts/build-images.mjs */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className={`${fill ? "absolute inset-0 h-full w-full object-cover" : "block h-auto w-full"} ${imgClassName}`}
        style={{ objectPosition: img.focus }}
      />
    </span>
  );
}
