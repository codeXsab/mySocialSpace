import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./story.scss";

const Story = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const USER = isLoggedIn;
  const stories = [
    {
      id: 1,
      name: "Violet",
      img: "https://images.pexels.com/photos/160599/beauty-leather-style-girl-160599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "James",
      img: "https://images.pexels.com/photos/14382821/pexels-photo-14382821.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    },
    {
      id: 3,
      name: "Renne",
      img: "https://images.pexels.com/photos/18624572/pexels-photo-18624572/free-photo-of-beautiful-brunette-woman-in-coat-and-white-top.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Albert",
      img: "https://images.pexels.com/photos/6152120/pexels-photo-6152120.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    },
    {
      id: 5,
      name: "Ray",
      img: "https://images.pexels.com/photos/19137877/pexels-photo-19137877/free-photo-of-a-woman-sitting-on-the-floor-with-her-hands-on-her-knees.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    },
    {
      id: 6,
      name: "Jonny",
      img: "https://images.pexels.com/photos/18866508/pexels-photo-18866508/free-photo-of-cheerful-woman-with-guitar-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    },
  ];
  return (
    <div className="stories">
      <div className="story">
        <img src={USER.profile_img_url} alt={USER.username} />
        <span>{USER.username}</span>
        <button>+</button>
      </div>
      {stories.map((story) => {
        return (
          <div className="story" key={story.id}>
            <img src={story.img} alt="" />
            <span>{story.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Story;
