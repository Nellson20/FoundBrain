import React, { useContext } from 'react'
import "./ThemeSwitcher.scss"
import { BrightnessLow, MoonStars } from 'react-bootstrap-icons'
import ThemeContext, { DARK, LIGHT} from '../../context/ThemeContext'

const ThemeSwitcher = () => {
    const {theme,setTheme}=useContext(ThemeContext)
  return (
    <div className='theme-switcher' onClick={()=>theme===LIGHT ? setTheme(DARK) : setTheme(LIGHT)}>
      <div>
        <div className="ico">
            {
                theme==='light' ? <BrightnessLow size={20}/> : <MoonStars size={13}/>
            }
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher
