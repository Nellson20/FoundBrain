import React, { useEffect, useState } from 'react'
import './BreakFastForm.scss'
import { Field, ErrorMessage } from 'formik';
import AmountInput from '../../components/AmountInput/AmountInput';
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel';
import { useLocation } from 'react-router-dom';
import { getBreakfastTypes } from '../../api/hotel';
import { useQuery } from '@tanstack/react-query';
import CheckBox from '../../components/CheckBox/CheckBox';
import Skeleton from '../../components/Skeleton/Skeleton';
import { getRandomNumber } from '../../functions';

const BreakFastForm = ({ formData: { includeBreakFast, breakFastWithSupplement }, initialFields, setFormData, currentStepErrors, currentStepValues, setInitialFields }) => {
    useEffect(() => {
        setInitialFields(prev => ({ ...prev, includeBreakFast: "0", breakFastWithSupplement: '0' }))
    }, [currentStepValues])
    useEffect(() => {
        setInitialFields(prev => ({ ...prev, ...currentStepValues }))
    }, [currentStepValues])


    //get breakfastTypes
    const {
        data: breakfastTypes,
        error: breakfastTypesErr,
        isLoading: breakfastTypesLoading,
    } = useQuery({
        queryKey: ['breakfastTypesList'],
        queryFn: () => getBreakfastTypes(),
        enabled: parseInt(initialFields.includeBreakFast) === 1
    })

    return (
        <div className='breakfast-form'>
            <div className="form-group">
                <label>Proposez-vous un petit déjeuner ?</label>
                <label className='flex align-items-center gap-5'>
                    <Field type="radio" value={1} checked={initialFields.includeBreakFast == "1"} name='includeBreakFast' />
                    {/* <input
                        
                        value='1'
                        checked={includeBreakFast === '1'}
                        onChange={(e) => { setFormData(prev => ({ ...prev, includeBreakFast: e.target.value })) }}
                        name='includeBreakFast'
                    /> */}
                    <span>Oui</span>
                </label>
                <label className='flex align-items-center gap-5'>
                    <Field type="radio" value={0} checked={initialFields.includeBreakFast == "0"} name='includeBreakFast' />
                    {/* <input
                        type="radio"
                        value='0'
                        checked={includeBreakFast === '0'}
                        onChange={(e) => { setFormData(prev => ({ ...prev, includeBreakFast: e.target.value })) }}
                        name='includeBreakFast'
                        defaultChecked
                    /> */}
                    <span>Non</span>
                </label>
            </div>
            {
                currentStepValues.includeBreakFast == 1 &&
                <>
                    <div className="form-group">
                        <label>Est-il inclus dans le tarif ?</label>
                        <label className='flex align-items-center gap-5'>
                            <Field type="radio" value={0} checked={initialFields.breakFastWithSupplement == "0"} name='breakFastWithSupplement' />
                            {/* <input
                                type="radio"
                                value='0'
                                checked={breakFastWithSupplement === '0'}
                                onChange={(e) => { setFormData(prev => ({ ...prev, breakFastWithSupplement: e.target.value })) }}
                                name='breakFastWithSupplement'
                                defaultChecked
                            /> */}
                            <span>Oui</span>
                        </label>
                        <label className='flex align-items-center gap-5'>
                            <Field type="radio" value={1} checked={initialFields.breakFastWithSupplement == "1"} name='breakFastWithSupplement' />
                            {/* <input
                                type="radio"
                                value='1'
                                checked={breakFastWithSupplement === '1'}
                                onChange={(e) => { setFormData(prev => ({ ...prev, breakFastWithSupplement: e.target.value })) }}
                                name='withSupplement'
                                defaultChecked
                            /> */}
                            <span>Non, avec un suplément</span>
                        </label>

                        {
                            currentStepValues.breakFastWithSupplement == 1 &&
                            <div className='form-group'>
                                <label htmlFor="">Tarif petit déjeuner par personne par jour</label>
                                <div className="">
                                    <Field name="breakFastSupplement">
                                        {({ field, form, meta }) => (
                                            <AmountInput onChange={(amount) => form.setFieldValue(field.name, amount)} />
                                        )}
                                    </Field>
                                    <ErrorLabel error={currentStepErrors.breakFastSupplement?.value || currentStepErrors.breakFastSupplement} />
                                </div>
                                <ErrorMessage name='hotelName' component="div" />
                            </div>
                        }


                    </div>
                    {
                        breakfastTypesLoading ?
                            <div className="brakfast-types mt-15 mb-15">
                                {[...new Array(10)].map((_,i) => <Skeleton key={i} radius={2} height={10} width={`${getRandomNumber(30, 80)}%`} />)}
                            </div>
                            :
                            (breakfastTypes && breakfastTypes.length > 0) &&
                            <>
                                <hr />
                                <div className="form-group">
                                    <label>Type de petit déjeuner</label>
                                    <div className="brakfast-types mt-15">
                                        {
                                            breakfastTypes?.map((b, i) => (
                                                <div key={i}>
                                                    <label className="flex align-items-center gap-5">
                                                        <Field name="breakFastTypes" value={`/type_breakfasts/${b.id}`} >
                                                            {({ field, form }) => {
                                                                const isChecked = form.values.breakFastTypes?.includes(`/type_breakfasts/${b.id}`);
                                                                return (
                                                                    <CheckBox
                                                                        checked={isChecked}
                                                                        value={`/type_breakfasts/${b.id}`}
                                                                        onChange={(e) => {
                                                                            const currentValues = form.values.breakFastTypes;
                                                                            const newValue = e.target.checked ? (currentValues ? [...currentValues, e.target.value] : [e.target.value]) : currentValues.filter(value => value !== e.target.value);
                                                                            form.setFieldValue(field.name, newValue);
                                                                        }} />
                                                                )
                                                            }

                                                            }
                                                        </Field>
                                                        <span>{b.name}</span>
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                    }
                </>
            }
        </div>
    )
}

export default BreakFastForm
