const initialState = {
    invitaciones:{},
}
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INVITACIONES":
          console.log(action.payload)
            return {
                ...state,
                invitaciones: action.payload,
            }

    default: return { ...state }
    }
  }

  export default rootReducer;