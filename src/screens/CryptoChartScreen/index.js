import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

import { cryptoCoin } from '../../propTypes/cryptoCoin'
import { selectInternetReachability } from '../../selectors/userSelector'
import { useInterval } from '../../helpers/customHooks'
import { getSpecificCoin } from '../../services/api-service'
import { styles } from './styles'

const UPDATES_LIMIT = 6
const UPDATE_INTERVAL = 30 * 1000

// const getRandomInt = (min = 100, max = 500) => {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min + 1)) + min
// }

const CryptoChartScreen = ({ navigation, route }) => {
    const { coin } = route.params
    const { id, price_usd, name } = coin
    const currentPrice = Number(price_usd)
    // const price1hBefore =
    // currentPrice - currentPrice * Number(percent_change_1h)
    const isInternetReachable = useSelector(selectInternetReachability)
    const [data, setData] = useState([currentPrice])
    const updateIntervalRef = useRef({})

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${name} ${route.name}`,
        })
    }, [navigation])

    const getCoinInfo = async () => {
        // setData((data) => [
        //     ...data,
        //     getRandomInt(currentPrice - 100, currentPrice + 100),
        // ])
        try {
            const res = await getSpecificCoin(id)
            setData((data) => [...data, Number(res.price_usd)])
        } catch (e) {
            console.log('getCoinInfo', { e })
        }
    }
    const removeUpdateInterval = () => {
        if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current)
            updateIntervalRef.current = null
        }
    }

    useEffect(() => {
        getCoinInfo()
        updateIntervalRef.current = setInterval(getCoinInfo, UPDATE_INTERVAL)
        return removeUpdateInterval
    }, [])

    useEffect(() => {
        if (data.length >= UPDATES_LIMIT) {
            removeUpdateInterval()
        }
    }, [data])

    return (
        <View style={styles.container}>
            {!!updateIntervalRef.current &&
                data.length < UPDATES_LIMIT &&
                isInternetReachable && <Timer />}
            <View style={styles.chartContainer}>
                <YAxis
                    style={styles.yaxis}
                    data={data}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}$`}
                />
                <View style={styles.flex}>
                    <LineChart
                        style={styles.flex}
                        data={data}
                        numberOfTicks={10}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                    <XAxis
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />
                </View>
            </View>
        </View>
    )
}
CryptoChartScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.shape({
        params: PropTypes.shape({
            coin: cryptoCoin.isRequired,
        }),
    }).isRequired,
}

const Timer = () => {
    const [timeBeforeUpdate, setTimeBeforeUpdate] = useState(
        parseInt(UPDATE_INTERVAL / 1000)
    )

    useInterval(() => {
        setTimeBeforeUpdate((prevTime) =>
            prevTime > 0 ? --prevTime : parseInt(UPDATE_INTERVAL / 1000)
        )
    }, 1000)

    return (
        <View style={styles.countdown}>
            <Text>Next update in:</Text>
            <Text>{timeBeforeUpdate}s</Text>
        </View>
    )
}

export default CryptoChartScreen
