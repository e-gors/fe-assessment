import { ActionTypes } from "../types/action-types";

// Store history
export const setHistory = (user) => {
  return {
    type: ActionTypes.SET_HISTORY,
    payload: user,
  };
};

// Remove history in histories state in redux store
export const removeHistory = (id) => {
  return {
    type: ActionTypes.REMOVE_HISTORY,
    payload: id,
  };
};

