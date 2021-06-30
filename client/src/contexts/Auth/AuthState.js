import React, { useReducer } from "react";
import { AUTH, AUTH_FAIL, AUTH_REQUEST, LOGOUT } from "../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducers";
import * as api from "../api";


export const AuthState = (props) => {
  const initialState = {
    authData: null,
    loading: false,
    error: null,
   
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signin = async (formData, router) => {
    try {
      dispatch({type:AUTH_REQUEST})
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      router.push("/");
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    
    }
  };

  const signup = async (formData, router) => {
    try {
       dispatch({type:AUTH_REQUEST})
      const { data } = await api.signUp(formData);
      
      dispatch({ type: AUTH, data });
      router.push("/");
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        authData: state.authData,
        error:state.error,
        loading:state.loading,
        signin,
        signup,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
