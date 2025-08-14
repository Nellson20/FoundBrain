import { useEffect, useState } from "react";
import "./AccommodationControls.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import CheckBox from "../../components/CheckBox/CheckBox";
import { useTranslation } from 'react-i18next'; 

const AccommodationControls = () => {
  const { t } = useTranslation();  

  const [isSrPricingPlanSelected, setIsSrPricingPlanSelected] =
    useState("false");
  const [isDrPricingPlanSelected, setIsDrPricingPlanSelected] =
    useState("false");

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleDrPricingPlanChange = (event) => {
    setIsDrPricingPlanSelected(event.target.value);
  };
  const handleSrPricingPlanChange = (event) => {
    setIsSrPricingPlanSelected(event.target.value);
  };
  useEffect(() => {
    console.log(isDrPricingPlanSelected, "test checked");
  }, [isDrPricingPlanSelected]);
  return (
    <div className="accommodation-controls mt-15">
      <h2 className="mt-15">{t("Ouvrir/fermer des hébergements")}</h2>
      <div className="date elevated-card p-15 mt-15">
        <h3>
          {t("Indiquez les dates auxquelles vous souhaitez apporter des modifications.")}
        </h3>
        <DateRangePicker
          className="mt-15"
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          rangeColors={["#702f80"]}
          direction="horizontal"
          initialRange={{
            startDate: new Date(),
            endDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
            ),
          }}
        />
        <div className="week flex gap-20">
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Lun.")}</span>
          </div>
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Mar.")}</span>
          </div>
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Mer.")}</span>
          </div>
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Jeu.")}</span>
          </div>
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Ven.")}</span>
          </div>
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Sam.")}</span>
          </div>
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <span>{t("Dim.")}</span>
          </div>
        </div>
      </div>
      <div className="accommodation-type elevated-card mt-15 p-15">
        <h3>
          {t("Indiquez les types d'hébergements que vous souhaitez ouvrir ou fermer pour votre établissement.")}
        </h3>
        <div className="accommodation-type-item mt-15">
          <h4>{t("Double Room")}</h4>
          <div className="flex">
            <div>
              <input
                type="radio"
                name="doubleRoom"
                id="drEntireAccommodation"
                value={t("L'hébergement entier")}
                onChange={handleDrPricingPlanChange}
              />
              <label htmlFor="drEntireAccommodation">
                {t("L'hébergement entier")}
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="doubleRoom"
                id="drPricingPlan"
                value={t("Des plans tarifaires spécifiques")}
                onChange={handleDrPricingPlanChange}
              />
              <label htmlFor="drPricingPlan">
                {t("Des plans tarifaires spécifiques")}
              </label>
            </div>
          </div>
          {isDrPricingPlanSelected === t("Des plans tarifaires spécifiques") && (
            <div className="pricing-plan">
              <span>
                {t("Veuillez indiquer les plans tarifaires auxquels vous souhaitez appliquer les modifications.")}
              </span>
              <div className="flex gap-20 mt-10">
                <div className="flex gap-5">
                  <CheckBox />
                  <label>{t("Standard Rate")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label>{t("Non-refundable Rate")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label>{t("Weekly Rate")}</label>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="accommodation-type-item">
          <h4>{t("Single Room")}</h4>
          <div className="flex">
            <div>
              <input
                type="radio"
                name="singleRoom"
                id="srEntireAccommodation"
                value={t("L'hébergement entier")}
                onChange={handleSrPricingPlanChange}
              />
              <label htmlFor="srEntireAccommodation">
                {t("L'hébergement entier")}
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="singleRoom"
                id="srPricingPlan"
                value={t("Des plans tarifaires spécifiques")}
                onChange={handleSrPricingPlanChange}
              />
              <label htmlFor="srPricingPlan">
                {t("Des plans tarifaires spécifiques")}
              </label>
            </div>
          </div>
          {isSrPricingPlanSelected === t("Des plans tarifaires spécifiques") && (
            <div className="pricing-plan">
              <span>
                {t("Veuillez indiquer les plans tarifaires auxquels vous souhaitez appliquer les modifications.")}
              </span>
              <div className="flex gap-20 mt-10">
                <div className="flex gap-5">
                  <CheckBox />
                  <label>{t("Standard Rate")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label>{t("Non-refundable Rate")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label>{t("Weekly Rate")}</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="status elevated-card mt-15 p-15">
        <h3>{t("Deffinir le statut de votre hébergement")}</h3>
        <div className="flex">
          <div>
            <input type="radio" name="status" id="status" value={t("Ouvert")} />
            <label htmlFor="status">{t("Ouvert")}</label>
          </div>
          <div>
            <input type="radio" name="status" id="status" value={t("Fermé")} />
            <label htmlFor="status">{t("Fermé")}</label>
          </div>
        </div>
      </div>
      <button className="btn-purple mt-15">{t("Enregistrer")}</button>
    </div>
  );
};

export default AccommodationControls;
