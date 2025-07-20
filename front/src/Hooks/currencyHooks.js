import { useContext,useEffect,useMemo,useState } from "react"
import CurrencyContext from "../context/CurrencyContext"
import { convertCurrency } from "../utils/currencyUtils"
import millify from "millify"

export const useCurrencyConverter = (amount, from, to) => {
    const { currenciesBaseUSD } = useContext(CurrencyContext)
    if (currenciesBaseUSD[from] && currenciesBaseUSD[to]) {
        if(Array.isArray(amount)){
            return amount.map(a=>convertCurrency(a, currenciesBaseUSD[from], currenciesBaseUSD[to]))
        }
        return convertCurrency(amount, currenciesBaseUSD[from], currenciesBaseUSD[to])
    } else {
        return null
    }
}

export const useFromTo=(currecyCode)=>{
    const { currency,currenciesBaseUSD } = useContext(CurrencyContext)
    const [{from,to},setFromTo]=useState({
        from:currenciesBaseUSD[currecyCode],
        to:currenciesBaseUSD[currency?.code]
    })
    useEffect(() => {
        setFromTo({
            from:currenciesBaseUSD[currecyCode],
            to:currenciesBaseUSD[currency?.code]
        })
    }, [currency,currenciesBaseUSD,currecyCode])

    

    return {from,to}
}
