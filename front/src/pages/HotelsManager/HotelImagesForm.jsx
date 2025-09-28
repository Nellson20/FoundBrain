import React, { useEffect, useState } from 'react'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import MediasSelector from '../../components/MediaSelector/MediasSelector'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'

const HotelImagesForm = ({ formData, initialFields, setFormData, currentStepErrors, currentStepValues, setInitialFields }) => {
    const { t } = useTranslation()
    const [images, setImages] = useState(formData?.hotelImages || [])

    useEffect(() => {
        setFormData(prev => ({ ...prev, hotelImages: images }))
        setInitialFields(prev => ({ ...prev, hotelImages: images }))
    }, [images, formData])
    return (
        <div id='hotel-images-form'>
            <p className='mb-15'><strong>{t("Vous devez ajouter au moins 5 photos")}</strong> {t("pour bien présenter votre hotel et les différents service que vous proposez.")}</p>
            <div className="form-group">
                <Field name="hotelImages">
                    {({ field, form, meta }) =>
                        <MediasSelector onChange={(medias)=>{form.setFieldValue(field.name,medias)}} animate={false} defaultState={images} col={3} setMediasState={setImages} />
                    }
                </Field>
            </div>
            <div className="form-group">
                <ErrorLabel error={currentStepErrors.hotelImages} />
            </div>
        </div>
    )
}

export default HotelImagesForm
