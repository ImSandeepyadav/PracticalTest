import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER,
  EDIT_USER,
  DELETE_USER
} from "../actions/userActions";

const initialState = {
  users: [],
  isLoading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? { ...user, ...action.payload.user }
            : user
        )
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
