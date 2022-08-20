import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navList } from "../../constant";
import Profile from "../Profile/Profile";
import "./SideBar.scss";

export default function SideBar() {
  const [drawerClose, setDrawerClose] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleDrawer = () => {
    setDrawerClose(!drawerClose);
  };

  const handleDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className={`sidebar ${drawerClose ? "close" : ""}`}>
      <div className="logo-details" onClick={handleDrawer}>
        <i className="bx bxl-c-plus-plus"></i>
        <span className="logo_name">CodingLab</span>
      </div>
      <ul className="nav-links">
        {navList.map((item, index) =>
          item.children.length > 0 ? (
            <li
              key={index}
              className={`${dropDown ? "showMenu" : ""}`}
              onClick={handleDropdown}
            >
              <div className="iocn-link ">
                <Link to="#">
                  <i className="bx bx-collection"></i>
                  <span className="link_name">{item.name}</span>
                </Link>
                <i className="bx bxs-chevron-down arrow "></i>
              </div>
              <ul className="sub-menu ">
                <li>
                  <Link className="link_name" to={item.href}>
                    {item.name}
                  </Link>
                </li>
                {item.children.map((i, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={i.href}
                      className={({ isActive }) =>
                        `${isActive ? "isActive" : ""}`
                      }
                    >
                      {i.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) => `${isActive ? "isActive" : ""}`}
              >
                {item.icon}
                <span className="link_name">{item.name}</span>
              </NavLink>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="#">
                    {item.name}
                  </Link>
                </li>
              </ul>
            </li>
          )
        )}

        <Profile />
      </ul>
    </nav>
  );
}
