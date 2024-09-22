import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { usePosts } from "./usePosts";
import { createWrapper } from "@/utils/create-wrapper";
import { server } from "@/mocks/server";

describe("usePosts", () => {
  it("returns a list of posts", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/posts", () => {
        return HttpResponse.json([
          {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          },
        ]);
      }),
    );
    const { result } = renderHook(usePosts, { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data![1].title).toBe("qui est esse");
  });
});
