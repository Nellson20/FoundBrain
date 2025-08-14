import React, { useEffect } from 'react'
import { Field } from 'formik'
import AmountInput from '../../components/AmountInput/AmountInput'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import { useTranslation } from 'react-i18next'

const ParkingOptions = ({ formData: { includeParking, parkingWithSupplement, numberOfPlaces }, initialFields, setFormData, currentStepErrors, currentStepValues, setInitialFields }) => {
  const { t } = useTranslation()

  useEffect(() => {
    setInitialFields(prev => ({ ...prev, includeParking: "0", parkingWithSupplement: "0", parkingLocation: "sur place", parkingType: 'privée' }))
  }, [currentStepValues])
  useEffect(() => {
    setInitialFields(prev => ({ ...prev, ...currentStepValues }))
  }, [currentStepValues])
  return (
    <div className='parking-options'>
      <div className="form-group">
        <label htmlFor="">{t("Le clients a-t-il accès à un parking/guarage ?")}</label>
        <label className='flex align-items-center gap-5'>
          <Field type="radio" value={1} checked={initialFields.includeParking == "1"} name='includeParking' />
          <span>{t("Oui")}</span>
        </label>
        <label className='flex align-items-center gap-5'>
          <Field type="radio" value={0} checked={initialFields.includeParking == "0"} name='includeParking' />
          <span>{t("Non")}</span>
        </label>
      </div>
      {
        currentStepValues.includeParking == 1 &&
        <div className="form-group">
          <label htmlFor="">{t("Le parking est il inclus dans le tarif ?")}</label>
          <label className='flex align-items-center gap-5'>
            <Field type="radio" value={0} checked={initialFields.parkingWithSupplement == "0"} name='parkingWithSupplement' />
            <span>{t("Oui")}</span>
          </label>
          <label className='flex align-items-center gap-5'>
            <Field type="radio" value={1} checked={initialFields.parkingWithSupplement == "1"} name='parkingWithSupplement' />
            <span>{t("Non")}</span>
          </label>
        </div>
      }

      <hr />
      {
        currentStepValues.parkingWithSupplement == 1 &&
        <div className="form-group">
          <label htmlFor="">{t("Tarif pour le parking par voiture par jour")}</label>
          <div className="flex align-items-center gap-10">
            <Field name="parkingSupplement">
              {({ field, form, meta }) => (
                <AmountInput onChange={(amount) => form.setFieldValue(field.name, amount)} />
              )}
            </Field>
          </div>
          <ErrorLabel error={currentStepErrors.parkingSupplement?.value || currentStepErrors.parkingSupplement} />
        </div>
      }
      {
        currentStepValues.includeParking == 1 &&
        <>
          <div className="form-group">
            <label htmlFor="">{t("Nombre de parking disponible")}</label>
            <div className="gap-5">
              <div>
                <Field name="numberOfPlaces" className="inpt" placeholder={t("Combien de parking disponible ?")} />
              </div>
              <ErrorLabel error={currentStepErrors.numberOfPlaces} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">{t("Emplacement du parking")}</label>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="parkingLocation" value="sur place" checked={initialFields.parkingLocation == "sur place"} />
              <span>{t("Sur place")}</span>
            </label>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="parkingLocation" value="à proximité" checked={initialFields.parkingLocation == "à proximité"} />
              <span>{t("A proximité")}</span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="">{t("Type de parking")}</label>
            <label className='flex align-items-center gap-5'>
              <Field type="radio" name="parkingType" value="publique" checked={initialFields.parkingType == "publique"} />
              <span>{t("Publique")}</span>
            </label>
            <label className='flex align-items-center gap-5'>

              <Field type="radio" name="parkingType" value="privée" checked={initialFields.parkingType == "privée"} />
              <span>{t("Privé")}</span>
            </label>
          </div>
        </>
      }


    </div>
  )
}

export default ParkingOptions
