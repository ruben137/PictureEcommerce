import { AUTH, AUTH_FAIL, LOGOUT, SIGNIN_FAIL, AUTH_REQUEST } from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, error: null };
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_FAIL:

      return { loading: false, error: action.payload };
    case SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};
