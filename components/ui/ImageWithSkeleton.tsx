"use client";

import { useState } from "react";
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

  return (
    <div className={`relative overflow-hidden ${aspect} w-full`}>
      {!loaded && (
        <Skeleton className={`absolute inset-0 h-full w-full ${skeletonClassName}`} />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}