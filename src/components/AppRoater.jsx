import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="" element={<Main />}></Route> */}
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />

      {/* <Route path="/posts/:id" element={<PostIdPage />} />*/}
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate replace to="/error" />} />

      {/* <Redirect to="/posts"></Redirect> */}
    </Routes>
  );
};

export default AppRouter;
