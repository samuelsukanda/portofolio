import { useState } from "react"

type BlurImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  imgStyle?: React.CSSProperties
  loading?: "lazy" | "eager"
  fetchPriority?: "high" | "low" | "auto"
}

export function BlurImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  imgStyle,
  loading = "lazy",
  fetchPriority = "auto",
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative size-full overflow-hidden bg-surface-2 ${className}`}>
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-2 via-surface to-surface-2"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        className={`size-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        style={imgStyle}
      />
    </div>
  )
}
