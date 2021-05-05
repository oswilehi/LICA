import React, { useState } from "react";
import axios from "axios";

const signUpFunction = (e, details) => {
  console.log("AQUI TAMOS");
  e.preventDefault();
  axios
    .post("http://localhost:3000/signup", {
      email: details.email,
      password: details.password,
    })
    .then((data) => {
      console.log(data.data);
      console.log("QUE PEDOOO");
    })
    .catch((error) => {
      console.log(error);
    });
};

const SignUp = ({ Login, error }) => {
  const [details, setDetails] = useState({ email: "", password: "" });

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
            onClick={(e) => signUpFunction(e, details)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
