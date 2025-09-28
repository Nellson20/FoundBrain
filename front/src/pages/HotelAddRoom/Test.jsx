import { Formik, Form, Field, FieldArray } from "formik";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";   // <-- ajouté

const AccommodationInformationForm = ({
  formData,
  setFormData,
  initialFields,
  setInitialFields = () => {},
  handleChange = () => {},
  currentStepValues,
  currentStepErrors,
  touched,
}) => {
  const { t } = useTranslation();  // <-- ajouté

  const [bedList, setBedList] = useState([{ bedType: "", bedNumber: null }]);

  const addBed = () => {
    setBedList([...bedList, { bedType: "", bedNumber: null }]);
  };

  const removeBed = (index) => {
    const newBedList = [...bedList];
    newBedList.splice(index, 1);
    setBedList(newBedList);
  };
  useEffect(() => {
    setInitialFields(prev=>({...prev,...currentStepValues}))
}, [currentStepValues])
useEffect(() => {
setInitialFields(currentStepValues);
}, [currentStepValues]);
  useEffect(() => {
    console.log(currentStepValues.beds[0].bedType, "test error");
    // console.log(bedList, "test bedList");

  }, [currentStepValues.beds[0].bedType, bedList]);

  return (
    <>
      <div className="add-accommodation-info">
        <div className="form-group">
          <label htmlFor="">{/* t('Accommodation type') */}Type d'hébergement</label>
          <Field className="select" as="select" name="accommodationType">
            <option value="">{/* t('Select your accommodation type') */}Sélectionner votre type d'hébergement</option>
            <option value="double">{/* t('Double') */}Double</option>
            <option value="simple">{/* t('Simple') */}Simple</option>
            <option value="familiale">{/* t('Family') */}Familiale</option>
            <option value="triple">{/* t('Triple') */}Triple</option>
          </Field>
          <ErrorLabel error={currentStepErrors.accommodationType} />
        </div>
        <div className="form-group">
          <label htmlFor="">{/* t('Number of accommodations') */}Nombre d'hébergement de ce type</label>
          <Field type="number" name="accommodationNumber" />
          <ErrorLabel error={currentStepErrors.accommodationNumber} />
        </div>
        <hr />
        <div>
          {bedList.map((bed, index) => (
            <div key={index} style={{ marginTop: index > 0 && "20px" }}>
              <div>
                <div className="flex align-items-center justify-content-between">
                  <label>
                    {index > 0 ? t("Other bed type") : t("Bed type")}
                  </label>
                  {index > 0 && (
                    <span
                      className="delete"
                      type="button"
                      onClick={() => removeBed(index)}
                    >
                      {t("Delete")}
                    </span>
                  )}
                </div>
                <Field
                  as="select"
                  name={`beds[${index}].bedType`}
                  value={bed.bedType}  
                >
                  <option value="">{t("Select a bed type")}</option>
                  <option value="simple">{t("Single bed(s)")}</option>
                  <option value="double">{t("Double bed(s)")}</option>
                </Field>
                <ErrorLabel
                  error={
                    currentStepErrors.beds &&
                    currentStepErrors.beds[index]?.bedType
                  }
                />
              </div>
              <div className="mt-10">
                <label>{t("Number of beds of this type")}</label>
                <Field
                  type="number"
                  name={`beds[${index}].bedNumber`}
                  value={bed.bedNumber}
                />
                <ErrorLabel
                  error={
                    currentStepErrors.beds &&
                    currentStepErrors.beds[index]?.bedNumber
                  }
                />
              </div>
            </div>
          ))}
          <button className="btn-orange mt-10" type="button" onClick={addBed}>
            {t("Add another bed type")}
          </button>
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="">{t("Maximum number of guests")}</label>
          <Field type="number" name="occupation" />
          <ErrorLabel error={currentStepErrors.occupation} />
        </div>
      </div>
    </>
  );
};

export default AccommodationInformationForm;
