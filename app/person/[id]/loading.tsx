export default function PersonLoading() {
  return (
    <div className="w-full py-8 animate-pulse">
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="w-48 h-72 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 min-w-0 max-w-2xl">
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
