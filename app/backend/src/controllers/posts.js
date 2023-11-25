import { db } from "../connect.js";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../temp.js";
import moment from "moment";

const testPost = (req, res) => {
  res.send("hello from posts");
};

const getPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, SECRET_KEY, (err, user_data) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "SELECT DISTINCT p.*, u.id as user_id, name, profile_img_url from posts AS p JOIN users AS u ON (u.id = p.user_id) LEFT JOIN relationships AS r ON (p.user_id = r.followed_uid) WHERE r.follower_uid = ? OR p.user_id = ? ORDER BY p.created_at DESC";

    db.query(q, [user_data.id, user_data.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, SECRET_KEY, (err, user_data) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO posts (`desc`, `img_url`,`created_at`,`user_id`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img_url,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      user_data.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    });
  });
};
export { testPost, getPost, addPost };
