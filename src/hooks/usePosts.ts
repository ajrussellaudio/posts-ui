import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: () => "POSTS" });
}
