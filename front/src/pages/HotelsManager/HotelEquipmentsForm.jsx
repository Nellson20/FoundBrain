import React, { useEffect } from 'react'
import { Field, ErrorMessage } from 'formik';
import ErrorLabel from '../../components/ErrorLabel/ErrorLabel';
import { useQuery } from '@tanstack/react-query';
import { getHotelEquipments, getHotelServices } from '../../api/hotel';
import Skeleton from '../../components/Skeleton/Skeleton';
import { getRandomNumber } from '../../functions'
import CheckBox from '../../components/CheckBox/CheckBox';
import { useTranslation } from 'react-i18next';

const HotelEquipmentsForm = ({ formData, initialFields, setFormData, currentStepErrors, currentStepValues, setInitialFields }) => {
    const { t } = useTranslation();

    //get equipments list
    const {
        data: hotelEquipments,
        error: hotelEquipmentsErr,
        isLoading: hotelEquipmentsLoading
    } = useQuery({
        queryKey: ['hotelEquipmentsList'],
        queryFn: () => getHotelEquipments()
    })

    useEffect(() => {
        setInitialFields(currentStepValues)
    }, [currentStepValues])

    //get services list
    const {
        data: hotelServices,
        error: hotelServicesErr,
        isLoading: hotelServicesLoading
    } = useQuery({
        queryKey: ['hotelServicesList'],
        queryFn: () => getHotelServices()
    })

    useEffect(() => {
        console.log(hotelServices, 'servic')
    }, [hotelServices])


    return (
        <div className='hotel-equipments-form'>
            <div className="form-group">
                <label htmlFor="">{t("Équipements")}</label>
            </div>
            <div className="form-group" role="group" aria-labelledby="checkbox-group">
                {
                    hotelEquipmentsLoading ?
                        [...new Array(20)].map((_,i) => <Skeleton key={i} radius={2} height={10} width={`${getRandomNumber(30, 80)}%`} />)
                        :
                        hotelEquipments?.map((e, i) => (
                            <div key={i}>
                                <label className="flex align-items-center gap-5">
                                    <Field name="hotelEquipments" value={`/hotel_equipments/${e.id}`} >
                                        {({ field, form }) => {
                                            const isChecked = form.values.hotelEquipments?.includes(`/hotel_equipments/${e.id}`);
                                            return (
                                                <CheckBox
                                                    checked={isChecked}
                                                    value={`/hotel_equipments/${e.id}`}
                                                    onChange={(e) => {
                                                        const currentValues = form.values.hotelEquipments;
                                                        const newValue = e.target.checked ? (currentValues ? [...currentValues, e.target.value] : [e.target.value]) : currentValues.filter(value => value !== e.target.value);
                                                        form.setFieldValue(field.name, newValue);
                                                    }} />
                                            )
                                        }}
                                    </Field>
                                    <span>{e.equipmentTitle}</span>
                                </label>
                            </div>
                        ))
                }
            </div>
            <div>
                <ErrorLabel error={currentStepErrors.hotelEquipments} />
            </div>
            <hr />
            <div className="form-group">
                <label htmlFor="">{t("Services")}</label>
            </div>
            <div className="form-group" role="group" aria-labelledby="checkbox-group">
                {
                    hotelServicesLoading ?
                        [...new Array(20)].map((_,i) => <Skeleton key={i} radius={2} height={10} width={`${getRandomNumber(30, 80)}%`} />)
                        :
                        hotelServices?.map((s, i) => (
                            <div key={i}>
                                <label className="flex align-items-center gap-5">
                                    <Field type="checkbox" name="hotelServices" value={`/hotel_services/${s.id}`} >
                                        {({ field, form }) => {
                                            const isChecked = form.values.hotelServices?.includes(`/hotel_services/${s.id}`);
                                            return (
                                                <CheckBox
                                                    checked={isChecked}
                                                    value={`/hotel_services/${s.id}`} onChange={(e) => {
                                                        const currentValues = form.values.hotelServices;
                                                        const newValue = e.target.checked ? (currentValues ? [...currentValues, e.target.value] : [e.target.value]) : currentValues.filter(value => value !== e.target.value);
                                                        form.setFieldValue(field.name, newValue);
                                                    }} />
                                            )
                                        }}
                                    </Field>
                                    <span>{s.title}</span>
                                </label>
                            </div>
                        ))
                }
            </div>
            <div className="mb-15">
                <ErrorLabel error={currentStepErrors.hotelServices} />
            </div>
        </div >
    )
}

export default HotelEquipmentsForm
