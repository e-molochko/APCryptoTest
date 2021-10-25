import { StyleSheet } from 'react-native'

import { colors } from '../../theme/colors'

export const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: { flex: 1, backgroundColor: colors.white },
    navButton: { padding: 10 },
    navButtonLabel: { color: colors.white, fontWeight: 'bold', fontSize: 20 },
    filterContainer: { flexDirection: 'row', padding: 10 },
    input: { padding: 5, flexGrow: 1, borderWidth: 0.5 },
    filterButton: {
        marginLeft: 5,
        padding: 5,
        backgroundColor: colors.amaranth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
})
