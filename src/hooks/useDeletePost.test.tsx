import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDeletePost } from "./useDeletePost";
import { createWrapper } from "@/utils/create-wrapper";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("useDeletePost", () => {
  const POST_ID = 123;

  beforeEach(() => {
    server.use(
      http.delete(
        `https://jsonplaceholder.typicode.com/posts/${POST_ID}`,
        () => {
          return new HttpResponse(null, { status: 200 });
        },
      ),
    );
  });

  it("deletes a post", async () => {
    const onSettledMock = vi.fn();
    function Page() {
      const { mutate: deletePost } = useDeletePost(POST_ID, {
        onSettled: onSettledMock,
      });

      return (
        <div>
          <button onClick={() => deletePost()}>Delete</button>
        </div>
      );
    }

    render(<Page />, { wrapper: createWrapper() });
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    await waitFor(() => expect(onSettledMock).toHaveBeenCalled());
  });
});
