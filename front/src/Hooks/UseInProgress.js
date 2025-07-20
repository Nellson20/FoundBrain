
import React, { useState } from 'react'
import axios from 'axios'
const UseInProgress = () => {
    const [label, setLabel] = useState('Upload')
    const [title, setTitle] = useState('Upload')
    const [percent, setPercent] = useState(0)
    const [source, setSource] = useState(axios.CancelToken.source())
    return { label, setLabel, title, setTitle, percent, setPercent, source, setSource }
}

export default UseInProgress