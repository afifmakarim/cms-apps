import { deleteProductById, getAllProduct } from "../../services/crud-services";
import { errorHandler } from "../../services/errorHandler";
import {
  DATA_LIST_SUCCESS,
  DATA_DELETE_SUCCESS,
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  DATA_LIST_REQUEST,
  DATA_LIST_FAILED,
} from "../types";

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_LIST_REQUEST });

    const { data } = await getAllProduct();
    dispatch({
      type: DATA_LIST_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    dispatch({
      type: DATA_LIST_FAILED,
    });

    dispatch({
      type: SET_ERROR_MESSAGE,
      payload: { isError: true, message: error.response.statusText },
    });
  }
};

export const deleteData = (id) => async (dispatch) => {
  try {
    const { data } = await deleteProductById(id);
    dispatch({
      type: DATA_DELETE_SUCCESS,
      payload: {
        id,
      },
    });

    dispatch({
      type: SET_SUCCESS_MESSAGE,
      payload: { isSuccess: true, message: data.message },
    });
  } catch (error) {
    const handleError = errorHandler(error.response.status, error);

    dispatch({
      type: SET_ERROR_MESSAGE,
      payload: { isError: true, message: handleError },
    });
  }
};
