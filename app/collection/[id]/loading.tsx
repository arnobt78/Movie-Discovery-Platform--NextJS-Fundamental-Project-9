export default function CollectionLoading() {
  return (
    <div className="w-full py-8 animate-pulse">
      <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-48 rounded-lg bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
}
