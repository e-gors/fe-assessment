import { ActionTypes } from "../types/action-types";

const initialState = {
  history: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_HISTORY:
      return { ...state, history: payload };
    case ActionTypes.REMOVE_HISTORY:
      return { ...state, history: payload };
    default:
      return state;
  }
};
