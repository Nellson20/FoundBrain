import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import Select from "../../components/Input/Select";

const AccommodationName = ({
  formData,
  setFormData,
  setInitialFields = () => {},
  initialFields,
  currentStepValues,
  currentStepErrors,
}) => {
  useEffect(() => {
    setInitialFields(currentStepValues);
  }, [currentStepValues]);
  return (
    <div className="accommodation-name">
      <span>
        C'est le nom que les clients verront sur la page de votre hébergement.
        Optez pour un nom qui correspond le mieux à cet hébergement.
      </span>
      <div className="form-group mt-20">
        <label htmlFor="">Nom de l'hebergement</label>
        <Field name="accommodationName">
              {
                ({ field, form }) => (
                  <Select selectedValue={formData.accommodationName} onChange={(selected) => form.setFieldValue(field.name, selected)} placeholder="Selectionez un nom pour cet hébergement" selectList={[
                    { title: "Chambre Double", value: "Chambre Double" },
                    { title: "Chambre Double(avec terasse)", value: "Chambre Double(avec terasse)" },
                  ]} />
                )
              }
            </Field>
        <ErrorLabel error={currentStepErrors.accommodationName} />
      </div>
    </div>
  );
};

export default AccommodationName;
