import { useContext } from "react";
import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
const LeftBar = () => {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  const USER = isLoggedIn;

  return (
    <div className="leftBar">
      <div className="container">
        <div className="item">
          <div className="user">
            <div className="user-info">
              <img
                src={USER.profile_img_url}
                style={{ width: "50px", height: "50px" }}
                alt=""
              />
              <span>{USER.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftBar;
