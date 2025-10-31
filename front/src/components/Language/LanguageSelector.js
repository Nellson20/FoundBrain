// src/components/LanguageSelector.js
import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from '../../axios'

const LanguageSelector = ({ userSettingsId }) => {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng)

    try {
      await axios.patch('/api/me/account-settings', {
        lang: lng
      })

      alert('Langue mise à jour avec succès')
    } catch (error) {
      console.error('Erreur de mise à jour de la langue :', error)
    }
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
