import React from 'react'
import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import {
    selectCurrentUserName,
    selectInternetReachability,
} from '../selectors/userSelector'
import LoginScreen from '../screens/LoginScreen'
import CryptoListScreen from '../screens/CryptoListScreen'
import CryptoChartScreen from '../screens/CryptoChartScreen'
import { colors } from '../theme/colors'
import { routes, screenNames } from './routes'

const Stack = createStackNavigator()

const getScreenOptions = (screen) => ({
    name: routes[screen].name,
    options: {
        title: routes[screen].title,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: colors.amaranth,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: '700',
        },
    },
})

const AppNavigation = () => {
    const username = useSelector(selectCurrentUserName)
    const isInternetReachable = useSelector(selectInternetReachability)
    return (
        <NavigationContainer>

            {username && !isInternetReachable && <OfflineBanner />}
            <Stack.Navigator>
                {!username ? (
                    <Stack.Screen
                        {...getScreenOptions(screenNames.login)}
                        component={LoginScreen}
                    />
                ) : (
                    <Stack.Group>
                        <Stack.Screen
                            {...getScreenOptions(screenNames.cryptoList)}
                            component={CryptoListScreen}
                        />
                        <Stack.Screen
                            {...getScreenOptions(screenNames.cryptoChart)}
                            component={CryptoChartScreen}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const OfflineBanner = () => (
    <SafeAreaView style={styles.bannerContainer}>
        <Text style={styles.bannerLabel}>{`You're currently offline`}</Text>
    </SafeAreaView>
)
const styles = StyleSheet.create({
    bannerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    bannerLabel: { fontWeight: 'bold' },
})
export default AppNavigation
