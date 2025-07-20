import React from 'react';
import MultiStepForm from "../../components/MuliStepForm/MultiStepForm";
import "./CreateRoom.scss";
import * as Yup from 'yup';
import BathroomInfoForm from './BathroomInfoForm';
import AccommodationInfoForm from './AccommodationInfoForm';
import AccommodationName from './AccommodationName';
import AccommodationPrice from './AccommodationPrice';


const CreateRoom = () => {
  return (
    <div id="create-room">
      <MultiStepForm
        steps={[
          {
            title: 'Informations sur l\'hébergement',
            initialValues: {
              accommodationType: {},
              accommodationNumber: '',
              beds: [{ bedType: '', bedNumber: '' }], // Initialiser avec un élément vide
              occupation: '',
            },
            path: 'informations',
            validationSchema: Yup.object().shape({
              accommodationType: Yup.object().shape({
                value: Yup.string().required('Le type d\'hébergement est obligatoire'),
              }).required('Le type d\'hébergement est obligatoire'),
              accommodationNumber: Yup.number().required('Le nombre d\'hébergement est obligatoire'),
              beds: Yup.array()
                .of(
                  Yup.object().shape({
                    bedType: Yup.object().shape({
                      value: Yup.string().required('Le type de lit est obligatoire'),
                    }).required('Le type de lit est obligatoire'),
                    bedNumber: Yup.number().required('Le nombre de lits est obligatoire'),
                  })
                )
                .required('Ajoutez au moins un type de lit'),
              occupation: Yup.number().required('Le nombre maximum de personnes est obligatoire'),
            }),
          },
          {
            title: 'Informations sur la salle de bains',
            initialValues: {
              bathroomType: "",
              bathroomEquipments: [],
            },
            path: 'bathroom',
            validationSchema: Yup.object().shape({
              bathroomType: Yup.string().required('Le type de salle de bain est requise'),
              bathroomEquipments: Yup.array()
                .min(1, 'Veuillez sélectionner au moins 1 équipement')
                .required('Veuillez sélectionner au moins 1 équipement'),
            }),
          },
          {
            title: 'Nom de l\'hébergement',
            initialValues: { accommodationName: '' },
            path: 'nom',
            validationSchema: Yup.object().shape({
              accommodationName: Yup.object().shape({
                value: Yup.string().required('Le nom de l\'hébergement est obligatoire'),
              }).required('Le nom de l\'hébergement est obligatoire'),
            }),
          },
          {
            title: 'Tarif de l\'hébergement',
            initialValues: { accommodationTarif: "0" },
            path: 'tarif',
            validationSchema: Yup.object().shape({
              accommodationTarif: Yup.number().required('Veuillez indiquer votre prix.'),
            }),
          }
        ]}
      >
        <AccommodationInfoForm />
        <BathroomInfoForm />
        <AccommodationName />
        <AccommodationPrice />
      </MultiStepForm>
    </div>
  );
};

export default CreateRoom;
