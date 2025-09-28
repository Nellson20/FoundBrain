import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import Select from "../../components/Input/Select";
import { useTranslation } from 'react-i18next';

const AccommodationName = ({
  formData,
  setFormData,
  setInitialFields = () => {},
  initialFields,
  currentStepValues,
  currentStepErrors,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setInitialFields(currentStepValues);
  }, [currentStepValues]);

  return (
    <div className="accommodation-name">
      <span>
        {t("C'est le nom que les clients verront sur la page de votre hébergement. Optez pour un nom qui correspond le mieux à cet hébergement.")}
      </span>
      <div className="form-group mt-20">
        <label htmlFor="">{t("Nom de l'hebergement")}</label>
        <Field name="accommodationName">
          {
            ({ field, form }) => (
              <Select 
                selectedValue={formData.accommodationName} 
                onChange={(selected) => form.setFieldValue(field.name, selected)} 
                placeholder={t("Selectionez un nom pour cet hébergement")} 
                selectList={[
                  { title: t("Chambre Double"), value: "Chambre Double" },
                  { title: t("Chambre Double(avec terasse)"), value: "Chambre Double(avec terasse)" },
                ]} 
              />
            )
          }
        </Field>
        <ErrorLabel error={currentStepErrors.accommodationName} />
      </div>
    </div>
  );
};

export default AccommodationName;
