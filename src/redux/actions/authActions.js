import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOGOUT,
  SET_ERROR_MESSAGE,
} from "../types";
import { LoginService } from "../../services/auth-services";
import { errorHandler } from "../../services/errorHandler";

export const doLogin = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await LoginService(username, password);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        data,
      },
    });

    localStorage.setItem("authInfo", JSON.stringify(data));
  } catch (error) {
    // console.log(error);
    // console.log("CODE: ", error.response.status);

    dispatch({
      type: LOGIN_FAILED,
    });

    const handleError = errorHandler(error.response.status, error);

    dispatch({
      type: SET_ERROR_MESSAGE,
      payload: { isError: true, message: handleError },
    });
  }
};

export const doLogout = () => (dispatch) => {
  localStorage.removeItem("authInfo");
  dispatch({ type: USER_LOGOUT });
};
