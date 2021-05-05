import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Watched from "./components/Watched";
import Watchlist from "./components/Watchlist";
import Login from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Add from "./components/Add";
import "./lib/font-awesome/css/all.min.css";
import { GlobalProvider } from "./context/GlobalState";
import Principal from "./components/Principal";

// Tengo clavos con el login no logro redireccionar, no se si es la condicion o algo mas, intente meter el preventDefault en el catch pero no funciono
function App() {
  return (
    //All the app will have access to the context because is inside the GlobalProvider
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            {localStorage.getItem("jwt") != null ? (
              <Redirect to="/watchlist" />
            ) : (
              <Login />
            )}
          </Route>
          <Route exact path="/signup">
            {localStorage.getItem("jwt") != null ? (
              <Redirect to="/watchlist" />
            ) : (
              <SignUp />
            )}
          </Route>
          <Route exact path="/login">
            {localStorage.getItem("jwt") != null ? (
              <Redirect to="/watchlist" />
            ) : (
              <Login />
            )}
          </Route>
          <Route exact path="/watchlist">
            <Principal>
              <Watchlist />
            </Principal>
          </Route>
          <Route exact path="/watched">
            <Principal>
              <Watched />
            </Principal>
          </Route>
          <Route exact path="/add">
            <Principal>
              <Add />
            </Principal>
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
