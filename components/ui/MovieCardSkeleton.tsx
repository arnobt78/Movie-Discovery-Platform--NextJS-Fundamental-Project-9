"use client";

/**
 * MovieCardSkeleton - matches MovieCard dimensions to prevent layout shift.
 */
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";

interface MovieCardSkeletonProps {
  className?: string;
}

export function MovieCardSkeleton({ className }: MovieCardSkeletonProps) {
  return (
    <Card className={cn("h-full max-w-sm overflow-hidden w-full min-w-0 flex flex-col", className)}>
      <Skeleton className="w-full aspect-[2/3] rounded-t-lg rounded-b-none flex-shrink-0" />
      <div className="p-5 flex-1 flex flex-col min-h-0">
        <div className="flex flex-wrap gap-2 mb-2">
          <Skeleton className="h-5 w-12 rounded-md" />
          <Skeleton className="h-5 w-10 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-12 rounded-md" />
        </div>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
}
