import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { ReactDOM } from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import './sliderMenu.css'

var lastActive

function getAncestor(elem, encestorClassName) {
    let parent = elem.parentNode
    while (!parent.classList?.contains(encestorClassName) && parent.nodeName != 'BODY') {
        parent = parent.parentNode
    }
    if (parent.nodeName == 'BODY') {
        parent = null
    }
    return parent
}
export const SliderMenu = ({ children }) => {
    const self = useRef()
    return (
        <div ref={self} style={{ height: 'auto', width: '50% !important' }} className='slider-menu'>
            <div>
                {
                    children
                }
            </div>

        </div>
    )
}
export const SliderMenuView = ({ children, active = true, className, prevBtn = null }) => {

    const self = useRef()
    const [act, setAct] = useState(active)
    const next = () => {
        self.current.style.animation = 'nextTrans 0.6s forwards'
        setTimeout(() => {
            self.current.style.animation = 'unset'
        }, 500)
        setTimeout(() => {
            setAct(false)
        }, 500)
    }
    const prev = () => {
        setAct(true)
        setTimeout(() => {
            getAncestor(self.current, 'slider-menu').style.height = self.current.offsetHeight + 'px'
        }, 100)
        self.current.style.animation = 'prevTrans 0.6s forwards'
        setTimeout(() => {
            self.current.style.animation = 'unset'
        }, 500)
    }
    useEffect(() => {
        setAct(active)
        console.log(active);
        if (active) {
            setTimeout(() => {
                if (self.current.offsetHeight > 0) {
                    getAncestor(self.current, 'slider-menu').style.height = self.current.offsetHeight + 'px'
                }
            }, 100)
        }
    }, [active])

    return (
        <>
            <div ref={self} className={`slider-menu-view${act ? ' active' : ''}${className ? ' ' + className : ''}`}>

                {
                    prevBtn &&
                    <div className="heading">{prevBtn}</div>
                }

                {
                    React.Children.toArray(children).map((c, i) => {
                        if (c.type.name == 'SliderMenuItem') {
                            return <SliderMenuItem key={i} nextView={next} prevView={prev} iconLeft={c.props.iconLeft} iconRight={c.props.iconRight || null}>{c.props.children}</SliderMenuItem>
                        } else if (c.type.name == 'SliderMenuBlock') {
                            return <SliderMenuBlock key={i}>
                                {
                                    React.Children.toArray(c.props.children).map((c1,i)=>{
                                        if(c1.type.name=='SliderMenuItem'){
                                            return <SliderMenuItem key={i} nextView={next} prevView={prev} iconLeft={c1.props.iconLeft} iconRight={c1.props.iconRight || null}>{c1.props.children}</SliderMenuItem>
                                        }else{
                                            return <div key={i}>{c1}</div>
                                        }
                                        
                                    })
                                }
                            </SliderMenuBlock>

                        }

                    })
                }
            </div>
        </>

    )
}
export const SliderMenuItem = ({ children, iconLeft, iconRight, className, nextView = () => { }, prevView = () => { } }) => {

    const self = useRef()
    const [encestor, setEncestor] = useState(null)
    const [activeView, setActiveView] = useState(false)
    useEffect(() => {
        setEncestor(getAncestor(self.current, 'slider-menu'));
    }, [])

    return (
        <>
            <div ref={self} className='slider-menu-item' onClick={(e) => {
                if (children[1]) {
                    setActiveView(true)
                    nextView()
                }
            }}>

                {
                    iconLeft && <div className="icon-left">{iconLeft}</div>
                }
                {
                    children[0] ?? children
                }
                {
                    iconRight ? <div className="icon-right">{iconRight}</div> : children[1] && <div className="icon-right"><i className='bi bi-caret-right-fill'></i></div>
                }

            </div>
            {

                (encestor && children[1]) && createPortal(<SliderMenuView active={activeView} prevBtn={<button className='prevBtn' onClick={() => {

                    prevView()
                    setTimeout(() => {
                        setActiveView(false)
                    }, 500)

                }}><i class="bi bi-arrow-left-short"></i></button>}>{children[1].props?.children}</SliderMenuView>, encestor.querySelector('.slider-menu > div'))

            }
        </>


    )
}

export const SliderMenuBlock = ({ children, onClick = () => { }, className }) => {
    return (
        <div className={`slider-menu-block${className ? ' ' + className : ''}`}>
            {
                children
            }
        </div>
    )
}

