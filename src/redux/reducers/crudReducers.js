import {
  DATA_LIST_SUCCESS,
  DATA_DELETE_SUCCESS,
  DATA_LIST_REQUEST,
  DATA_LIST_FAILED,
  DATA_UPDATE_SUCCESS,
} from "../types";

let globalState = {
  dataList: [],
};

export const crudReducers = (state = globalState, action) => {
  switch (action.type) {
    case DATA_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DATA_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataList: action.payload.data.data,
      };

    case DATA_UPDATE_SUCCESS:
      return state.dataList.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...state,
            dataList: action.payload.data,
          };
        } else {
          return state;
        }
      });

    case DATA_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataList: state.dataList.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case DATA_LIST_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
