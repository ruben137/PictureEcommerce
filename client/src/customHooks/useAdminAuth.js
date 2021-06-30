import { useEffect } from "react";
import { useHistory } from "react-router";
import { checkUserAdmin } from "../utils";

const useAdminAuth = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const history = useHistory();
  useEffect(() => {
    if (!checkUserAdmin(user)) {
      history.push("/login");
    }
  }, [user, history]);
  return user;
};

export default useAdminAuth;