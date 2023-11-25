import axios from "axios";
import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigator = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const URL = "http://localhost:8800/api/auth/register";

  const handleInputChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !inputs.username ||
        !inputs.password ||
        !inputs.name ||
        !inputs.email
      ) {
        setErrorMsg("Required Fields cannot be empty");
        return;
      }
      await axios.post(URL, inputs);
    } catch (error) {
      if (error) setError(error.response.data);
      console.error(error.response.data);
      return;
    }
    navigator("/login");
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>My Social Space</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              onChange={handleInputChange}
              name="username"
              type="text"
              placeholder="Username *"
            />
            <input
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Email *"
            />
            <input
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Password *"
            />
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Name *"
            />
            <button onClick={handleSubmit}>Register</button>
          </form>
          <span>{errorMsg && errorMsg}</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
