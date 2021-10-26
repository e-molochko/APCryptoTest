import { StyleSheet } from 'react-native'

import { colors } from '../../theme/colors'

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    input: {
        borderWidth: 0.5,
        padding: 10,
        margin: 10,
        backgroundColor: colors.lavender,
    },
    loginButton: (username) => ({
        padding: 5,
        marginTop: 20,
        backgroundColor: !username ? colors.grey : colors.green,
        alignSelf: 'center',
    }),
    buttonLabel: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
})
