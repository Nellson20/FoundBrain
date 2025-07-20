import React from 'react'
const CancelTokenContext = React.createContext({
    inLoading:[],
    setInloading: () => { },
    updateInloading: () => { },
    cancelToken: [],
    setCancelToken: () => { }
});
export default CancelTokenContext;