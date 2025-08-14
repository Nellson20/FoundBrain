import React from 'react'
import './AddHotel.scss'
import AddHotelIdentity from "./HotelIdentityForm";
import MultiStepForm from "../../components/MuliStepForm/MultiStepForm";
import * as Yup from 'yup';
import HotelIdentityForm from "./HotelIdentityForm";
import HotelLocationForm from "./HotelLocationForm";
import HotelEquipmentsForm from "./HotelEquipmentsForm";
import BreakFastForm from './BreakFastForm';
import ParkingOptions from './ParkingOptions';
import HotelImagesForm from './HotelImagesForm';
import HotelPolicies from './HotelPolicies';
import HotelLanguages from './HotelLanguages';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddHotel = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <div id='add-hotel-page'>
            <MultiStepForm
                onSubmitData={(data, setIsLoading) => {
                    console.log(data, 'HOTEL DATA')
                    const formData = new FormData()
                    formData.append('name', data.hotelName)
                    formData.append('rating', parseInt(data.hotelStars))
                    formData.append('address', data.streetName)
                    formData.append('company', data.hotelPortal?.value)
                    formData.append('city', data.hotelCity?.value)
                    formData.append('parking', JSON.stringify({
                        numberOfPlaces: data.numberOfPlaces,
                        locationParking: data.parkingLocation,
                        parkingType: data.parkingType,
                        pricePlace: data.parkingSupplement ? { value: data.parkingSupplement.value, currency: `/currencies/${data.parkingSupplement?.currency.id}` } : null,
                    }))
                    formData.append('breakfast', JSON.stringify({
                        types: data.breakFastTypes,
                        extra: data.breakFastSupplement ? { value: data.breakFastSupplement?.value, currency: `/currencies/${data.breakFastSupplement?.currency.id}` } : null,
                    }))
                    formData.append('emails', JSON.stringify(data.hotelEmails.map((email) => ({
                        value: email?.email,
                        reference: email?.reference
                    }))))
                    formData.append('phoneNumbers', JSON.stringify(data.hotelPhones.map((phone) => ({
                        pays: phone?.phoneNumber.country,
                        value: phone?.phoneNumber.number,
                        reference: phone?.reference
                    }))))

                    formData.append('equipments', JSON.stringify(data.hotelEquipments))

                    formData.append('services', JSON.stringify(data.hotelServices))

                    if (data.hotelImages.length > 0) {
                        data.hotelImages.forEach((img) => {
                            formData.append('hotelImages[]', img)
                        })
                      }
                    
                    formData.append('languages', JSON.stringify(data.hotelLanguages.map((lang) => lang?.value)))

                    data.cancellationPollicy && formData.append('rules', JSON.stringify([data.petPollicy,data.cancellationPollicy,data.stayRules]))
                    
                    data.hotelWebsite && formData.append('website', data.hotelWebsite)
                    data.hotelLocation && formData.append('position', JSON.stringify(data.hotelLocation))
                    data.hotelDescription && formData.append('description', data.hotelDescription)

                    //send hotel
                    setIsLoading(true)
                    axios({
                        url: `${process.env.REACT_APP_API_DOMAIN}/hotels`,
                        method: 'post',
                        data: formData,
                        withCredentials: true
                    }).then((res) => {
                        setIsLoading(false)
                        navigate(`/hotels/${res.data.id}/hotel-admin/`)
                    }).catch((err) => {
                        console.log(err, 'HOTEL ERR')
                        setIsLoading(false)
                    })

                }}
                steps={[
                    {
                        title: t('Informations sur votre hotel'),
                        initialValues: {
                            hotelName: '',
                            hotelDescription: '',
                            hotelPortal: '',
                            hotelWebsite: '',
                            hotelStars: '1',
                            hotelEmails: [],
                            hotelPhones: []
                        },
                        path: 'informations',
                        validationSchema: Yup.object().shape({
                            hotelName: Yup.string().required(t('Le nom de l\'hotel est obligatoire')),
                            hotelDescription: Yup.string().required(t('La déscription de l\'hotel est obligatoire')),
                            hotelPortal: Yup.object().shape({
                                value: Yup.string().required(t('Veillez selectionner un portail'))
                            }).required(t('Veillez selectionner un portail')),
                            hotelStars: Yup.string().required(t('Le nombre d\'étoile est obligatoire')),
                            hotelEmails: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        email: Yup.string().required(t('L\'adresse email ne doit pas être vide')),
                                    })
                                )
                                .min(1, t('Le tableau doit contenir au moins un email'))
                                .required(t('Le champ doit être un tableau d\'objets email')),
                            hotelPhones: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        phoneNumber: Yup.object().shape({
                                            number: Yup.string().required(t('Le numéro de téléphone est obligatoire')),
                                            country: Yup.string().required(t('Le pays du numéro est obligatoire'))
                                        }).required(t('Le champ phoneNumber est obligatoire'))
                                    })
                                )
                                .min(1, t('Au moins un numéro de téléphone doit être fourni'))
                                .required(t('Au moins un numéro de téléphone doit être fourni')),
                        }),
                    },
                    {
                        title: t('Localisation de votre hotel'),
                        initialValues: {
                            hotelCity: {}, streetName: '', hotelLocation: {
                                lat: '',
                                lng: ''
                            }
                        },
                        path: 'localisation',
                        validationSchema: Yup.object().shape({
                            hotelCity: Yup.object().shape({
                                value: Yup.string().required(t('La ville est requise'))
                            }).required(t('La ville est requise')),
                            streetName: Yup.string().required(t('Le nom de la rue est requis')),
                        }),
                    },
                    {
                        title: t('Équipements et services proposés par votre hotel'),
                        initialValues: { hotelEquipments: [], hotelServices: [] },
                        path: 'equipements-et-services',
                        validationSchema: Yup.object().shape({
                            hotelEquipments: Yup.array()
                                .min(1, t('Veuillez sélectionner au moins 1 équipement'))
                                .required(t('Veuillez sélectionner au moins 1 équipement')),
                            hotelServices: Yup.array()
                                .min(1, t('Veuillez sélectionner au moins 1 service'))
                                .required(t('Veuillez sélectionner au moins 1 service')),
                        }),

                    },
                    {
                        title: t('Petit déjeuner'),
                        initialValues: { includeBreakFast: "0", breakFastWithSupplement: "0", breakFastSupplement: '', breakFastTypes: [] },
                        path: 'petit-dejeuner',
                        validationSchema: Yup.object().shape({
                            breakFastSupplement: Yup.object().when('breakFastWithSupplement', (breakFastWithSupplement, schema) => {
                                if (parseInt(breakFastWithSupplement) === 1) {
                                    return schema.shape({
                                        value: Yup.number().min(1, t('Le tarif doit être supérieur à zéro'))
                                            .required(t('Le tarif ne doit pas être vide'))
                                    })
                                }
                                return schema.nullable()
                            }),
                        }),
                    },
                    {
                        title: t('Ajouter des images de votre Hotel'),
                        initialValues: {
                            hotelImages: []
                        },
                        validationSchema: Yup.object().shape({
                            hotelImages: Yup.array()
                                .min(5, t('Selectinnez au moins 5 images'))
                        }),
                        path: 'images',
                    },
                    {
                        title: t('Le clients a-t-il accès à un parking/guarage ?'),
                        initialValues: {
                            includeParking: '0',
                            parkingWithSupplement: 0,
                            parkingSupplement: {},
                            numberOfPlaces: 0,
                            parkingLocation: '',
                            parkingType: ''
                        },
                        path: 'parking',
                        validationSchema: Yup.object().shape({
                            parkingSupplement: Yup.object().when('parkingWithSupplement', (parkingWithSupplement, schema) => {
                                if (parseInt(parkingWithSupplement) === 1) {
                                    return schema.shape({
                                        value: Yup.number().min(1, t('Le tarif doit être supérieur à zéro'))
                                            .required(t('Le tarif ne doit pas être vide'))
                                    })
                                }
                                return schema.nullable()
                            }),
                            numberOfPlaces: Yup.string().when('includeParking', (includeParking, schema) => {
                                if (parseInt(includeParking) === 1) {
                                    return schema.required(t('Le nombre de place disponible est requis.'))
                                }
                                return schema.nullable()
                            }),
                            parkingLocation: Yup.string().when('includeParking', (includeParking, schema) => {
                                if (parseInt(includeParking) === 1) {
                                    return schema.required(t('L\'emplacement du parking est requis.'))
                                }
                                return schema.nullable()
                            }),
                            parkingType: Yup.string().when('includeParking', (includeParking, schema) => {
                                if (parseInt(includeParking) === 1) {
                                    return schema.required(t('Le type de parking est requis.'))
                                }
                                return schema.nullable()
                            })
                        }),
                    },
                    {
                        title: t('Politiques et règles de votre hotel'),
                        initialValues: { cancellationPollicy: {}, petPollicy: {}, stayRules: {} },
                        path: 'politiques-et-regles',
                    },
                    {
                        title: t('Langues parlés dans votre Hotel'),
                        initialValues: { hotelLanguages: [] },
                        validationSchema: Yup.object().shape({
                            hotelLanguages: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        value: Yup.string().required(t('La propriété value est requise')),
                                    })
                                )
                                .min(1, t('Le tableau doit contenir au moins un objet'))
                                .required(t('Le champ doit être un tableau d\'objets')),
                        }),
                        path: 'langues',
                    },
                ]}
            >
                <HotelIdentityForm />
                <HotelLocationForm />
                <HotelEquipmentsForm />
                <BreakFastForm />
                <HotelImagesForm />
                <ParkingOptions />
                <HotelPolicies />
                <HotelLanguages />
            </MultiStepForm>
        </div>
    )
}

export default AddHotel
