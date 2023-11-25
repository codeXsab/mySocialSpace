import { useState, useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequests } from "../../axios";
import moment from "moment";

const Comments = ({ post_id }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [currComment, setCurrComment] = useState("");

  const fetchFn = async () => {
    const resp = await makeRequests.get("/comments?post_id=" + post_id);
    return resp.data;
  };

  const addCommentFn = async (newCommnet) => {
    try {
      if (!newCommnet) return;
      const resp = await makeRequests.post("/comments/", newCommnet);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error after logging
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchFn,
  });

  //Mutation

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => addCommentFn(newComment),
    onSuccess: (data, variables, context) => {
      console.log("Mutation success:", data);
      queryClient.invalidateQueries(["comments"], { refetchActive: true });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      desc: currComment,
      post_id,
    });
    console.log(currComment);
    setCurrComment("");
    return;
  };

  if (isLoading) {
    return <p>isLoading</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={isLoggedIn.profile_img_url} alt="" />
        <input
          onChange={(e) => setCurrComment(e.target.value)}
          type="text"
          placeholder="write a comment"
          value={currComment}
        />
        <button onClick={handleSubmit} type="submit">
          Send
        </button>
      </div>
      {data &&
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.profile_img_url} />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.created_at).fromNow()}</span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
