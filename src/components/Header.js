import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">LICA</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/add" className="btn">
                Add
              </Link>
            </li>
            <li>
              <Link to="/watchlist">Watch list</Link>
            </li>
            <li>
              <Link to="/watched">Watched</Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  Auth.signOut({ global: true });
                  localStorage.removeItem("user");
                }}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
