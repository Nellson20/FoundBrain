// src/components/LanguageSelector.js
import React from 'react'
import { useTranslation } from 'react-i18next'
import DropDown from './DropDown/DropDown'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
     <DropDown>
      <div style={{ cursor: 'pointer' }}>
        🌐 {i18n.language.toUpperCase()}
      </div>

      <div className="dropdown-content">
        <div onClick={() => changeLanguage('fr')}>🇫🇷 Français</div>
        <div onClick={() => changeLanguage('en')}>🇺🇸 English</div>
        <div onClick={() => changeLanguage('mg')}>mg Malagasy</div>
      </div>
    </DropDown>
  )
}

export default LanguageSelector
