import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4" role="status" aria-live="polite">
      <div className="w-full max-w-xl flex flex-col items-center gap-5">
        <Skeleton className="w-48 h-8 rounded-lg" />
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-4/5 h-4 rounded-md" />
        <Skeleton className="w-3/5 h-4 rounded-md" />
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}