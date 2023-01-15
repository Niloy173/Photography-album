const Reducer = (CurrentState, Action) => {
  // console.log(Action)
  switch (Action.type) {

    case "LOGIN_STATE":
      return {
        token: Action.payload.photoURL,
        user: Action.payload
      }
    case "LOGOUT_STATE":
      return {
        token: null,
        user:null
      }

    default:
      return CurrentState
  }
}

export default Reducer;