import "@fontsource-variable/inter";
import "./App.css";
import { PostsList } from "./components/Posts";
import { SearchInput } from "./components/SearchInput";
import { useSearchPosts } from "./hooks/useSearchPosts";
import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useSearchPosts(searchQuery);
  return (
    <main className="">
      <section className="p-2 bg-gray-200 dark:bg-gray-800 md:sticky md:inset-x-0 md:top-0">
        <SearchInput
          className="md:max-w-2xl md:mx-auto"
          onChange={setSearchQuery}
        />
      </section>
      <section className="md:max-w-2xl md:mx-auto">
        <PostsList postSearchResult={data} isLoading={isLoading} />
      </section>
    </main>
  );
};

export default App;
