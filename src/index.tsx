import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";

const container = document.getElementById("root");

if (container)
{
    ReactDOM.render(<App />, container);

    if (container.hasChildNodes()) {
        ReactDOM.hydrate(<React.StrictMode><App /></React.StrictMode>,container);
    }
    else {
        ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,container);
    }

}

else
{
  console.error('Failed to find the root container. Make sure your HTML includes a div with id="root".');
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();