import {
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  CLEAR_MESSAGE,
} from "../types";

const initialState = {};

export const messageReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR_MESSAGE:
      return { isError: payload.isError, message: payload.message };

    case SET_SUCCESS_MESSAGE:
      return { isSuccess: payload.isSuccess, message: payload.message };

    case CLEAR_MESSAGE:
      return {
        isError: payload.isError,
        isSuccess: payload.isSuccess,
        message: "",
      };

    default:
      return state;
  }
};
