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

const AddHotel = () => {
    const navigate=useNavigate()
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
                        title: 'Informations sur votre hotel',
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
                            hotelName: Yup.string().required('Le nom de l\'hotel est obligatoire'),
                            hotelDescription: Yup.string().required('La déscription de l\'hotel est obligatoire'),
                            hotelPortal: Yup.object().shape({
                                value: Yup.string().required('Veillez selectionner un portail')
                            }).required('Veillez selectionner un portail'),
                            hotelStars: Yup.string().required('Le nombre d\'étoile est obligatoire'),
                            hotelEmails: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        email: Yup.string().required('L\'adresse email ne doit pas être vide'),
                                    })
                                )
                                .min(1, 'Le tableau doit contenir au moins un email')
                                .required('Le champ doit être un tableau d\'objets email'),
                            hotelPhones: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        phoneNumber: Yup.object().shape({
                                            number: Yup.string().required('Le numéro de téléphone est obligatoire'),
                                            country: Yup.string().required('Le pays du numéro est obligatoire')
                                        }).required('Le champ phoneNumber est obligatoire')
                                    })
                                )
                                .min(1, 'Au moins un numéro de téléphone doit être fourni')
                                .required('Au moins un numéro de téléphone doit être fourni'),
                        }),
                    },
                    {
                        title: 'Localisation de votre hotel',
                        initialValues: {
                            hotelCity: {}, streetName: '', hotelLocation: {
                                lat: '',
                                lng: ''
                            }
                        },
                        path: 'localisation',
                        validationSchema: Yup.object().shape({
                            hotelCity: Yup.object().shape({
                                value: Yup.string().required('La ville est requise')
                            }).required('La ville est requise'),
                            streetName: Yup.string().required('Le nom de la rue est requis'),
                            // hotelLocation: Yup.object().shape({
                            //     lat: Yup.string().required('La latitude est requise'),
                            //     lng: Yup.string().required('La longitude est requise')
                            // }),
                        }),
                    },
                    {
                        title: 'Équipements et services proposés par votre hotel',
                        initialValues: { hotelEquipments: [], hotelServices: [] },
                        path: 'equipements-et-services',
                        validationSchema: Yup.object().shape({
                            hotelEquipments: Yup.array()
                                .min(1, 'Veuillez sélectionner au moins 1 équipement')
                                .required('Veuillez sélectionner au moins 1 équipement'),
                            hotelServices: Yup.array()
                                .min(1, 'Veuillez sélectionner au moins 1 service')
                                .required('Veuillez sélectionner au moins 1 service'),
                        }),

                    },
                    {
                        title: 'Petit déjeuner',
                        initialValues: { includeBreakFast: "0", breakFastWithSupplement: "0", breakFastSupplement: '', breakFastTypes: [] },
                        path: 'petit-dejeuner',
                        validationSchema: Yup.object().shape({
                            breakFastSupplement: Yup.object().when('breakFastWithSupplement', (breakFastWithSupplement, schema) => {
                                if (parseInt(breakFastWithSupplement) === 1) {
                                    return schema.shape({
                                        value: Yup.number().min(1, 'Le tarif doit être supérieur à zéro')
                                            .required('Le tarif ne doit pas être vide')
                                    })
                                }
                                return schema.nullable()
                            }),
                        }),
                    },
                    {
                        title: 'Ajouter des images de votre Hotel',
                        initialValues: {
                            hotelImages: []
                        },
                        validationSchema: Yup.object().shape({
                            hotelImages: Yup.array()
                                .min(5, 'Selectinnez au moins 5 images')

                        }),
                        path: 'images',
                    },
                    {
                        title: 'Le clients a-t-il accès à un parking/guarage ?',
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
                                        value: Yup.number().min(1, 'Le tarif doit être supérieur à zéro')
                                            .required('Le tarif ne doit pas être vide')
                                    })
                                }
                                return schema.nullable()
                            }),
                            numberOfPlaces: Yup.string().when('includeParking', (includeParking, schema) => {
                                if (parseInt(includeParking) === 1) {
                                    return schema.required('Le nombre de place disponible est requis.')
                                }
                                return schema.nullable()
                            }),
                            parkingLocation: Yup.string().when('includeParking', (includeParking, schema) => {
                                if (parseInt(includeParking) === 1) {
                                    return schema.required('L\'emplacement du parking est requis.')
                                }
                                return schema.nullable()
                            }),
                            parkingType: Yup.string().when('includeParking', (includeParking, schema) => {
                                if (parseInt(includeParking) === 1) {
                                    return schema.required('Le type de parking est requis.')
                                }
                                return schema.nullable()
                            })
                        }),
                    },
                    {
                        title: 'Politiques et règles de votre hotel',
                        initialValues: { cancellationPollicy: {}, petPollicy: {}, stayRules: {} },
                        path: 'politiques-et-regles',
                    },
                    {
                        title: 'Langues parlés dans votre Hotel',
                        initialValues: { hotelLanguages: [] },
                        validationSchema: Yup.object().shape({
                            hotelLanguages: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        value: Yup.string().required('La propriété value est requise'),
                                    })
                                )
                                .min(1, 'Le tableau doit contenir au moins un objet')
                                .required('Le champ doit être un tableau d\'objets'),
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
