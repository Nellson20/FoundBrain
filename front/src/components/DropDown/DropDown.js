import React, { useRef, useEffect, useState } from 'react'
import './DropDown.scss'
import { createPopper } from '@popperjs/core';
import useClickOutside from '../../Hooks/useClickOutside'
import { usePopper } from 'react-popper';
const DropDown = ({ opened=false,setOpened=()=>{},children, togglable = true, placement = 'bottom-end', activeClassName = 'selected', className = null, closeOnclickInside = true }) => {
  const [shownDropdownMenu, setShownDropdownMenu] = useState(opened)
  const dropdownMenu = useRef()
  const dropdownToggler = useRef()
  const dropDown = useRef()

  const { styles, attributes, update } = usePopper(dropdownToggler.current, dropdownMenu.current, {
    placement,
  });

  const show = () => {
    setShownDropdownMenu(true)
  }
  const hide = () => {
    setShownDropdownMenu(false)
  }

  useClickOutside(dropDown, () => {
    hide()
  })

  useEffect(()=>{
    setShownDropdownMenu(opened)
  },[opened])

  const toggle = () => {
    if (togglable) {
      if (shownDropdownMenu) {
        hide()
      } else {
        show()
      }
    }
  }

  useEffect(()=>{
    if(typeof update === 'function') update()
    setOpened(shownDropdownMenu)
  },[shownDropdownMenu])

  return (
    <div className={`dropDown relative${className !== null ? ' ' + className : ''}`} ref={dropDown}>
      <div ref={dropdownToggler} onClick={toggle} className={shownDropdownMenu ? 'selected' : ''}>
        {
          children[0]
        }
      </div>
      <div onClick={()=>{
        if(closeOnclickInside) hide()
      }} className={`dropdownMenu${shownDropdownMenu ? ' shown' : ''}`} {...attributes.popper} ref={dropdownMenu} style={{
        borderRadius: 5,
        fontSize: 13,
        ...styles.popper
      }}>
        {
          shownDropdownMenu && children[1]
        }
      </div>
    </div>
  )
}

export default DropDown