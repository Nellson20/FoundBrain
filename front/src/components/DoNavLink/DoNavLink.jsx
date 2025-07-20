import React from 'react'
import { NavLink } from 'react-router-dom'

const DoNavLink = ({activeClass='active',children,to='/',inactiveClass='',className='',end=true}) => {
  return (
    <NavLink
    to={to}
    end={end}
    className={({ isActive }) => ((isActive ? activeClass : inactiveClass)+' '+className)}
    >{children}</NavLink>
  )
}

export default DoNavLink
