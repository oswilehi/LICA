import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  async signUp() {
    console.log(this.state);
    try {
      const user = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
      }).then(() => {
        window.location.href = "/login";
      });
      console.log(user);
    } catch (error) {
      console.log(error);
      if (error.code === "UsernameExistsException") toast.error(error.message);
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
                  <h1>Sign Up</h1>
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
                      this.signUp();
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-md-12 ">
                  <div className="login-or text-center">
                    <hr className="hr-or" />
                    <span className="span-or">or</span>
                  </div>
                  <div class="form-group text-center">
                    <Link to="/login">Login</Link>
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

export default SignUp;
