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
    <select
      className="language-selector"
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
