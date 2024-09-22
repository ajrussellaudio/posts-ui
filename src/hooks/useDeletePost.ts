import { MutateOptions, useMutation } from "@tanstack/react-query";

export function useDeletePost(postId: number, options: MutateOptions) {
  return useMutation({
    mutationKey: ["delete-post", postId],
    mutationFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error(`Failed to delete post #${postId}`);
      }
      return response.json();
    },
    ...options,
  });
}
