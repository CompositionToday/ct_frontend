import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";

const container = document.getElementById("root");

if (container) {
  hydrateRoot(container,
    //<MantineProvider theme={{ colorScheme: 'dark' }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    //</MantineProvider>
  );
} else {
  console.error('Failed to find the root container. Make sure your HTML includes a div with id="root".');
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();