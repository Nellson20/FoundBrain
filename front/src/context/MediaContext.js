import React from 'react'
const MediaContext = React.createContext({
    deviceType: "desktop",
    shownSidebar: true,
    toggleShownSidebar: () => { },
    changeDeviceType: () => { }
});
export default MediaContext;