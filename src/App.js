import "./styles/App.css";
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Redirect,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRoater";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
