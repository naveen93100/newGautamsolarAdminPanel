import React, { useEffect } from "react";
// import Navbar from "./Components/Navbar";
// import CardList from "./Components/Main";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPopup from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Media from "./pages/Media";


const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }>
          <Route path="/" element={<Navigate to='/blog' />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/media" element={<Media/>}/>
        </Route>
        <Route path="/login" element={<LoginPopup />} />
      </Routes>
    </>
  );
};
export default App;
