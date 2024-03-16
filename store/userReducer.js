const initialState = {
  user: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "CLEAR_USER":
      return initialState; // Reset to initial state when clearing user
    default:
      return state;
  }
};

export default userReducer;
