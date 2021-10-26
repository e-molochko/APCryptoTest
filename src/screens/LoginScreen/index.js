import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'

import { updateCurrentUser } from '../../store/actions'
import { styles } from './styles'

const LoginScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState(null)

    const onChangeUsername = (newUsername) => setUsername(newUsername)
    const onLogin = useCallback(() => {
        dispatch(updateCurrentUser({ name: username }))
    }, [username])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Enter your username"
            />
            <TouchableOpacity
                style={styles.loginButton(username)}
                disabled={!username}
                onPress={onLogin}
            >
                <Text style={styles.buttonLabel}>Login as selected user</Text>
            </TouchableOpacity>
        </View>
    )
}
LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
}

export default LoginScreen
