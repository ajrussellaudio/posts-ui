import { FzfResultItem } from "fzf";
import { HighlightedTitle } from "./highlighted-title";
import { DeleteButton } from "./delete-button";

type ListProps = {
  postSearchResult?: FzfResultItem<Post>[];
  isLoading: boolean;
};

export function List({ postSearchResult, isLoading }: ListProps) {
  if (isLoading || !postSearchResult) {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {Array.from({ length: 40 }).map((_, i) => (
          <li key={i} className="flex justify-between items-center gap-x-6 p-5">
            <div className="flex flex-col min-w-0 gap-4">
              <div className="skeleton h-5 w-96"></div>
              <div className="skeleton h-5 w-96"></div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className="skeleton h-12 w-20"></div>
            </div>
          </li>
        ))}
      </ul>
    );
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
            <DeleteButton postId={post.item.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
