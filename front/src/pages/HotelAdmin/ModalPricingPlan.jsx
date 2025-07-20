import "./ModalPricingPlan.scss";
import { useState } from "react";
import CheckBox from "../../components/CheckBox/CheckBox";
import AmountInput from "../../components/AmountInput/AmountInput";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const ModalPricingPlan = ({ handleCloseModal, action="modify" }) => {
    const [state, setState] = useState({
        showMealChoice:"",
        showReservableInput:"",
        showMinimumStayInput:"",
        showSelectTariff:"",
        tariffDifference:""
    })
    const handleRadioChange = (name) => (e) => {
        setState((prevState) => ({
          ...prevState,
          [name]: e.target.id,
        }));
      };
    return (
      <div className="modal-pricing-plan modal-price-availability p-15">
          <div className="head flex align-items-center justify-content-between">
        <h3>Élaborer votre plan tarifaire selon vos besoins</h3>
          <span className="icon" onClick={() => handleCloseModal(false)}><X size={30}/></span>
          </div>
        <div className="modal-price-availability-container">
          <div>
            <h4>Conditions d'annulation</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input type="radio" name="condition" id="day1" />
                <label htmlFor="day1">Flexible - 1 jour</label>
              </div>
              <div className="flex gap-5">
                <input type="radio" name="condition" id="day2" />
                <label htmlFor="day2">Flexible - 2 jours</label>
              </div>
            </div>
          </div>
          <div>
            <h4>Repas</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input
                  type="radio"
                  name="meal"
                  id="noMeal"
                  onChange={handleRadioChange("showMealChoice")}
                />
                <label htmlFor="noMeal">Non</label>
              </div>
              <div className="flex gap-5">
                <input
                  type="radio"
                  name="meal"
                  id="withMeal"
                  onChange={handleRadioChange("showMealChoice")}
                />
                <label htmlFor="withMeal">Oui, ajouter un repas</label>
              </div>
              {state.showMealChoice=== "withMeal" && (
                <div className="meal-choice">
                  <div className="flex gap-5">
                    <CheckBox />
                    <label htmlFor="1">Petit-déjeuner</label>
                  </div>
                  <div className="flex gap-5">
                    <CheckBox />
                    <label htmlFor="">Déjeuner</label>
                  </div>
                  <div className="flex gap-5">
                    <CheckBox />
                    <label htmlFor="">Dîner</label>
                  </div>
                  <div className="flex gap-5">
                    <CheckBox />
                    <label htmlFor="">Tout compris</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h4>Avantages</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input type="radio" name="avantage" id="no" />
                <label htmlFor="no">Non</label>
              </div>
              <div className="flex gap-5">
                <input type="radio" name="avantage" id="other" />
                <label htmlFor="other">avantage</label>
              </div>
              <Link to="/hotels/:hotelId/hotel-admin/avantages">Gérer les Avantages</Link>
            </div>
          </div>
          <div>
            <h4>Réservable</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input
                  type="radio"
                  name="reservable"
                  id="allMoment"
                  onChange={handleRadioChange("showReservableInput")}
                />
                <label htmlFor="allMoment">
                  À tout moment{" "}
                  <small>(ce plan tarifaire est toujours disponible)</small>
                </label>
              </div>
              <div className="flex gap-5">
                <input
                  type="radio"
                  name="reservable"
                  id="fix"
                  onChange={handleRadioChange("showReservableInput")}
                />
                <label htmlFor="fix">
                  Fixer le nombre de jours avant l'arrivée
                </label>
              </div>
              {state.showReservableInput === "fix"&& (
                <div className="input-container">
                  <input type="number" />
                  <small>jour(s) ou plus avant l'arrivée</small>
                </div>
              )}
            </div>
          </div>
          <div>
            <h4>Séjour minimum</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input type="radio" name="minimumStay" id="no" 
                onChange={handleRadioChange("showMinimumStayInput")}
                />
                <label htmlFor="no">
                  Non{" "}
                  <small>
                    (ce plan tarifaire est disponible pour n'importe quelle durée
                    de séjour)
                  </small>
                </label>
              </div>
              <div className="flex gap-5">
                <input type="radio" name="minimumStay" id="yes" 
                onChange={handleRadioChange("showMinimumStayInput")}
                />
                <label htmlFor="yes">Oui</label>
              </div>
              {state.showMinimumStayInput==="yes" &&
              <div className="input-container">
                <input type="number" />
                <small>nuits minimum</small>
              </div>
  }
            </div>
          </div>
          <div>
            <h4>Tarif</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input type="radio" name="tariff" id="new" 
                onChange={handleRadioChange("setShowSelectTariff")}/>
  
                <label htmlFor="new">Configurer un nouveau plan tarifaire</label>
              </div>
              <div className="flex gap-5">
                <input type="radio" name="tariff" id="existing" 
                onChange={handleRadioChange("setShowSelectTariff")}/>
  
                <label htmlFor="existing">
                  En fonction de l'un de mes plans tarifaires existants
                </label>
              </div>
              {state.showSelectTariff==="existing" &&
              <div className="input-container">
                <select name="tariff" id="tariff">
                  <option value="Standard Rate">Standard Rate</option>
                </select>
              </div>
  }
            </div>
          </div>
          <div>
            <h4>Hébergements</h4>
            <div className="choice">
              <div className="flex gap-5">
                <CheckBox />
                <label htmlFor="doubleRoom">Chambre Double</label>
              </div>
              <div className="flex gap-5">
                <CheckBox />
                <label htmlFor="simpleRoom">Chambre Simple</label>
              </div>
            </div>
          </div>
          <div>
            <h4>Différence tarifaire</h4>
            <div className="choice">
              <div className="flex gap-5">
                <input type="radio" name="tariffDifference" id="cheaper" 
                onChange={handleRadioChange("tariffDifference")}/>
                <label htmlFor="cheaper">
                  Moins cher que le tarif Standard Rate
                </label>
              </div>
              <div className="flex gap-5">
                <input type="radio" name="tariffDifference" id="moreExpensive" 
                onChange={handleRadioChange("tariffDifference")}/>
                <label htmlFor="moreExpensive">
                  Plus cher que le tarif Standard Rate
                </label>
              </div>
              <div className="tariff-difference-input input-container">
                <div className="flex align-items-center gap-5">
                  <span className="sign">{ state.tariffDifference === 'less' ? '-' : '+'}</span>
                  <AmountInput />
                </div>
                <small>par rapport au tarif Standard Rate</small>
              </div>
            </div>
          </div>
          <div className="name">
            <h4>Nom du plan tarifaire</h4>
            <div className="input-container">
              <label htmlFor="name">Ce nom vous sert juste de référence</label>
              <input type="text" defaultValue="Extra flexible" id="name"/>
            </div>
          </div>
        </div>
        <div className="buttons flex justify-content-end gap-10 mt-15">
          <button className="btn-orange" onClick={() => handleCloseModal(false)}>
            {action === 'modify' ? 'Annuler' : 'fermer' }
          </button>
          <button className="btn-purple">
          {action === 'modify' ? 'Modifier' : 'Activer le plan tarifaire' }</button>
        </div>
      </div>
    );
  };
  export default ModalPricingPlan