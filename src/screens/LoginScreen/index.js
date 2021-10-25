import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'

import { updateCurrentUser } from '../../store/actions'
import { colors } from '../../theme/colors'

const LoginScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState(null)

    const onChangeUsername = (newUsername) => setUsername(newUsername)
    const onLogin = useCallback(() => {
        dispatch(updateCurrentUser({ name: username }))
    }, [username])

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <TextInput
                style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: colors.lavender,
                }}
                onChangeText={onChangeUsername}
                value={username}
            />
            <TouchableOpacity
                style={{
                    padding: 5,
                    marginTop: 20,
                    backgroundColor: !username ? colors.grey : colors.green,
                    alignSelf: 'center',
                }}
                disabled={!username}
                onPress={onLogin}
            >
                <Text>Login as selected user</Text>
            </TouchableOpacity>
        </View>
    )
}
LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
}

export default LoginScreen
