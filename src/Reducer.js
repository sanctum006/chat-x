export const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      // console.log({
      //   ...state,
      //   uid: action.user.uid,
      //   username: action.user.username,
      //   usernameid: action.user.usernameid,
      //   avatarUrl: action.user.avatarUrl,
      //   bio: action.user.bio,
      // });
      return {
        ...state,
        user: {
          uid: action.user.uid,
          username: action.user.username,
          usernameid: action.user.usernameid,
          avatarUrl: action.user.avatarUrl,
          bio: action.user.bio,
        },
      };
      break;
    default:
      return state;
  }
}

export default reducer;
