import React from 'react'
import TextEditor from '../../components/TextEditor/TextEditor'
import { PlusLg } from 'react-bootstrap-icons'
import './ProfileDetails.scss'
import { useTranslation } from 'react-i18next'

const ProfileDetails = () => {
  const { t } = useTranslation()

  return (
    <div id='profil-details'>
      <section className="biography">
        <div className="">
          <h4 className='mb-10'>{t("Biographie")}</h4>
          <TextEditor/>
        </div>
      </section>
      <hr />
      <section className="names mb-15">
        <div className="flex justify-content-between align-items-center">
          <h4>{t("Surnoms")}</h4>
          <div className="btn flex align-items-center gap-10">
            <button className='btn btn-transparent'>
              <PlusLg /> <span>{t("Ajouter un Surnom")}</span>
            </button>
          </div>
        </div>
        <ul id="names-list" className="studies-list mt-15">
          <li className='flex align-items-center gap-5'>{t("Donnelly")}</li>
          <li className='flex align-items-center gap-5'>{t("Donnelly")}</li>
          <li className='flex align-items-center gap-5'>{t("Donnelly")}</li>
        </ul>
      </section>
      <hr />
      <section className="activites mb-15">
        <div className="flex justify-content-between align-items-center">
          <h4>{t("Passions et loisirs")}</h4>
          <div className="btn flex align-items-center gap-10">
            <button className='btn btn-transparent'>
              <PlusLg /> <span>{t("Ajouter une activité")}</span>
            </button>
          </div>
        </div>
        <ul id="names-list" className="studies-list mt-15">
          <li className='flex align-items-center gap-5'>{t("Lecture")}</li>
          <li className='flex align-items-center gap-5'>{t("Sport")}</li>
          <li className='flex align-items-center gap-5'>{t("Cuisine")}</li>
        </ul>
      </section>
    </div>
  )
}

export default ProfileDetails
