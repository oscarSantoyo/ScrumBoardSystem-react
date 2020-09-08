import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reducers from "./reducers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE,
};

const store = createStore(
  reducers,
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : ""
);

render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
