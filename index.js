import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigation from './src/navigation'
import { store, persistor } from './src/store'
import { name as appName } from './app.json'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppNavigation />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => App)
