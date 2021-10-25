import actionTypes from './actionTypes'

export const loginAction = (payload) => ({
    type: actionTypes.LOGIN,
    payload,
})

export const logoutAction = () => ({
    type: actionTypes.LOGOUT,
})
export const updateCurrentUser = (payload) => ({
    type: actionTypes.USER_UPDATE,
    payload,
})

export const getCoinsAction = () => ({
    type: actionTypes.GET_COINS,
})

export const setCoinsAction = (payload) => ({
    type: actionTypes.SET_COINS,
    payload,
})
