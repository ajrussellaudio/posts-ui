import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: PropsWithChildren) => {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}
