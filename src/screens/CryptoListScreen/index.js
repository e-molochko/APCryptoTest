import React, {
    useLayoutEffect,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, FlatList, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { routes } from '../../navigation/routes'
import {
    selectCurrentUserName,
    selectInternetReachability,
} from '../../selectors/userSelector'
import { selectAvailableCoins } from '../../selectors/coinsSelector'
import { logoutAction, getCoinsAction } from '../../store/actions'
import CoinItem from '../../components/common/CoinItem'
import { styles } from './styles'

const CryptoListScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const currentUserName = useSelector(selectCurrentUserName)
    const availableCoins = useSelector(selectAvailableCoins)
    const isInternetReachable = useSelector(selectInternetReachability)

    const [minPercentageChange24, setMinPercentage] = useState()
    const [minPercentageFilter, setMinPercentageFilter] = useState(null)

    const logout = () => dispatch(logoutAction())
    const getCoins = () => dispatch(getCoinsAction())

    useLayoutEffect(() => {
        let title = 'Welcome'
        if (currentUserName) title += ` ${currentUserName}`
        navigation.setOptions({
            title,
            headerLeft: () => (
                <TouchableOpacity style={styles.navButton} onPress={logout}>
                    <Text style={styles.navButtonLabel}>Logout</Text>
                </TouchableOpacity>
            ),
        })
    }, [navigation, currentUserName])

    useEffect(() => {
        if (isInternetReachable) {
            getCoins()
        }
    }, [isInternetReachable])

    const onCoinRender = ({ item }) => (
        <CoinItem {...item} onItemPress={() => onNavigateToCoinInfo(item)} />
    )

    const onNavigateToCoinInfo = (coin) => {
        if (!isInternetReachable) {
            return alert("You're currently offline")
        }
        navigation.push(routes.cryptoChart.name, {
            ...coin,
        })
    }
    const onPercentageChange = (newValue) => {
        setMinPercentage(newValue)
    }
    const onFilterPress = useCallback(() => {
        const newFilterValue =
            minPercentageChange24 || minPercentageChange24 === 0
                ? Number(minPercentageChange24)
                : null
        setMinPercentageFilter(newFilterValue)
    }, [minPercentageChange24])

    const availableCoinsData = useMemo(
        () =>
            minPercentageFilter || minPercentageFilter === 0
                ? availableCoins.filter(
                      (i) => Number(i.percent_change_24h) >= minPercentageFilter
                  )
                : availableCoins,
        [minPercentageFilter, availableCoins]
    )

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Minimum 24-hr % Change"
                    onChangeText={onPercentageChange}
                    value={minPercentageChange24}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={onFilterPress}
                >
                    <Text style={styles.buttonLabel}>FIlter</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={availableCoinsData}
                renderItem={onCoinRender}
                keyExtractor={(item) => item.id}
                removeClippedSubviews={true}
                initialNumToRender={20}
            />
        </View>
    )
}
CryptoListScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
}

export default CryptoListScreen
