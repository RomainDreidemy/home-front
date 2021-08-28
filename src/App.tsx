import React, { ReactElement, useEffect, useState } from "react";
import { Post } from "./api/api";
import Router from "./components/organisms/Router";
import { PostType } from "./models/post.interface";
import "./App.css";

const App = (): ReactElement => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    (async function asyncCall() {
      try {
        const response = await Post.getPosts();
        setPosts(response);
      } catch (e) {
        console.log("execption catch");
      }
    })();
  }, []);

  return (
    <>
      <Router />

      {posts.map((post: PostType) => (
        <div className="btn btn-green" key={post.id}>
          {post.title}
        </div>
      ))}
    </>
  );
};

export default App;
