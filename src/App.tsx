import "@fontsource-variable/inter";
import "./App.css";
import { PostsList } from "./components/Posts";
import { SearchInput } from "./components/SearchInput";
import { useSearchPosts } from "./hooks/useSearchPosts";
import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: posts, isLoading } = useSearchPosts(searchQuery);
  return (
    <main>
      <section className="p-2 bg-gray-200 dark:bg-gray-800">
        <SearchInput onChange={setSearchQuery} />
      </section>
      <PostsList posts={posts} isLoading={isLoading} />
    </main>
  );
};

export default App;
