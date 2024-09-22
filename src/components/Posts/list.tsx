type ListProps = {
  posts?: Post[];
  isLoading: boolean;
};
export function List({ posts, isLoading }: ListProps) {
  if (isLoading || !posts) {
    return "Loading...";
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex justify-between items-center gap-x-6 py-5 px-5"
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                {post.title}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {post.body}
              </p>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <button className="btn btn-warning">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
