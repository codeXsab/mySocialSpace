import { db } from "../connect.js";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../temp.js";
import moment from "moment";

const testComments = (req, res) => {
  res.send("hello from comments");
};

const getComments = (req, res) => {
  const q =
    "SELECT c.*, u.id AS user_id, name, profile_img_url FROM comments AS c JOIN users AS u ON (u.id = c.user_id) WHERE c.post_id = ? ORDER BY c.created_at DESC";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const addComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In");

  jwt.verify(token, SECRET_KEY, (err, user_data) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO comments (`desc`,`created_at`,`user_id`, `post_id`) VALUES (?)";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      user_data.id,
      req.body.post_id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    });
  });
};

export { testComments, getComments, addComments };
