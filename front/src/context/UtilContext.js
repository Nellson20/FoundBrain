import React from 'react'
const UtilContext = React.createContext({
    leftbarExpanded: false,
    changeLeftbarExpanded: () => { }
});
export default UtilContext;