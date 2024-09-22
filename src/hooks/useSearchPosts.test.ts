import { server } from "@/mocks/server";
import { createWrapper } from "@/utils/create-wrapper";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { useSearchPosts } from "./useSearchPosts";

describe("useSearchPosts", () => {
  beforeEach(() => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/posts", () => {
        return HttpResponse.json([
          {
            userId: 1,
            id: 1,
            title: "Finnegans Wake",
            body: "Riverrun, past Eve and Adam’s, from swerve of shore to bend of bay, brings us by a commodius vicus of recirculation back to Howth Castle and Environs.",
          },
          {
            userId: 2,
            id: 2,
            title: "Moby Dick",
            body: "Call me Ishmael.",
          },
          {
            userId: 2,
            id: 2,
            title: "Adventures of Huckleberry Finn",
            body: "You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain’t no matter.",
          },
        ]);
      }),
    );
  });

  it("returns all posts by default", async () => {
    const { result } = renderHook(() => useSearchPosts(""), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(3);
  });

  it("returns matches for a string, one match", async () => {
    const { result } = renderHook(() => useSearchPosts("dick"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(1);
  });

  it("returns matches for a string, two matches", async () => {
    const { result } = renderHook(() => useSearchPosts("fin"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(2);
  });

  it("returns matches for a string, zero matches", async () => {
    const { result } = renderHook(() => useSearchPosts("batman"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(0);
  });
});
