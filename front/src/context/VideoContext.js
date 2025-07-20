import React from 'react'
const VideoContext = React.createContext({
    currentVideo: null,
    setCurrentVideo: () => { },
    playCurrentPlayedVideo: () => { },
    pauseCurrentVideo: () => { }
});
export default VideoContext;