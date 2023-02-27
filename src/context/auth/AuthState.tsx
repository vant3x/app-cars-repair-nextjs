import React, { useReducer, useState } from "react";
import AuthContext from "./authContext";
import authReducer from "./AuthReducer";
import Router from "next/router";

import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  REMOVE_ALERTS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SESSION_ERROR,
  USER_AUTHENTICATE,
  LOGOUT,
} from "../../types";

import axiosClient from "./../../config/axios";
import authToken from "./../../config/authToken";
import { Props } from "../../interfaces/Props.interface";


const AuthState = ({ children }: Props) => {
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    auth: null,
    user: null,
    message: null,
    errorSession: {},
    signupStatus: null
  };

  // definir reducer
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [oautUser, setOauthUser] = useState();
  const [errorState, setErrorState] = useState();

  // registrar nuevos usuarios
  const signup = async (values: any) => {
    try {
      const response = await axiosClient.post("/api/auth/register", values);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          message: response.data.message,
          status: 201
        }
      });
    } catch (error: any) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response.data.message,
      });
    }
    // limpia la alerta
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERTS,
      });
    }, 4000);
  };

  // autenticar usuarios
  const login = async (values: any) => {
    try {
      const response = await axiosClient.post("/api/auth/login", values);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
    // limpia la alerta
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERTS,
      });
    }, 4000);
  };

  // Retorne el usuario autenticado en base al JWT
  const userAuthtenticate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      authToken(token);
    }

    try {
      const response = await axiosClient
        .get("/api/auth")
        .then((res) => {
          if (res.data.user) {
            dispatch({
              type: USER_AUTHENTICATE,
              payload: res.data.user,
            });
          }
          //  return res;
        })
        .catch((err) => {
          setErrorState(err.response.data);
          throw err;

          //return err
        });
    } catch (error: any) { 
      dispatch({
        type: SESSION_ERROR,
        payload: error?.response.data,
      });
    }
  };


  // cerrar la sesion
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        message: state.message,
        errorSession: state.errorSession,
        signupStatus: state.signupStatus,
        signup,
        login,
        userAuthtenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
