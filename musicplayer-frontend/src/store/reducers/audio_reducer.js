export const TracksReducer = (state = null, action) => {
    switch(action.type) {
      case "FETCH_TRACKS":
        return action.payload || false

    
      default:
        return state
    }
}