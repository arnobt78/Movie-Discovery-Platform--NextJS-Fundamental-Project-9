"use client";

/**
 * MovieCardSkeleton - matches MovieCard dimensions to prevent layout shift.
 */
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";

export function MovieCardSkeleton() {
  return (
    <Card className="max-w-sm m-3 overflow-hidden">
      <Skeleton className="w-full aspect-[2/3] rounded-t-lg rounded-b-none" />
      <div className="p-5">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
}
