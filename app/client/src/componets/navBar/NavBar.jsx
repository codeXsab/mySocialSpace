import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./navBar.scss";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
  const { isDarkMode, darkModeToggleFunc } = useContext(DarkModeContext);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  //console.log("Dark Mode value from NavBar", isDarkMode);
  //console.log("Dark Mode Func value from NavBar", darkModeToggleFunc);
  //const USER_IMAGE_PATH = "src\\assets\\profile\\profile-00.jpg";
  const USER = isLoggedIn;

  return (
    <div className="navBar">
      <div className="left">
        {isDarkMode ? (
          <DarkModeOutlinedIcon onClick={() => darkModeToggleFunc()} />
        ) : (
          <WbSunnyOutlinedIcon onClick={() => darkModeToggleFunc()} />
        )}
        <GridViewOutlinedIcon />
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>My Social Space</span>
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="search" />
        </div>
      </div>
      <div className="right">
        <div className="user">
          <img src={USER.profile_img_url} alt={USER.username} />
          <span>{USER.name}</span>
        </div>
        <button onClick={() => logoutUser()}>Logout</button>
      </div>
    </div>
  );
};
export default NavBar;
