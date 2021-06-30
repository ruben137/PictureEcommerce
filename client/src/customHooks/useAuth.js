import { useEffect } from "react";
import { useHistory } from "react-router";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  return user;
};

export default useAuth;
