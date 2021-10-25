import actionTypes from '../actions/actionTypes'

export const initialState = {
    name: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_UPDATE: {
            const user = action.payload
            return { ...state, ...user }
        }
        case actionTypes.LOGOUT: {
            return initialState
        }
        default:
            return state
    }
}
