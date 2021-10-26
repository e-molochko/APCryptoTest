import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'

const CoinItem = (props) => {
    const { name, symbol, onItemPress } = props
    return useMemo(
        () => (
            <TouchableOpacity onPress={onItemPress} style={styles.coinItem}>
                <View style={styles.coinSymbol}>
                    <Text style={styles.symbolIcon}>{symbol}</Text>
                </View>
                <View>
                    <Text>{name}</Text>
                </View>
            </TouchableOpacity>
        ),
        [name, symbol, onItemPress]
    )
}

CoinItem.defaultProps = {
    onItemPress: () => {},
}
CoinItem.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    onItemPress: PropTypes.func,
}

export default CoinItem
