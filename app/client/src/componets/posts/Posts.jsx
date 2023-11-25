import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { makeRequests } from "../../axios";

const Posts = () => {
  const fetchFn = async () => {
    const data = makeRequests.get("/posts").then((resp) => resp.data);
    return data;
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchFn,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="posts">
      {data && data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
