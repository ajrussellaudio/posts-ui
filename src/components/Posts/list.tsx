import { FzfResultItem } from "fzf";
import { HighlightedTitle } from "./highlighted-title";

type ListProps = {
  postSearchResult?: FzfResultItem<Post>[];
  isLoading: boolean;
};

export function List({ postSearchResult, isLoading }: ListProps) {
  if (isLoading || !postSearchResult) {
    return "Loading...";
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {postSearchResult.map((post) => (
        <li
          key={post.item.id}
          className="flex justify-between items-center gap-x-6 py-5 px-5"
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                <HighlightedTitle indices={post.positions}>
                  {post.item.title}
                </HighlightedTitle>
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {post.item.body}
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
