import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );

      if (!response.ok) {
        throw new Error("Network request was not ok");
      }

      return response.json();
    },
  });
}
