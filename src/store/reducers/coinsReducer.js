import actionTypes from '../actions/actionTypes'

export const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COINS: {
            const coins = action.payload
            return coins
        }
        case actionTypes.LOGOUT: {
            return initialState
        }
        default:
            return state
    }
}
