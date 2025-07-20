import React, { useEffect } from 'react'
import './AddHotel.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LocationSelector from '../../components/LocationSelector/LocationSelector';
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel';
import { getCitiesList } from '../../api/city';
import SelectSearch from '../../components/SelectSearch/SelectSearch';
import { Link } from 'react-router-dom';

const HotelLocationForm = ({ formData, setFormData, setInitialFields = () => { }, initialFields, currentStepValues, currentStepErrors }) => {
  useEffect(() => {
    setInitialFields(currentStepValues)
  }, [currentStepValues])
  
  return (
    <div className='hotel-location-form'>
      <div className="form-group">
        <label htmlFor="">Votre ville</label>
        <div className="form-group">
          <Field name="hotelCity">
            {({ field, form, meta }) =>

              <SelectSearch
                onInit={()=>{form.setFieldValue(field.name, formData.hotelCity ? formData.hotelCity?.name : null)}}
                value={formData.hotelCity ? formData.hotelCity?.name : null}
                searchFields={['name']}
                onChange={(city) => { form.setFieldValue(field.name, city) }}
                placeholder='Selectionner votre ville'
                searchPlaceholder='Rechercher votre ville'
                query={(filters) => getCitiesList({ filters })}
                repoName="citiesListRepo"
                toPlaceholder={(elem) => elem.name}
                objectMapping={(c) => ({ ...c, value: `/cities/${c.id}` })}
                mapping={(c) => <Link>
                  <span>{c.name}</span>
                </Link>} />
            }
          </Field>
          <ErrorLabel error={currentStepErrors.hotelCity?.value || currentStepErrors.hotelCity} />
        </div>

        
      </div>
      <div className="form-group">
        <label htmlFor="">Nom de la rue</label>
        <Field className="inpt" type="text" name='streetName' placeholder='Quel est le nom de la rue ?' />
        <ErrorLabel error={currentStepErrors.streetName} />
      </div>
      <div className="location-pin form-group">
        <label htmlFor="">Selectionnez sur la carte</label>
        <small>Cette adresse s'affiche sur la carte interactive lorsque les utilisateurs recherchent des hotels sur GateAfri</small>
        <Field name="hotelLocation">
          {({ field, form, meta }) => (
            <LocationSelector
              onInit={({ lat, lng }) => {
                form.setFieldValue(field.name, formData.hotelLocation ?? { lat, lng })
              }}
              onSelect={({ lat, lng }) => {
                form.setFieldValue(field.name, { lat, lng })
              }} />
          )}
        </Field>

      </div>

    </div>
  )
}

export default HotelLocationForm
