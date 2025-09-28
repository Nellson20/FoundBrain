import React from 'react'
import { getLanguages } from '../../api/language'
import SelectSearch from '../../components/SelectSearch/SelectSearch'
import { Field } from 'formik'
import MultiSelectSearch from '../../components/SelectSearch/MultiSelectSearch'
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel'
import { useTranslation } from 'react-i18next'

const HotelLanguages = ({ formData, setFormData, initialFields, setInitialFields = () => { }, handleChange = () => { }, currentStepValues, currentStepErrors, touched }) => {
    const { t } = useTranslation()

    return (
        <div id='hotel-languages-form'>

            <div className="form-group">
                <label htmlFor="">{t("Langues")}</label>
                <small className='block mb-10'>{t("Quelle sont les langues parlé par les personnels de votre hotel ?")}</small>
                <Field name="hotelLanguages">
                    {({ field, form, meta }) =>
                        <MultiSelectSearch
                            onInit={() => {
                            }}
                            defaultValues={initialFields.hotelLanguages?.map((l) => l.title)}
                            validationErrors={currentStepErrors.hotelLanguages?.map((err) => err?.value)}
                            onChange={(langs) => {
                                form.setFieldValue(field.name, langs)
                                setFormData(prev => ({ ...prev, hotelLanguages: langs }))
                            }}
                            placeholder={t('Choisir un une langue')}
                            searchPlaceholder={t('Rechercher une langue')}
                            query={getLanguages}
                            repoName="langsListRepo"
                            objectMapping={(lang) => ({ title: lang.language, value: `/languages/${lang.id}` })} />
                    }
                </Field>
            </div>
        </div>
    )
}

export default HotelLanguages
