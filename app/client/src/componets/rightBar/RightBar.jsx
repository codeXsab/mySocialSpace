import "./rightBar.scss";
import CloseIcon from "@mui/icons-material/Close";
const USER_IMAGE_PATH = [
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4927361/pexels-photo-4927361.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/6948652/pexels-photo-6948652.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5372800/pexels-photo-5372800.jpeg?auto=compress&cs=tinysrgb&w=600",
];
const rightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="user-info">
              <img src={USER_IMAGE_PATH[1]} alt="" />
              <span>Jeremy Fisher</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button className="close">
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={USER_IMAGE_PATH[2]} alt="" />
              <span>Jenny Kim</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button className="close">
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="user-info">
              <img src={USER_IMAGE_PATH[3]} alt="" />
              <p>
                <span>Jasmine</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={USER_IMAGE_PATH[4]} alt="" />
              <p>
                <span>Jessi </span> changed their cover picture
              </p>
            </div>
            <span>4 min ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={USER_IMAGE_PATH[5]} alt="" />
              <p>
                <span>Jonah Smith</span> liked your cover picture
              </p>
            </div>
            <span>10 min ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src={USER_IMAGE_PATH[1]} alt="" />
              <p>
                <span>Jeremy Fisher</span> liked your cover picture
              </p>
            </div>
            <span>20 min ago</span>
          </div>
        </div>
        <div className="item">
          <div className="container">
            <span>Online Friends</span>
            <div className="user">
              <div className="user-info">
                <img src={USER_IMAGE_PATH[4]} alt="" />
                <div className="online" />
                <span>Jessie</span>
              </div>
            </div>
            <div className="user">
              <div className="user-info">
                <img src={USER_IMAGE_PATH[3]} alt="" />
                <div className="online" />
                <span>Jasmine</span>
              </div>
            </div>
            <div className="user">
              <div className="user-info">
                <img src={USER_IMAGE_PATH[5]} alt="" />
                <div className="online" />
                <span>Jonah Smith</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default rightBar;
