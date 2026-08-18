"use client";

import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ImageWithSkeleton({
  src,
  alt,
  aspect = "aspect-video",
  imgClassName = "",
  skeletonClassName = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  aspect?: string;
  imgClassName?: string;
  skeletonClassName?: string;
  loading?: "lazy" | "eager";
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${aspect} w-full`}>
      {!loaded && !failed && (
        <Skeleton className={`absolute inset-0 h-full w-full ${skeletonClassName}`} />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}