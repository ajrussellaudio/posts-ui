import { useQuery } from "@tanstack/react-query";

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
