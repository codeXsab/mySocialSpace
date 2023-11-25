import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";

import Posts from "../../componets/posts/Posts";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { makeRequests } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const user_id = useLocation().pathname.split("/")[2];

  const fetchProfileFn = async () => {
    const res = await makeRequests.get("/users/find/" + user_id);
    return res.data;
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile", user_id],
    queryFn: fetchProfileFn,
  });

  console.log(data);
  console.log(isLoggedIn);
  return (
    <div className="posts-profile-container">
      {data && (
        <div className="profile">
          <div className="image-container">
            <img className="cover-image" src={data.cover_img_url} alt="" />
            <img className="profile-image" src={data.profile_img_url} alt="" />
          </div>
          <div className="profile-container">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://instagram.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://x.com">
                <TwitterIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <div className="info">{data.name}</div>
            </div>
            <div className="right">
              <button>{isLoggedIn.id === data.id ? "Update" : "Follow"}</button>
            </div>
          </div>
        </div>
      )}
      <Posts />
    </div>
  );
};
export default Profile;
