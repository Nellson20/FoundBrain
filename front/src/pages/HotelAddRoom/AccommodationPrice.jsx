import { Field, ErrorMessage } from "formik";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import AmountInput from "../../components/AmountInput/AmountInput";
import { useTranslation } from 'react-i18next';

const AccommodationPrice = ({
  formData,
  setFormData,
  setInitialFields = () => {},
  initialFields,
  currentStepValues,
  currentStepErrors,
}) => {
  const { t } = useTranslation();

  return (
    <div className="accommodation-price">
      <div className="form-group">
        <label htmlFor="">{t("Tarif pour une nuit")}</label>
        <div className="flex align-items-center gap-10">
          <Field name="accommodationTarif">
            {({ field, form, meta }) => <AmountInput field={field} />}
          </Field>
          <span>{t("/nuit")}</span>
        </div>
        <ErrorLabel error={currentStepErrors.accommodationTarif} />
      </div>
      <hr />
      <p className="txt-3">
        {t("Pas de souci ! Vous aurez toute la liberté de le changer à votre gré. Vous pourrez même ajuster les prix en fonction des jours de la semaine, des fins de semaine ou des périodes de l'année, ce qui vous donnera un contrôle total sur vos gains.")}
      </p>
    </div>
  );
};

export default AccommodationPrice;
