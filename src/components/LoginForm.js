import React, { useState } from "react";
import axios from "axios";

const loginFunction = (e, details) => {
  console.log("AQUI TAMOS");
  e.preventDefault();
  axios
    .post("http://localhost:3000/login", {
      email: details.email,
      password: details.password,
    })
    .then((data) => {
      console.log(data.data.jwt);
      localStorage.setItem("jwt", JSON.stringify(data.data.jwt));
      localStorage.setItem("user", JSON.stringify(details.email));
      window.location.reload(false);
      console.log("QUE PEDOOO");
    })
    .catch((error) => {
      console.log(error);
    });
};

const LoginForm = ({ Login, error }) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  /*const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };*/
  return (
    <div className="Login">
      <form>
        <div className="form-inner">
          <h2>Login</h2>
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
          </div>
          <button
            className="principal-btn"
            onClick={(e) => loginFunction(e, details)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
