import React from "react";
import Nav from "../Nav";
import "./ProfileScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import PlanScreen from "./PlanScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      <Nav></Nav>
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>

        <div className="profileScreen_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          ></img>

          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <PlanScreen></PlanScreen>
              <p></p>
              <button
                onClick={() => signOut(auth)}
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
