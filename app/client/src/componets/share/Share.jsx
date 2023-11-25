import "./share.scss";
import PeopleIcon from "@mui/icons-material/People";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequests } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  const fetchFn = async (newPost) => {
    try {
      if (!newPost.file && !newPost.desc) return;
      return makeRequests.post("/posts", newPost);
    } catch (error) {
      console.error(error);
    }
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequests.post("/upload/", formData);
      return res.data.file;
    } catch (error) {
      console.error(error);
      res.send(500).json(error);
    }
  };
  //Mutation
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => fetchFn(newPost),
    onSuccess: (data, variables, context) => {
      console.log("Mutation success:", data);
      queryClient.invalidateQueries(["posts"], { refetchActive: true });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image_url = "";
    if (file) image_url = await upload();
    mutation.mutate({ desc, img_url: image_url });
    setDesc("");
    setFile(null);
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={isLoggedIn.profile_img_url} alt="" />
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder={`What's on your mind ${isLoggedIn.name} ?`}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <div className="item">
                <AddPhotoAlternateIcon />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <PeopleIcon />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button type="submit" onClick={handleSubmit}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
