// src/components/LanguageSelector.js
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import axios from '../../axios'

const LanguageSelector = ({ userSettingsId }) => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng)

    try {
      await axios.patch('/api/me/account-settings', {
        lang: lng
      })
    } catch (error) {
      console.error('Erreur de mise à jour de la langue :', error)
    }
    setIsOpen(false)
  }
  

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'mg', label: 'Malagasy', flag: '🇲🇬' },
  ]

  // Normaliser la langue pour obtenir seulement les 2 premières lettres (fr, en, mg)
  const currentLang = i18n.language.split('-')[0]
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]
  // const { t } = useTranslation();

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="custom-language-selector" ref={selectorRef}>
      <div className="selected-language" onClick={() => setIsOpen(!isOpen)}>
        <div className="language-content">
          <span className="language-label">{t('Langue')}</span>
          <span className="language-value">{currentLanguage.flag} {currentLanguage.label}</span>
        </div>
        {/* <span className="dropdown-arrow">▼</span> */}
      </div>
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <div 
              key={lang.code} 
              className={`language-option ${lang.code === currentLang ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.flag} {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
