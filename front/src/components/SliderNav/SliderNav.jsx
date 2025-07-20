import React, { Children, useRef, useState } from 'react'
import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import './SliderNav.scss'

const SliderNav = ({children,defaultActive=0,activatable=true}) => {
    const scrollingElement=useRef()
    const [active,setActive]=useState(defaultActive)
    const slideLeft=()=>{
        scrollingElement.current.scrollLeft-=100
    }
    const slideRight=()=>{
        scrollingElement.current.scrollLeft+=100
    }
    return (
        <nav className='slider-nav'>
            <div className="prev" onClick={slideLeft}><ChevronLeft/></div>
            <ul className='flex' ref={scrollingElement}>
                {
                    children?.map((c,i)=><li key={i} className={`${(activatable && active===i) ? 'active' : ''}`} onClick={()=>{
                        c.props.onClick && c.props.onClick()
                        if(activatable && c.props.onClick && c.props.onClick()!==false){setActive(i)}
                        
                    }}>{c}</li>)
                }
            </ul>
            <div className="next" onClick={slideRight}><ChevronRight/></div>
        </nav>
    )
}

export default SliderNav
