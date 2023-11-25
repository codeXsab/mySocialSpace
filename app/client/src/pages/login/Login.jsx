import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Login = () => {
  const URL = "http://localhost:8800/api/auth/login";

  const navigator = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const { isLoggedIn, loginUser } = useContext(AuthContext);
  const handleInputChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!inputs.username || !inputs.password) {
        setError("Required Fields cannot be empty");
        return;
      }
      const response = await axios.post(URL, inputs, {
        withCredentials: true,
      });
      const currUser = response.data;
      loginUser(currUser);
      console.log(isLoggedIn);
    } catch (error) {
      if (error) setErrorMsg(error.response.data);
      console.error(error.response.data);
      return;
    }
    navigator("/");
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>My Social Space</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
            expedita, autem nulla nemo iusto eligendi recusandae dignissimos sed
            magni non ab modi iure quam dicta.
          </p>
          <span>Don't have an account? </span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input
              onChange={handleInputChange}
              name="username"
              type="text"
              placeholder="Username *"
            />
            <input
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Password *"
            />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
          <span>{errorMsg && errorMsg}</span>
        </div>
      </div>
    </div>
  );
};
export default Login;
