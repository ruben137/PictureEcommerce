import React, { useContext } from "react";
import userImage from "../../assets/user.png";
import AuthContext from "../../contexts/Auth/AuthContext";
import { useHistory } from "react-router";
import './styles.css'

const AdminSidebar = () => {
  const history=useHistory()
    const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    history.push("/");
  };
  return (
    <div
      className="sidebar"
      variant="dark"
    
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
        className="border-bottom"
      >
        <div className="w-100 text-center">
          <img src={userImage} alt="" />
        </div>
        <h3 className="text-white">Admin Name</h3>
      </div>
      <ul className="text-white">
        <li
          style={{ listStyle: "none" }}
          className="border-bottom py-2 px-1 li-element"
          onClick={()=>history.push('/')}
        >
          Home
        </li>
        <li
          style={{ listStyle: "none" }}
          className="border-bottom py-2 px-1 li-element"
          onClick={handleLogout}
        >
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
