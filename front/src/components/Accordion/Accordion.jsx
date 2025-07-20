import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'react-bootstrap-icons'
import useClickOutside from '../../Hooks/useClickOutside'
import './Accordion.scss'
const Accordion = ({ children,isOpen=false,closeOnClickOutside=false }) => {
    const [open,setOpen]=useState(isOpen)
    const [contentHeight,setContentHeight]=useState()
    const content=useRef()
    const resizableHeight=useRef()
    const accordion=useRef()
    useClickOutside(accordion, () => {
        if(closeOnClickOutside) setOpen(false)
    })
    useEffect(()=>{
        const myObserver = new ResizeObserver(entries => {
            // this will get called whenever div dimension changes
             entries.forEach(entry => {
                setContentHeight(entry.target.scrollHeight)
             });
           });
           
           const someEl = document.querySelector('.some-element');
           
           // start listening to changes
           myObserver.observe(resizableHeight.current);
    
        return () => {
            myObserver.disconnect();
        }
    },[])

    
    useEffect(()=>{
        setContentHeight(content.current.scrollHeight)

        


    },[])
    const toggle = () => {
        setOpen(!open)
    }
    return (
        <div ref={accordion} className={`accordion${open ? ' open' : ''}`}>
            <div className='accordion-heading flex align-items-center justify-content-between' onClick={()=>{
                toggle()
            }}>
                {children[0]}
                <div className="flex gap-10">
                {/* {
                    open && <button className="more-opts-btn" onClick={(e)=>{e.stopPropagation()}}><Plus size={25}/></button>
                } */}
                <button className="toggle-btn">
                    {
                        open ? <ChevronUp size={18}/> : <ChevronDown size={18}/>
                    }
                </button>
                </div>
            </div>
            <div className="accordion-content" ref={content} style={{height:open ? contentHeight : 0,transition:`${contentHeight/(contentHeight*2)}s`}}>
                <div ref={resizableHeight} className='py-10 px-15'>
                {children[1]}
                </div>
            </div>
        </div>
    )
}

export default Accordion
