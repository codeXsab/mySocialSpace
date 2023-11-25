import Posts from "../../componets/posts/Posts";
import Story from "../../componets/story/Story";
import Share from "../../componets/share/Share";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Story />
      <Share />
      <Posts />
    </div>
  );
};
export default Home;
