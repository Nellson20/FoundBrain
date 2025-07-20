import React from 'react'
const LoadingContext = React.createContext({
    inLoading: [],
    setInLoading: () => { },
    addInLoading: () => { },
    updateInLoading: () => { },
    removeInLoading: () => { },
    cancelLoading: () => { },
    addAdvert: () => { }
});
export default LoadingContext;