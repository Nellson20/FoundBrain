import React from 'react'
import "./Skeleton.scss"

const Skeleton = ({width=100,height=20,radius=5,borderWidth=1,className=null,animationDelay=1}) => {
  return (
    <div className={`skeleton${className ? " " + className : ""}`}
        style={{borderRadius:radius,borderWidth,width,height,animationDelay}}
    ></div>
  )
}

export default Skeleton
