import axios from "axios";

// Action types
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

// Action creators
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.address.city,
          zipcode: user.address.zipcode
        }));
        dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
      })
      .catch((error) => {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
      });
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user
  };
};

export const editUser = (userId, user) => {
  return {
    type: EDIT_USER,
    payload: { userId, user }
  };
};

export const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: userId
  };
};
