import {moviesAPI} from "../api/api";

type initialStateType = {
    token: null | string
}

let initialState: initialStateType = {
    token: null
}
//----------------------------------------------------------------------------------------------------------------------
//Types


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const authReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'AUTH/GET-TOKEN':
            return {...state, token: action.payload.token}

        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions
export const getTokenAC = (token: string) => ({type: 'AUTH/GET-TOKEN', payload: {token}} as const);


//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const getToken = (request_token: string) => async (dispatch: any) => {
    try {
        const response = await moviesAPI.getToken(request_token)
        if (response.data.success) {
            dispatch(getToken(response.data.request_token))
        }


    } catch (e) {
        console.log(e)

    }
}

export default authReducer;
