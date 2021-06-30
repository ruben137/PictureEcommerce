import React, { useContext, useEffect, useState } from "react";
import AdminBar from "../../components/AdminBar";
import Navigation from "../../components/navigation";
import AuthContext from "../../contexts/Auth/AuthContext";





const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(null);
  const { authData} = useContext(AuthContext);
  
  useEffect(() => {
    setUser(authData || userData);


  }, [userData?.result?.userName]);

  


  return (
    <>
      {user?.result?.isAdmin && <AdminBar />}
      <Navigation />
    </>
  );
};

export default Navbar;
