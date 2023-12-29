const initialState = {
  invitaciones: JSON.parse(localStorage.getItem('invitacionesData')) || {},
};
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INVITACIONES":
          localStorage.setItem('invitacionesData', JSON.stringify(action.payload));
            return {
                ...state,
                invitaciones: action.payload,
            }
            case "BORRAR_INVITACIONES":
              localStorage.removeItem('invitacionesData');
              return {
                ...state,
                invitaciones: {},
              };

    default: return { ...state }
    }
  }

  export default rootReducer;