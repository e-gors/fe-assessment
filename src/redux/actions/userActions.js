import { ActionTypes } from "../types/action-types";

// Store user
export const setUser = (user) => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};

// Remove user in users state in redux store
export const removeUser = (id) => {
  return {
    type: ActionTypes.REMOVE_USER,
    payload: id,
  };
};

// Update user data in redux store
export const updateUser = (newUser) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: newUser,
  };
};

// Completely remove user data in redux store
export const logoutUser = () => {
  return {
    type: ActionTypes.LOGOUT_USER,
    payload: {},
  };
};
