import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOGOUT,
} from "../types";

const user = JSON.parse(localStorage.getItem("authInfo"));

let globalState = user
  ? {
      isLoggedIn: true,
      authData: user,
      isLoading: false,
    }
  : {
      isLoggedIn: false,
      authData: null,
      isLoading: false,
    };

export const authReducer = (state = globalState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("LOGIN REQUEST: ", state);
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      console.log("LOGIN SUCCESS: ", state);
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        authData: action.payload.data,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case USER_LOGOUT:
      return { ...state, isLoggedIn: false };

    default:
      return state;
  }
};
