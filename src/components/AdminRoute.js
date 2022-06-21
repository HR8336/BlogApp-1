import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isLoggedin, setisloggedin] = useState(true);
  const ref = useRef();

  const isUserLogIn = () => {
    const user = localStorage.getItem("Role");

    if (user === "Admin") {
      setisloggedin((prevState) => true);
    } else {
      setisloggedin((prevState) => false);
    }
  };

  useEffect(() => {
    if (ref.current === true) return;
    isUserLogIn();
    ref.current = true;
  }, []);
  return isLoggedin ? children : <Navigate to="/home/allblog" />;
};

export default AdminRoute;
