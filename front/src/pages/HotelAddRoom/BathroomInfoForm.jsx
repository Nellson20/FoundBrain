import { Field, ErrorMessage } from "formik";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import { useEffect } from "react";
import SquareRadio from "../../components/Input/SquareRadio";
import { useTranslation } from "react-i18next";

const BathroomInfoForm = ({
  formData,
  currentStepValues,
  initialFields,
  setInitialFields,
  currentStepErrors
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setInitialFields(prev => ({ ...prev, ...currentStepValues }))
  }, [currentStepValues])
  useEffect(() => {
    setInitialFields(prev => ({ ...prev, ...currentStepValues,bathroomType:formData.bathroomType ?? 0 }));
  }, []);
  return (
    <div className="bathroom-info">
      <div className="form-group">
        <label htmlFor="">{t('Type de salle de bains.')}</label>
        <div className="form-group">
          <div className="flex gap-10">
            <Field name="bathroomType">
              {
                ({ form, field }) => (
                  <>
                    <SquareRadio className="flex-1" checked={parseInt(initialFields.bathroomType) === 0} value={0} onChange={(e) => form.setFieldValue(field.name, e.target.value)} name="bathroomType">
                      <span>{t('Privée')}</span>
                    </SquareRadio>
                    <SquareRadio className="flex-1" checked={parseInt(initialFields.bathroomType) === 1} value={1} onChange={(e) => form.setFieldValue(field.name, e.target.value)} name="bathroomType">
                      <span>{t('Partagé')}</span>
                    </SquareRadio>
                  </>
                )
              }
            </Field>
          </div>
        </div>
        <ErrorLabel error={currentStepErrors.bathroomType} />
      </div>

      <div className="form-group">
        <label htmlFor="">{t('Equipements disponibles')}</label>
        <div
          className="form-group grid"
          role="group"
          aria-labelledby="checkbox-group"
        >
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="Papier toilette" />
              <span>{t('Papier toilette')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="Douche" />
              <span>{t('Douche')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="1" />
              <span>{t('Toilettes')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="2" />
              <span>{t('Sèche-cheveux')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="3" />
              <span>{t('Baignoire')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="4" />
              <span>{t('Articles de toilette gratuits')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="5" />
              <span>{t('Bidet')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="6" />
              <span>{t('Chaussons')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="7" />
              <span>{t('Peignoir')}</span>
            </label>
          </div>
          <div>
            <label className="flex align-items-center gap-5">
              <Field type="checkbox" name="bathroomEquipments" value="8" />
              <span>{t('Baignoire spa')}</span>
            </label>
          </div>
        </div>
        <div className="form-group">
          <ErrorLabel error={currentStepErrors.bathroomEquipments} />
        </div>
      </div>
    </div>
  );
};

export default BathroomInfoForm;
