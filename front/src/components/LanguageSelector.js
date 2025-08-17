// src/components/LanguageSelector.js
import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const languages = [
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'en', label: '🇺🇸 English' },
    { code: 'mg', label: '🇲🇬 Malagasy' },
  ]

  return (
    <ul className="language-menu">
      {languages.map((lang) => (
        <li
          key={lang.code}
          className={i18n.language === lang.code ? 'active' : ''}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.label}
        </li>
      ))}
    </ul>
  )
}

export default LanguageSelector
