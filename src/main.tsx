import React from "react";
import ReactDOM from "react-dom/client";

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <Authenticator hideSignUp>
      <App />
    </Authenticator>
  </React.StrictMode>
);
