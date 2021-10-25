import axios from 'axios'

const apiEndpoint = ' https://api.coinlore.net/api'

export const getAllCoins = () =>
    axios
        .get(`${apiEndpoint}/tickers/?limit=50`)
        .then((res) => {
            return res.data
        })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            console.log({ e })
            return []
        })

export const getSpecificCoin = (id) =>
    axios
        .get(`${apiEndpoint}/ticker/?id=${id}`)
        .then((res) => {
            return res
        })
        .then((res) => {
            const { config, data } = res
            console.log('getSpecificCoin', { config, data })
            return data[0]
        })
        .catch((e) => {
            console.log({ e })
            return {}
        })
