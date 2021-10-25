import NetInfo from '@react-native-community/netinfo'

import actionTypes from '../actions/actionTypes'
import { getAllCoins } from '../../services/api-service'
import { selectAvailableCoins } from '../../selectors/coinsSelector'
import { setCoinsAction, updateCurrentUser } from '../actions'

const getAndSetAvailableCoins = async (dispatch) => {
    try {
        const coins = await getAllCoins()
        dispatch(setCoinsAction(coins))
    } catch (e) {
        console.log('getAndSetAvailableCoins: ', { e })
    }
}
const checkConnectionFunction = (state, dispatch) => {
    console.log('network state', state)
    dispatch(updateCurrentUser({ isInternetReachable: state.isConnected }))
}

const checkInternetState = (dispatch) =>
    NetInfo.fetch().then((state) => checkConnectionFunction(state, dispatch))

const subscribeToInternetState = (dispatch) => {
    console.log('subscribeToInternetState')
    // Subscribe
    checkInternetState(dispatch)
    NetInfo.addEventListener((state) =>
        checkConnectionFunction(state, dispatch)
    )
}

const coinsMiddleware = ({ getState, dispatch }) => {
    subscribeToInternetState(dispatch)
    return (next) => (action) => {
        switch (action.type) {
            case actionTypes.GET_COINS: {
                const availableCoins = selectAvailableCoins(getState())
                if (!availableCoins.length) {
                    getAndSetAvailableCoins(dispatch)
                }
                break
            }
            case actionTypes.LOGIN: {
                checkInternetState(dispatch)
                break
            }
            default:
                break
        }
        let returnValue = next(action)
        return returnValue
    }
}
export default [coinsMiddleware]
