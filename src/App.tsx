import "@fontsource-variable/inter";
import "./App.css";
import { PostsList } from "./components/Posts";
import { usePosts } from "./hooks/usePosts";

const App = () => {
  const { data: posts, isLoading } = usePosts();
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello Twinkl!</h1>
      <PostsList posts={posts} isLoading={isLoading} />
    </main>
  );
};

export default App;
