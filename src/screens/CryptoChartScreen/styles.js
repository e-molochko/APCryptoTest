import { StyleSheet } from 'react-native'

import { colors } from '../../theme/colors'

export const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: { flex: 1, backgroundColor: colors.white },
    chartContainer: { height: 300, flexDirection: 'row' },
    yaxis: { width: 50 },
    countdown: { padding: 20, alignItems: 'center', justifyContent: 'center' },
})
