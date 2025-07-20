import React, { useEffect, useRef, useState } from 'react'
import './Tabs.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Link,useLocation } from 'react-router-dom'
import DoNavLink from '../DoNavLink/DoNavLink'
const Tabs = ({ children, navRight = "", className = "",multipage=false }) => {
  const [tabs, setTabs] = useState([])
  const [openedTab, setOpenedTab] = useState(0)
  const body = useRef()
  const [bodyWidth, setBodyWidth] = useState(0)
  const location = useLocation();
  useEffect(() => {
    setTabs(children.map((c, i) =>{
      console.log(c.props.enabled)
      return ({ title: c.props.title, content: c.props.children,enabled:c.props.enabled,path:c.props.path })
    }  
    ))
  }, [children])
  useEffect(() => {
    setBodyWidth(body.current.offsetWidth)
    console.log(children,'Tab.child')
  }, [])
  

  return (
    <div className={`tabs ${className}`}>
      <div className='top flex justify-content-between align-items-center'>
        <ul className="tabs-heading">
          {
            !multipage ?
            tabs.map((t, i) => <li key={i} onClick={() => setOpenedTab(i)} className={`${(openedTab === i) ? "active" : ""}${(t.enabled===false) ? " disabled" : ""}`}>{t.title}</li>):
            tabs.map((t, i) => <li key={i}>
              <DoNavLink onClick={() => setOpenedTab(i)} className={`${(t.enabled===false) ? " disabled" : ""}`} activeClass='active' to={t.path}>{t.title}</DoNavLink>
            </li>)
          }
        </ul>
        <div className="flex align-items-center gap-5">
          {
            navRight
          }
        </div>
      </div>
      <div ref={body} className='tabs-body'>
        <div className='flex' style={{ width: bodyWidth * tabs.length }}>
          {
            !multipage ?
            tabs.map((t, i) => <div key={i} className={(openedTab === i) ? "opened" : ""} style={{ width: bodyWidth }}>{t.content}</div>) :
            (<Routes>
              <Route index element={<Navigate to={tabs[0]?.path}/>}/>
              {
                tabs.map((t, i) =>
                <Route key={i} path={t.path} element={
                  <div className="opened" style={{ width: bodyWidth }}>{t.content}</div>
                }/>)
              }
              
            </Routes>)
          }
        </div>
      </div>
    </div>
  )
}

export default Tabs
