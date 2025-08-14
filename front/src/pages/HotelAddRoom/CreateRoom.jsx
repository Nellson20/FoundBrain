import React from 'react';
import MultiStepForm from "../../components/MuliStepForm/MultiStepForm";
import "./CreateRoom.scss";
import * as Yup from 'yup';
import BathroomInfoForm from './BathroomInfoForm';
import AccommodationInfoForm from './AccommodationInfoForm';
import AccommodationName from './AccommodationName';
import AccommodationPrice from './AccommodationPrice';
import { useTranslation } from 'react-i18next';

const CreateRoom = () => {
  const { t } = useTranslation();

  return (
    <div id="create-room">
      <MultiStepForm
        steps={[
          {
            title: t("Informations sur l'hébergement"),
            initialValues: {
              accommodationType: {},
              accommodationNumber: '',
              beds: [{ bedType: '', bedNumber: '' }],
              occupation: '',
            },
            path: 'informations',
            validationSchema: Yup.object().shape({
              accommodationType: Yup.object().shape({
                value: Yup.string().required(t('Le type d\'hébergement est obligatoire')),
              }).required(t('Le type d\'hébergement est obligatoire')),
              accommodationNumber: Yup.number().required(t('Le nombre d\'hébergement est obligatoire')),
              beds: Yup.array()
                .of(
                  Yup.object().shape({
                    bedType: Yup.object().shape({
                      value: Yup.string().required(t('Le type de lit est obligatoire')),
                    }).required(t('Le type de lit est obligatoire')),
                    bedNumber: Yup.number().required(t('Le nombre de lits est obligatoire')),
                  })
                )
                .required(t('Ajoutez au moins un type de lit')),
              occupation: Yup.number().required(t('Le nombre maximum de personnes est obligatoire')),
            }),
          },
          {
            title: t('Informations sur la salle de bains'),
            initialValues: {
              bathroomType: "",
              bathroomEquipments: [],
            },
            path: 'bathroom',
            validationSchema: Yup.object().shape({
              bathroomType: Yup.string().required(t('Le type de salle de bain est requise')),
              bathroomEquipments: Yup.array()
                .min(1, t('Veuillez sélectionner au moins 1 équipement'))
                .required(t('Veuillez sélectionner au moins 1 équipement')),
            }),
          },
          {
            title: t('Nom de l\'hébergement'),
            initialValues: { accommodationName: '' },
            path: 'nom',
            validationSchema: Yup.object().shape({
              accommodationName: Yup.object().shape({
                value: Yup.string().required(t('Le nom de l\'hébergement est obligatoire')),
              }).required(t('Le nom de l\'hébergement est obligatoire')),
            }),
          },
          {
            title: t('Tarif de l\'hébergement'),
            initialValues: { accommodationTarif: "0" },
            path: 'tarif',
            validationSchema: Yup.object().shape({
              accommodationTarif: Yup.number().required(t('Veuillez indiquer votre prix.')),
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
