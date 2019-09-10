import * as actionTypes from "./actionTypes";

import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTime = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate.getTime() > new Date().getTime()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTime(
            [expirationDate.getTime() - new Date().getTime()] / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    const signData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVvaPS0q8zOyG4bEHNHWSiVky3obYelz4";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVvaPS0q8zOyG4bEHNHWSiVky3obYelz4";
    }
    axios
      .post(url, signData)
      .then(response => {
        const { idToken, localId, expiresIn } = response.data;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("token", idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", localId);
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTime(expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path
  };
};
