export const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.user,
      };
      break;
    default:
      return state;
  }
}

export default reducer;
