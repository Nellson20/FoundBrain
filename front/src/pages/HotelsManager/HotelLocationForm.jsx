import React, { useEffect } from 'react'
import './AddHotel.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LocationSelector from '../../components/LocationSelector/LocationSelector';
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel';
import { getCitiesList } from '../../api/city';
import SelectSearch from '../../components/SelectSearch/SelectSearch';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HotelLocationForm = ({ formData, setFormData, setInitialFields = () => { }, initialFields, currentStepValues, currentStepErrors }) => {
  const { t } = useTranslation()

  useEffect(() => {
    setInitialFields(currentStepValues)
  }, [currentStepValues])
  
  return (
    <div className='hotel-location-form'>
      <div className="form-group">
        <label htmlFor="">{t("Votre ville")}</label>
        <div className="form-group">
          <Field name="hotelCity">
            {({ field, form, meta }) =>

              <SelectSearch
                onInit={()=>{form.setFieldValue(field.name, formData.hotelCity ? formData.hotelCity?.name : null)}}
                value={formData.hotelCity ? formData.hotelCity?.name : null}
                searchFields={['name']}
                onChange={(city) => { form.setFieldValue(field.name, city) }}
                placeholder={t('Selectionner votre ville')}
                searchPlaceholder={t('Rechercher votre ville')}
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
        <label htmlFor="">{t("Nom de la rue")}</label>
        <Field className="inpt" type="text" name='streetName' placeholder={t('Quel est le nom de la rue ?')} />
        <ErrorLabel error={currentStepErrors.streetName} />
      </div>
      <div className="location-pin form-group">
        <label htmlFor="">{t("Selectionnez sur la carte")}</label>
        <small>{t("Cette adresse s'affiche sur la carte interactive lorsque les utilisateurs recherchent des hotels sur GateAfri")}</small>
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
