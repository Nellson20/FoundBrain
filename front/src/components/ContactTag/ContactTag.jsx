import React from 'react'
import { X } from 'react-bootstrap-icons'
import Avatar from '../Avatar/Avatar'
import Searchbar from '../Searchbar/Searchbar'
import './ContactTag.css'
import { useTranslation } from 'react-i18next'


const ContactTag = () => {
  const { t } = useTranslation();
  return (
    <div className='contact-tag'>
      <div className="top" style={{position:'sticky !important',top:0}}>
        <Searchbar />
      </div>
      <div className="content">
        <div className="tagged">
          <h4 className='mb-10'>{t('Tagués')}</h4>
          <ul>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <span><X size={25}/></span>
            </li>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <span><X size={25}/></span>
            </li>
          </ul>
        </div>
        <div className="contact-list">
          <h4 className='mb-10'>Contacts</h4>
          <ul>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <input type="checkbox" />
            </li>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <input type="checkbox" />
            </li>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <input type="checkbox" />
            </li>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <input type="checkbox" />
            </li>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={40} height={40} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <input type="checkbox" />
            </li>
            <li className='flex gap-10 justify-content-between align-items-center'>
              <div className="left flex gap-10 align-items-center">
                <Avatar width={42} height={42} />
                <span className="contact-name">Donnell Son</span>
              </div>
              <input type="checkbox" />
            </li>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default ContactTag
