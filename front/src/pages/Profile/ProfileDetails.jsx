import React from 'react'
import TextEditor from '../../components/TextEditor/TextEditor'
import { PlusLg } from 'react-bootstrap-icons'
import './ProfileDetails.scss'

const ProfileDetails = () => {
  return (
    <div id='profil-details'>
            <section className="biography">
                <div className="">
                    <h4 className='mb-10'>Biographie</h4>
                    <TextEditor/>
                </div>
            </section>
            <hr />
            <section className="names mb-15">
                <div className="flex justify-content-between align-items-center">
                    <h4>Surnoms</h4>
                    <div className="btn flex align-items-center gap-10"><button className='btn btn-transparent'><PlusLg /> <span>Ajouter un Surnom</span></button></div>
                </div>
                <ul id="names-list" className="studies-list mt-15">
                    <li className='flex align-items-center gap-5'>Donnelly</li>
                    <li className='flex align-items-center gap-5'>Donnelly</li>
                    <li className='flex align-items-center gap-5'>Donnelly</li>
                </ul>
            </section>
            <hr />
            <section className="activites mb-15">
                <div className="flex justify-content-between align-items-center">
                    <h4>Passions et loisirs</h4>
                    <div className="btn flex align-items-center gap-10"><button className='btn btn-transparent'><PlusLg /> <span>Ajouter une activité</span></button></div>
                </div>
                <ul id="names-list" className="studies-list mt-15">
                    <li className='flex align-items-center gap-5'>Lecture</li>
                    <li className='flex align-items-center gap-5'>Sport</li>
                    <li className='flex align-items-center gap-5'>Cuisine</li>
                </ul>
            </section>
        </div>
  )
}

export default ProfileDetails
