import React, { useState } from "react";
import CheckBox from "../../components/CheckBox/CheckBox";
import AmountInput from "../../components/AmountInput/AmountInput";
import { X } from "react-bootstrap-icons";

const ModalAdvantages = ({ handleCloseModal, action = "modify" }) => {
  const [state, setState] = useState({
    isParkingChecked: false,
    isTransportChecked: false,
    isBenefitMealChecked: false,
    showBenefitMealChoice: "",
    isBenefitServiceChecked: false,
    showBenefitServiceChoice: "",
    isAccessSpaChecked: false,
    isMassageChecked: false,
    showAccessSpaChoice: "",
    isCheckinTimeChecked: false,
    isLateArrivalChecked: false,
    isLateDepartureChecked: false,
  });

  const handleCheckChange = (name) => (e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));
  };

  const handleRadioChange = (name) => (e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.id,
    }));
  };

  return (
    <div className="modal-advantages modal-price-availability p-15">
      <div className="head flex align-items-center justify-content-between">
        <h3>Selectionnez des Avantages</h3>
        <span className="icon" onClick={() => handleCloseModal(false)}>
          <X size={30} />
        </span>
      </div>
      <div className="modal-price-availability-container">
        <div>
          <h4>Animaux domestiques</h4>
          <div className="choice">
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="1">Animaux domestiques admis</label>
            </div>
            <p>
              Pour accommoder tous les voyageurs, qu'ils voyagent seuls ou avec
              un animal d'assistance, au moins un de vos forfaits tarifaires
              doit exclure l'avantage "Animaux domestiques admis".
            </p>
            <span>Non cumulable avec d'autres Avantages.</span>
          </div>
        </div>
        <div>
          <h4>Parking et transport</h4>
          <div className="choice">
            <div className="parking">
              <div className="flex gap-5">
                <CheckBox
                  checked={state.isParkingChecked}
                  onChange={handleCheckChange("isParkingChecked")}
                  id="parkingCheck"
                  name="parking"
                  value="Parking"
                />
                <label htmlFor="1">Parking</label>
              </div>

              {state.isParkingChecked && (
                <div className="parking-choice radios mt-10 mb-10">
                  <div className="flex gap-5">
                    <input type="radio" name="parking" id="parkinSpot" />
                    <label htmlFor="parkinSpot">Place de stationnement</label>
                  </div>
                  <div className="flex gap-5">
                    <input type="radio" name="parking" id="valet" />
                    <label htmlFor="valet">Voiturier</label>
                  </div>
                </div>
              )}
            </div>
            <div className="transport">
              <div className="flex gap-5">
                <CheckBox
                  checked={state.isTransportChecked}
                  onChange={handleCheckChange("isTransportChecked")}
                  id="transportCheck"
                  name="transport"
                  value="Transport"
                />
                <label htmlFor="1">Transfert aéroport</label>
              </div>

              {state.isTransportChecked && (
                <div className="transport-choice radios mt-10">
                  <div className="flex gap-5">
                    <input type="radio" name="transport" id="roundTrip" />
                    <label htmlFor="roundTrip">Aller-retour</label>
                  </div>
                  <div className="flex gap-5">
                    <input type="radio" name="transport" id="oneWay" />
                    <label htmlFor="oneWay">Aller simple</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h4>Connexion Internet</h4>
          <div className="choice">
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="1">
                Connexion Internet haut débit par hébergement et par séjour
              </label>
            </div>
          </div>
        </div>
        <div>
          <h4>Nourriture et boissons</h4>
          <div className="choice">
            <div className="benefit">
              <div className="flex gap-5">
                <CheckBox
                  checked={state.isBenefitMealChecked}
                  onChange={handleCheckChange("isBenefitMealChecked")}
                  id="benefitMealCheck"
                  name="benefitMeal"
                  value="BenefitMeal"
                />
                <label htmlFor="1">
                  Crédit ou réduction pour la nourriture et les boissons
                </label>
              </div>
              {state.isBenefitMealChecked && (
                <div className="benefit-choice radios mt-10">
                  <>
                    <div className="flex gap-5">
                      <input
                        type="radio"
                        name="benefitMeal"
                        id="reduction"
                        onChange={handleRadioChange("showBenefitMealChoice")}
                      />
                      <label htmlFor="reduction">Réduction</label>
                    </div>
                    <div className="flex gap-5">
                      <input
                        type="radio"
                        name="benefitMeal"
                        id="credit"
                        onChange={handleRadioChange("showBenefitMealChoice")}
                      />
                      <label htmlFor="credit">Crédit</label>
                    </div>
                  </>
                  {state.showBenefitMealChoice === "credit" && (
                    <div className="credit-choice mt-5">
                      <div className="radios">
                        <div className="flex gap-5">
                          <input type="radio" name="period" id="day" />
                          <label htmlFor="day">Par jour</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="period" id="stay" />
                          <label htmlFor="stay">Par séjour</label>
                        </div>
                      </div>
                      <div className="radios mt-15">
                        <div className="flex gap-5">
                          <input type="radio" name="beneficiary" id="adult" />
                          <label htmlFor="adult">Par adulte</label>
                        </div>
                        <div className="flex gap-5">
                          <input
                            type="radio"
                            name="beneficiary"
                            id="byAccommodation"
                          />
                          <label htmlFor="byAccommodation">
                            Par hébergement
                          </label>
                        </div>
                        <div className="credit-amount">
                          <label htmlFor="creditAmount">
                            Montant du crédit
                          </label>
                          <div className="credit-input field flex gap-5">
                            <AmountInput />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="1">Cumulé par jour</label>
                        </div>
                      </div>
                    </div>
                  )}
                  {state.showBenefitMealChoice === "reduction" && (
                    <div className="reduction-amount">
                      <label htmlFor="reductionAmount">
                        Montant de la réduction
                      </label>
                      <div className="reduction-input field">
                        <input type="number" id="reductionAmount" />
                        <span className="sign">%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {state.isBenefitMealChecked && <hr />}
              <div className="flex gap-5 mt-10">
                <CheckBox />
                <label htmlFor="1">Bouteille de vin</label>
              </div>
              <div className="flex gap-5 mt-10">
                <CheckBox />
                <label htmlFor="1">Bouteille de champagne</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>Services proposés par la réception</h4>
          <div className="choice">
            <div className="flex gap-5">
              <CheckBox
                checked={state.isCheckinTimeChecked}
                onChange={handleCheckChange("isCheckinTimeChecked")}
                id="checkinTimeChecked"
                name="checkinTime"
                value="CheckinTime"
              />
              <label htmlFor="1">Enregistrement anticipé</label>
            </div>
            {state.isCheckinTimeChecked && (
              <div className="field mb-15">
                <label htmlFor="">Heure d'enregistrement la plus tôt</label>
                <select name="checkInTime" id="checkInTime">
                  <option value="">Sélectionner une heure</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                </select>
              </div>
            )}
            {/* ... */}
          </div>
        </div>
        <div>
          <h4>Services proposés dans l'établissement</h4>
          <div className="choice">
            <div className="benefit">
              <div className="flex gap-5">
                <CheckBox
                  checked={state.isBenefitServiceChecked}
                  onChange={handleCheckChange("isBenefitServiceChecked")}
                  id="benefitServiceCheck"
                  name="benefitService"
                  value="BenefitService"
                />
                <label htmlFor="1">
                  Crédit ou réduction pour les services proposés dans
                  l'établissement
                </label>
              </div>
              {state.isBenefitServiceChecked && (
                <div className="benefit-choice radios mt-10">
                  <div className="flex gap-5">
                    <input
                      type="radio"
                      name="benefitService"
                      id="reduction"
                      onChange={handleRadioChange("showBenefitServiceChoice")}
                    />
                    <label htmlFor="reduction">Réduction</label>
                  </div>
                  <div className="flex gap-5">
                    <input
                      type="radio"
                      name="benefitService"
                      id="credit"
                      onChange={handleRadioChange("showBenefitServiceChoice")}
                    />
                    <label htmlFor="credit">Crédit</label>
                  </div>
                  {state.showBenefitServiceChoice === "credit" && (
                    <div className="credit-choice mt-5">
                      <div className="radios">
                        <div className="flex gap-5">
                          <input type="radio" name="period" id="day" />
                          <label htmlFor="day">Par jour</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="period" id="stay" />
                          <label htmlFor="stay">Par séjour</label>
                        </div>
                      </div>
                      <div className="radios mt-15">
                        <div className="flex gap-5">
                          <input type="radio" name="beneficiary" id="adult" />
                          <label htmlFor="adult">Par adulte</label>
                        </div>
                        <div className="flex gap-5">
                          <input
                            type="radio"
                            name="beneficiary"
                            id="byAccommodation"
                          />
                          <label htmlFor="byAccommodation">
                            Par hébergement
                          </label>
                        </div>
                        <div className="credit-amount">
                          <label htmlFor="creditAmount">
                            Montant du crédit
                          </label>
                          <div className="credit-input field flex gap-5">
                            <AmountInput />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="1">Cumulé par jour</label>
                        </div>
                      </div>
                    </div>
                  )}
                  {state.showBenefitServiceChoice === "reduction" && (
                    <div className="reduction-amount">
                      <label htmlFor="reductionAmount">
                        Montant de la réduction
                      </label>
                      <div className="reduction-input field">
                        <input type="number" id="reductionAmount" />
                        <span className="sign">%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h4>Bien-être</h4>
          <div className="choice">
            <div className="flex gap-5">
              <CheckBox
                checked={state.isAccessSpaChecked}
                onChange={handleCheckChange("isAccessSpaChecked")}
                id="accessSpaChecked"
                name="accessSpa"
                value="AccessSpa"
              />
              <label htmlFor="">Accès au spa</label>
            </div>

            {state.isAccessSpaChecked && (
              <div className="access-spa-choice radios mb-10">
                <div className="flex gap-5">
                  <input
                    type="radio"
                    name="accessSpa"
                    id="unlimited"
                    onChange={handleRadioChange("showAccessSpaChoice")}
                  />
                  <label htmlFor="unlimited">
                    Accès illimité au spa, par adulte et par jour
                  </label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="radio"
                    name="accessSpa"
                    id="planning"
                    onChange={handleRadioChange("showAccessSpaChoice")}
                  />
                  <label htmlFor="planning">
                    Accès par heure au spa, par adulte et par jour
                  </label>
                </div>
                {state.showAccessSpaChoice === "planning" && (
                  <div>
                    <label htmlFor="">Accès par heure au spa</label>
                    <div className="flex align-items-center gap-10">
                      <div className="field">
                        <input type="number" />
                      </div>
                      <span> / adulte / jour</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-5">
              <CheckBox
                checked={state.isMassageChecked}
                onChange={handleCheckChange("isMassageChecked")}
                id="massageChecked"
                name="massage"
                value="Massage"
              />
              <label htmlFor="">Massage</label>
            </div>
            {state.isMassageChecked && (
              <div>
                <label htmlFor="">Durée du massage en minutes</label>
                <div className="flex align-items-center gap-10">
                  <div className="field">
                    <input type="number" />
                  </div>
                  <span> / adulte / séjour</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4>Activités</h4>
          <div className="choice">
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="simpleRoom">Safari en véhicule</label>
            </div>
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="simpleRoom">Safari à pied</label>
            </div>
            <div className="field">
              <label htmlFor="">Activité proposée</label>
              <input
                type="text"
                placeholder="ex: safari, activités nautiques, ..."
              />
            </div>
          </div>
        </div>
        <div className="name">
          <h4>Nom de l'Avantage</h4>
          <div className="input-container field">
            <label htmlFor="">Ajoutez un nom pour ces Avantages</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="buttons flex justify-content-end gap-10 mt-15">
        <button className="btn-orange" onClick={() => handleCloseModal(false)}>
          {action === "modify" ? "Annuler" : "fermer"}
        </button>
        <button className="btn-purple">
          {action === "modify" ? "Modifier" : "Terminer"}
        </button>
      </div>
    </div>
  );
};

export default ModalAdvantages;
