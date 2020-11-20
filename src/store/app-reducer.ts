type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false


}
//----------------------------------------------------------------------------------------------------------------------
//Types


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const appReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'APP/IS-INITIALIZED': {
            return {...state, initialized: action.payload.initialized}
        }

        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions
export const isInitialized = (initialized: any) => ({type: 'APP/IS-INITIALIZED', payload: {initialized}} as const);


//----------------------------------------------------------------------------------------------------------------------
//Thunks


export default appReducer;
