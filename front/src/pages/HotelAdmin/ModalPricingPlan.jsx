import "./ModalPricingPlan.scss";
import { useState } from "react";
import CheckBox from "../../components/CheckBox/CheckBox";
import AmountInput from "../../components/AmountInput/AmountInput";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ModalPricingPlan = ({ handleCloseModal, action = "modify" }) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    showMealChoice: "",
    showReservableInput: "",
    showMinimumStayInput: "",
    showSelectTariff: "",
    tariffDifference: "",
  });
  const handleRadioChange = (name) => (e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.id,
    }));
  };
  return (
    <div className="modal-pricing-plan modal-price-availability p-15">
      <div className="head flex align-items-center justify-content-between">
        <h3>{t("Élaborer votre plan tarifaire selon vos besoins")}</h3>
        <span className="icon" onClick={() => handleCloseModal(false)}>
          <X size={30} />
        </span>
      </div>
      <div className="modal-price-availability-container">
        <div>
          <h4>{t("Conditions d'annulation")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input type="radio" name="condition" id="day1" />
              <label htmlFor="day1">{t("Flexible - 1 jour")}</label>
            </div>
            <div className="flex gap-5">
              <input type="radio" name="condition" id="day2" />
              <label htmlFor="day2">{t("Flexible - 2 jours")}</label>
            </div>
          </div>
        </div>
        <div>
          <h4>{t("Repas")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input
                type="radio"
                name="meal"
                id="noMeal"
                onChange={handleRadioChange("showMealChoice")}
              />
              <label htmlFor="noMeal">{t("Non")}</label>
            </div>
            <div className="flex gap-5">
              <input
                type="radio"
                name="meal"
                id="withMeal"
                onChange={handleRadioChange("showMealChoice")}
              />
              <label htmlFor="withMeal">{t("Oui, ajouter un repas")}</label>
            </div>
            {state.showMealChoice === "withMeal" && (
              <div className="meal-choice">
                <div className="flex gap-5">
                  <CheckBox />
                  <label htmlFor="1">{t("Petit-déjeuner")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label htmlFor="">{t("Déjeuner")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label htmlFor="">{t("Dîner")}</label>
                </div>
                <div className="flex gap-5">
                  <CheckBox />
                  <label htmlFor="">{t("Tout compris")}</label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4>{t("Avantages")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input type="radio" name="avantage" id="no" />
              <label htmlFor="no">{t("Non")}</label>
            </div>
            <div className="flex gap-5">
              <input type="radio" name="avantage" id="other" />
              <label htmlFor="other">{t("avantage")}</label>
            </div>
            <Link to="/hotels/:hotelId/hotel-admin/avantages">{t("Gérer les Avantages")}</Link>
          </div>
        </div>
        <div>
          <h4>{t("Réservable")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input
                type="radio"
                name="reservable"
                id="allMoment"
                onChange={handleRadioChange("showReservableInput")}
              />
              <label htmlFor="allMoment">
                {t("À tout moment")}{" "}
                <small>{t("(ce plan tarifaire est toujours disponible)")}</small>
              </label>
            </div>
            <div className="flex gap-5">
              <input
                type="radio"
                name="reservable"
                id="fix"
                onChange={handleRadioChange("showReservableInput")}
              />
              <label htmlFor="fix">{t("Fixer le nombre de jours avant l'arrivée")}</label>
            </div>
            {state.showReservableInput === "fix" && (
              <div className="input-container">
                <input type="number" />
                <small>{t("jour(s) ou plus avant l'arrivée")}</small>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4>{t("Séjour minimum")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input
                type="radio"
                name="minimumStay"
                id="no"
                onChange={handleRadioChange("showMinimumStayInput")}
              />
              <label htmlFor="no">
                {t("Non")}{" "}
                <small>
                  {t(
                    "ce plan tarifaire est disponible pour n'importe quelle durée de séjour"
                  )}
                </small>
              </label>
            </div>
            <div className="flex gap-5">
              <input
                type="radio"
                name="minimumStay"
                id="yes"
                onChange={handleRadioChange("showMinimumStayInput")}
              />
              <label htmlFor="yes">{t("Oui")}</label>
            </div>
            {state.showMinimumStayInput === "yes" && (
              <div className="input-container">
                <input type="number" />
                <small>{t("nuits minimum")}</small>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4>{t("Tarif")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input
                type="radio"
                name="tariff"
                id="new"
                onChange={handleRadioChange("setShowSelectTariff")}
              />

              <label htmlFor="new">{t("Configurer un nouveau plan tarifaire")}</label>
            </div>
            <div className="flex gap-5">
              <input
                type="radio"
                name="tariff"
                id="existing"
                onChange={handleRadioChange("setShowSelectTariff")}
              />

              <label htmlFor="existing">{t("En fonction de l'un de mes plans tarifaires existants")}</label>
            </div>
            {state.showSelectTariff === "existing" && (
              <div className="input-container">
                <select name="tariff" id="tariff">
                  <option value="Standard Rate">{t("Standard Rate")}</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4>{t("Hébergements")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="doubleRoom">{t("Chambre Double")}</label>
            </div>
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="simpleRoom">{t("Chambre Simple")}</label>
            </div>
          </div>
        </div>
        <div>
          <h4>{t("Différence tarifaire")}</h4>
          <div className="choice">
            <div className="flex gap-5">
              <input
                type="radio"
                name="tariffDifference"
                id="cheaper"
                onChange={handleRadioChange("tariffDifference")}
              />
              <label htmlFor="cheaper">{t("Moins cher que le tarif Standard Rate")}</label>
            </div>
            <div className="flex gap-5">
              <input
                type="radio"
                name="tariffDifference"
                id="moreExpensive"
                onChange={handleRadioChange("tariffDifference")}
              />
              <label htmlFor="moreExpensive">{t("Plus cher que le tarif Standard Rate")}</label>
            </div>
            <div className="tariff-difference-input input-container">
              <div className="flex align-items-center gap-5">
                <span className="sign">{state.tariffDifference === "less" ? "-" : "+"}</span>
                <AmountInput />
              </div>
              <small>{t("par rapport au tarif Standard Rate")}</small>
            </div>
          </div>
        </div>
        <div className="name">
          <h4>{t("Nom du plan tarifaire")}</h4>
          <div className="input-container">
            <label htmlFor="name">{t("Ce nom vous sert juste de référence")}</label>
            <input type="text" defaultValue="Extra flexible" id="name" />
          </div>
        </div>
      </div>
      <div className="buttons flex justify-content-end gap-10 mt-15">
        <button className="btn-orange" onClick={() => handleCloseModal(false)}>
          {action === "modify" ? t("Annuler") : t("fermer")}
        </button>
        <button className="btn-purple">
          {action === "modify" ? t("Modifier") : t("Activer le plan tarifaire")}
        </button>
      </div>
    </div>
  );
};
export default ModalPricingPlan;
