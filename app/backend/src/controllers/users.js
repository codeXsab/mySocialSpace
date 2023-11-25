import { db } from "../connect.js";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../../temp.js";
import moment from "moment";

const testUser = (req, res) => {
  res.send("hello from users");
};

const getUser = (req, res) => {
  const user_id = req.params.userID;
  const q = "SELECT * from users WHERE id= (?)";

  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...otherInfo } = data[0];
    return res.json(otherInfo);
  });
};
export { testUser, getUser };
