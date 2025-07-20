import React, { useContext } from 'react'
import { ColorRing } from 'react-loader-spinner'
import ThemeContext, { LIGHT } from '../../context/ThemeContext'

const CircleLoader = ({height=25,
width=25,colors=['rgba(255, 255, 255, 0.91)','rgba(255, 255, 255, 0.82)','rgba(255, 255, 255, 0.71)','rgba(255, 255, 255, 0.63)','rgba(255, 255, 255, 0.58)']}) => {
    const {theme}=useContext(ThemeContext)
    return (
        <ColorRing
            visible={true}
            height={height}
            width={width}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={colors ? colors : theme===LIGHT ? ['#a2a3a2','#b8b8b8','#d1d1d1','#e6e6e6','#f0edf0'] : ['rgba(255, 255, 255, 0.91)','rgba(255, 255, 255, 0.82)','rgba(255, 255, 255, 0.71)','rgba(255, 255, 255, 0.63)','rgba(255, 255, 255, 0.58)']}
        />
    )
}

export default CircleLoader
