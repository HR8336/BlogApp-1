import { NavLink, useLocation } from "react-router-dom";
import { MenuListofPrivate } from "./MenuListofPrivate";
import { MenuListofPulic } from "./MenuListofPublic";
import Logout from "../components/Logout";
import "../css/Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const isloggedUser = localStorage.getItem("isLoggedUser");
  const menuListPrivate = MenuListofPrivate.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink
          to={url}
          style={{ marginRight: "90px" }}
          className={`nav-link ${
            location.pathname === "{url}" ? "active" : ""
          }`}
        >
          {title}
        </NavLink>
      </li>
    );
  });

  const menulistPublic = MenuListofPulic.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink
          to={url}
          style={{ marginRight: "90px" }}
          className={`nav-link ${
            location.pathname === "{url}" ? "active" : ""
          }`}
        >
          {title}
        </NavLink>
      </li>
    );
  });
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="menu-list">
      <div className="logo">
        Blog<font>App</font>
      </div>
      <ul
        onClick={handleClick}
        className={clicked ? "menu-list" : "menu-list close"}
      >
        {isloggedUser === "false" ? (
          <> {menulistPublic}</>
        ) : (
          <>
            {menuListPrivate}
            <li>
              <Logout style={{ marginRight: "90px" }} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
