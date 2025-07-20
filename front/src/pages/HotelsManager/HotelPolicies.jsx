import React, { useEffect } from 'react'
import { Field } from 'formik'
import { StarFill } from 'react-bootstrap-icons'
import TextEditor from '../../components/TextEditor/TextEditor'

const HotelPolicies = ({ formData, setFormData, initialFields, setInitialFields = () => { }, handleChange = () => { }, currentStepValues, currentStepErrors, touched }) => {
    useEffect(() => {
        setInitialFields(currentStepValues)
    }, [currentStepValues])

    return (
        <div className='add-hotel-identity'>

            <div className="form-group">
                <label htmlFor="">Politique d'annulation</label>
                <Field name="cancellationPolicy">
                    {
                        ({ field, form }) => (
                            <TextEditor value={formData.cancellationPolicy ? formData.cancellationPolicy : ""} onChange={(val) => { form.setFieldValue(field.name, { name: "Politique d'annulation", value: val.html }) }} />

                        )
                    }
                </Field>
                <small>Specifiez votre politique concernant les annulation de réservations dans votre Hotel</small>
            </div>
            <div className="form-group">
                <label htmlFor="">Règles pour les animaux domestiques</label>
                <Field name='petPolicy'>
                    {
                        ({ field, form }) => (
                            <TextEditor value={formData.petPolicy ? formData.petPolicy : ""} onChange={(val) => { form.setFieldValue(field.name, { name: "Règles pour les animaux domestiques", value: val.html }) }} />
                        )
                    }
                </Field>
            </div>
            <hr />
            <div className="form-group">
                <div className="form-group">
                    <label htmlFor="">Règles de séjour</label>
                    <Field name='stayRules'>
                        {
                            ({ field, form }) => (
                                <TextEditor value={formData.stayRules ? formData.stayRules : ""}  onChange={(val) => { form.setFieldValue(field.name, { name: "Règles de séjour", value: val.html }) }} />
                            )
                        }
                    </Field>
                    <small>Quels sont les règles mises en vigueur dans votre hotel</small>
                </div>
            </div>
        </div>
    )
}

export default HotelPolicies
