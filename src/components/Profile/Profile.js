import React from "react";
import "./Profile.scss";
import { doLogout } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(doLogout());
  };

  return (
    <li>
      <div className="profile-details">
        <div className="profile-content">
          <img src="https://picsum.photos/200" alt="profileImg" />
        </div>
        <div className="name-job">
          <div className="profile_name">{authData.username}</div>
          <div className="job">{authData.roles[0]}</div>
        </div>
        <i className="bx bx-log-out" onClick={handleLogout}></i>
      </div>
    </li>
  );
}
