import { useQuery } from "@tanstack/react-query";
import { usePosts } from "./usePosts";
import { Fzf } from "fzf";

export function useSearchPosts(query: string) {
  const posts = usePosts();

  return useQuery({
    queryKey: ["search-posts", query, posts.data],
    queryFn: () => {
      const fzf = new Fzf(posts.data!, {
        selector: (post) => post.title,
      });
      return fzf.find(query).map(({ item }) => item);
    },
    enabled: !!posts.data,
  });
}
