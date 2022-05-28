import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";


const containers = document.getElementById("root");
const root = createRoot(containers!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
