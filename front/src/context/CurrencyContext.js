import React from 'react'

const CurrencyContext = React.createContext({
    currency: null,
    setCurrency: () => { }
});
export default CurrencyContext;