import React, { useEffect } from 'react'
import './AddHotel.scss'
import { ArrowLeftShort, ArrowRightShort, StarFill } from 'react-bootstrap-icons'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel';
import AuthorSelector from '../../components/AuthorSelector/AuthorSelector';
import PhoneNumberInput from '../../components/PhoneNumberInput/PhoneNumberInput';
import MultiInputs from '../../components/MultiInputs/MultiInputs';
import MultiEmail from '../../components/MultiEmail/MultiEmail';
import MultiPhone from '../../components/MultiPhone/MultiPhone';

const HotelIdentityForm = ({ formData, setFormData, initialFields, setInitialFields = () => { }, handleChange = () => { }, currentStepValues, currentStepErrors, touched }) => {
  useEffect(() => {
    setInitialFields(currentStepValues)
  }, [currentStepValues])

  useEffect(() => {
    console.log(currentStepValues, 'page1')
  }, [])
  return (
    <div className='add-hotel-identity'>

      <div className="form-group">
        <label htmlFor="">Nom de l'hotel</label>
        <Field className="inpt" type="text" name='hotelName' placeholder='Quel est le nom de votre hotel ?' />
        <small>Les utilisateurs verront ce nom lors de leur recherche</small>
        <ErrorLabel error={currentStepErrors.hotelName} />
      </div>
      <div className="form-group">
        <label htmlFor="">Déscription</label>
        <Field className="inpt" as="textarea" name='hotelDescription' placeholder='Décrivez votre hotel' />
        <ErrorLabel error={currentStepErrors.hotelDescription} />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="">Site web de votre hotel</label>
        <Field name="hotelWebsite" className="inpt" placeholder="exemple.com" />
      </div>
      <div className="form-group">
        <label htmlFor="">Coordonnées de votre hotel</label>
        <small>Vous pouvez ajouter plusieurs adresses emails et téléphones pour chaque résponsables de votre Hotel.</small>
        <div className="form-group">
          <b className='txt-3'>Adresse emails</b>
          <Field name="hotelEmails">
            {
              ({ field, form }) =>
                <MultiEmail
                  validationErrors={currentStepErrors.hotelEmails?.map((err) => err?.email)}
                  onChange={(emails) => {
                    form.setFieldValue(field.name, emails)
                    setFormData(prev => ({ ...prev, hotelPhones: emails }))
                  }}
                />
            }
          </Field>

        </div>
        <div className="form-group">
          <b className='txt-3 mb-10'>Télephones</b>
          <Field name="hotelPhones">
            {
              ({ field, form }) =>
                <MultiPhone
                  validationErrors={currentStepErrors.hotelPhones?.map((err) => err?.phoneNumber)}
                  onChange={(nums) => {
                    form.setFieldValue(field.name, nums)
                    setFormData(prev => ({ ...prev, hotelPhones: nums }))
                  }}
                />
            }
          </Field>

        </div>
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="">Portail de votre hotel</label>
        <Field name="hotelPortal">
          {({ field, form, meta }) => (
            <AuthorSelector
              defaultAuthor={formData?.hotelPortal ? formData?.hotelPortal : null}
              onSelect={(portal) => {
                form.setFieldValue(field.name, { ...portal, value: `/companies/${portal.id}` });
              }} withUser={false} />
          )}
        </Field>

        <ErrorLabel error={currentStepErrors.hotelPortal?.value || currentStepErrors.hotelPortal} />
      </div>

      <div className="form-group">
        <label htmlFor="">Nombre d'étoiles</label>
        <ul className='stars-number'>
          <li className='flex align-items-center gap-5'>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="hotelStars" value="null" />
              <span>Non Applicable</span>
            </label>
          </li>
          <li className='flex align-items-center gap-5'>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="hotelStars" value="1" checked={initialFields.hotelStars == "1"} />
              <span>1 étoile</span><span><StarFill /></span>
            </label>
          </li>
          <li className='flex align-items-center gap-5'>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="hotelStars" value="2" checked={initialFields.hotelStars == "2"} />
              <span>2 étoiles</span><span><StarFill /><StarFill /></span>
            </label>
          </li>
          <li className='flex align-items-center gap-5'>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="hotelStars" value="3" checked={initialFields.hotelStars == "3"} />
              <span>3 étoiles</span><span><StarFill /><StarFill /><StarFill /></span>
            </label>
          </li>
          <li className='flex align-items-center gap-5'>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="hotelStars" value="4" checked={initialFields.hotelStars == "4"} />
              <span>4 étoiles</span><span><StarFill /><StarFill /><StarFill /><StarFill /></span>
            </label>
          </li>
          <li className='flex align-items-center gap-5'>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="hotelStars" value="5" checked={initialFields.hotelStars == "5"} />
              <span>5 étoiles</span><span><StarFill /><StarFill /><StarFill /><StarFill /><StarFill /></span>
            </label>
          </li>
        </ul>
        <ErrorLabel error={currentStepErrors.hotelStars} />
      </div>
    </div>
  )
}

export default HotelIdentityForm
