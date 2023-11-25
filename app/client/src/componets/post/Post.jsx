import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { makeRequests } from "../../axios";
import moment from "moment";
import "./post.scss";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../comments/Comments";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  // const [isLiked, setIsLiked] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [displayComments, setDisplayComments] = useState(false);

  //Mutation

  const queryClient = useQueryClient();
  const likePost = async () => {
    try {
      const resp = await makeRequests.post("/likes?post_id=" + post.id);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error after logging
    }
  };

  const unLikePost = async () => {
    try {
      const resp = await makeRequests.delete("/likes?post_id=" + post.id);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error after logging
    }
  };

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (!liked) return likePost();
      return unLikePost();
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["likes"], { refetchActive: true });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleLike = () => {
    const flag = data.map((item) => item.user_id).includes(isLoggedIn.id);
    mutation.mutate(flag);
  };
  const fetchLikesFn = async () => {
    const data = makeRequests
      .get("/likes?post_id=" + post.id)
      .then((resp) => resp.data);

    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: fetchLikesFn,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="user-info">
            <Link to={`/profile/${post.user_id}`}>
              <img src={post.profile_img_url} alt="" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img_url && <img src={`/uploads/${post.img_url}`} alt="" />}
        </div>
        <div className="info">
          <div className="item likes">
            <button onClick={handleLike}>
              {isLoading ? (
                "... Loading"
              ) : !data.map((item) => item.user_id).includes(isLoggedIn.id) ? (
                <FavoriteBorderOutlinedIcon />
              ) : (
                <FavoriteOutlinedIcon />
              )}
            </button>
            <span>{data && data.length} Likes</span>
          </div>
          <div className=" item comments">
            <button onClick={() => setDisplayComments(!displayComments)}>
              <TextsmsOutlinedIcon />
            </button>
            <span>comments</span>
          </div>
          <div className="item shares">
            <button>
              <ShareOutlinedIcon />
            </button>
            <span>shares</span>
          </div>
        </div>
        {displayComments && <Comments post_id={post.id} />}
      </div>
    </div>
  );
};
export default Post;
