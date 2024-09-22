import { renderHook, waitFor } from "@testing-library/react";
import { usePosts } from "./usePosts";
import { createWrapper } from "@/utils/create-wrapper";

describe("usePosts", () => {
  it("returns a list of posts", async () => {
    const { result } = renderHook(usePosts, { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
