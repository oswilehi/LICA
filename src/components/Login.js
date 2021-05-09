import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  async signIn() {
    try {
      const user = await Auth.signIn(this.state.email, this.state.password)
        .then((user) => {
          localStorage.setItem("user", user.username);
          window.location.href = "/add";
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "UserNotConfirmedException")
            toast.error("Check your email and verify your account");
          else if (error.code === "NotAuthorizedException")
            toast.error(error.message);
        });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  onChange(e) {
    this.setState({
      email: e.target.id === "email" ? e.target.value : this.state.email,
      password:
        e.target.id === "password" ? e.target.value : this.state.password,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Login</h1>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our Terms Of Use
                  </p>
                </div>
                <div className="col-md-12 text-center ">
                  <button
                    type="submit"
                    className=" btn btn-block mybtn btn-primary tx-tfm"
                    onClick={(e) => {
                      e.preventDefault();
                      this.signIn();
                    }}
                  >
                    Login
                  </button>
                </div>
                <div className="col-md-12 ">
                  <div className="login-or text-center">
                    <hr className="hr-or" />
                    <span className="span-or">or</span>
                  </div>
                  <div class="form-group text-center">
                    <Link to="/SignUp">Sign up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
