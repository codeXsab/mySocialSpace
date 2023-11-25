import { db } from "../connect.js";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../temp.js";
import moment from "moment";

const testLikes = (req, res) => {
  res.send("hello from Likes");
};

const getLikes = (req, res) => {
  const q = "SELECT user_id FROM likes WHERE post_id = ?";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const likePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, SECRET_KEY, (err, user_data) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "INSERT INTO likes (`user_id`, `post_id`) VALUES (?)";

    const values = [user_data.id, req.query.post_id];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(`Post ${values[1]} has been Liked by user${values[0]}`);
    });
  });
};

const unlikePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, SECRET_KEY, (err, user_data) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "DELETE FROM likes WHERE `user_id`= (?) AND `post_id` = (?)  ";
    const values = [user_data.id, req.query.post_id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json(`Post ${values[1]} has been unliked by user${values[0]}`);
    });
  });
};

export { testLikes, getLikes, likePost, unlikePost };
