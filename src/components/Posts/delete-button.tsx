import { useDeletePost } from "@/hooks/useDeletePost";

type DeleteButtonProps = {
  postId: number;
};
export function DeleteButton({ postId }: DeleteButtonProps) {
  const { mutate: deletePost } = useDeletePost(postId, {
    onSuccess: () => console.log(`Deleted ID #${postId}`),
  });
  return (
    <button className="btn btn-warning" onClick={() => deletePost()}>
      Delete
    </button>
  );
}
