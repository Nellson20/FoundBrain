import "./EquipmentsAndServices.scss";
import CheckBox from "../../components/CheckBox/CheckBox";
import Accordion from "../../components/Accordion/Accordion";
import {
  AddPictureCard,
  PictureCard,
} from "../../components/PictureCard/PictureCard";
import { useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";
import { useTranslation } from 'react-i18next';

const EquipmentsAndServices = () => {
  const { t } = useTranslation();

  const [pool, setPool] = useState(null);
  const [restaurant, setRestarant] = useState(null);
  const [roomService, setRoomService] = useState(null);
  return (
    <div id="equipment-service">
      <h2 className="mt-15">{t("Equipements et services")}</h2>
      <p>
        {t("Assurez-vous de répertorier et de tenir à jour vos équipements dans cette section.")}{" "}
      </p>
      <div className="info-container elevated-card">
        <h3>{t("Informations sur le bâtiment")}</h3>
        <div className="mt-15">
          <label htmlFor="">{t("Nombre d'etage du bâtiment")}</label>
          <input type="number" />
        </div>
        <div className="mt-15">
          <label htmlFor="">{t("Nombre total d'hébergements dans cet établissement")}</label>
          <input type="number" />
        </div>
      </div>
      <div className="container elevated-card">
        <h3>{t("Les meilleurs équipements")}</h3>
        <div className="item">
          <div className="head">
            <h4>{t("Piscine")}</h4>
            <div className="options">
              <ul>
                <li
                  className={pool === true ? "active" : ""}
                  onClick={() => setPool(true)}
                >
                  {t("Oui")}
                </li>
                <li
                  className={pool === false ? "active" : ""}
                  onClick={() => setPool(false)}
                >
                  {t("Non")}
                </li>
              </ul>
            </div>
          </div>
          {pool && (
            <>
              <div className="complement mt-15">
                <Accordion isOpen={true}>
                  <div className="complement-head">
                    <h3>{t("Piscine 1")}</h3>
                  </div>
                  <div className="complement-body">
                    <div className="box">
                      <h4>{t("Nom")}</h4>
                      <input type="text" defaultValue="Piscine 1"/>
                    </div>
                    <div className="box">
                      <h4>{t("Type")}</h4>
                      <div className=" input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="type" id="inside" />
                          <label htmlFor="inside">{t("Intérieur")}</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="type" id="outside" />
                          <label htmlFor="outside">{t("Extérieur")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Payant")}</h4>
                      <div className="input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="paying" id="free" />
                          <label htmlFor="free">{t("Gratuit")}</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="paying" id="paid" />
                          <label htmlFor="paid">{t("Payant")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Restriction d'âge")}</h4>
                      <div className="input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="all" />
                          <label htmlFor="all">{t("Pour tous les âges")}</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="kids" />
                          <label htmlFor="kids">{t("Pour les enfants")}</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="adults" />
                          <label htmlFor="adults">{t("Pour les adultes")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Caractéristiques de la piscine")}</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Sur le toit")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Espace peu profond")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("A débordement")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Chauffée")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Eau salée")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Vue imprenable")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Petite piscine")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Équipements")}</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Chaises Longues")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Toboggan aquatique")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Bar dans la piscine")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Couverture de piscine")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Serviettes")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Jouets")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Parasols")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Barrière de sécurité")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Horaires d'ouverture")}</h4>
                      <div className="input-container">
                        <div className="hour flex gap-15">
                          <div>
                            <label htmlFor="startHours">{t("À partir de:")}</label>
                            <input
                              type="time"
                              name="startHours"
                              id="startHours"
                            />
                          </div>
                          <div>
                            <label htmlFor="endHours">{t("À:")}</label>
                            <input type="time" name="endHours" id="endHours" />
                          </div>
                        </div>
                        <div className="week flex gap-20 mt-10">
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
                    </div>
                    <div className="photos box">
                      <h4>{t("Photos")}</h4>
                      <div className="flex flex-wrap gap-15 mt-5">
                        <PictureCard path="/img/other/hotelbanner.jpg" />
                        <AddPictureCard />
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
              <button className="btn-orange mt-15">
                <PlusCircle size={20} /> {t("Ajouter")}
              </button>
            </>
          )}
        </div>

        <div className="item">
          <div className="head">
            <h4>{t("Restaurant")}</h4>
            <div className="options">
              <ul>
                <li
                  className={restaurant === true ? "active" : ""}
                  onClick={() => setRestarant(true)}
                >
                  {t("Oui")}
                </li>
                <li
                  className={restaurant === false ? "active" : ""}
                  onClick={() => setRestarant(false)}
                >
                  {t("Non")}
                </li>
              </ul>
            </div>
          </div>
          {restaurant && (
            <>
              <div className="complement mt-15">
                <Accordion isOpen={true}>
                  <div className="complement-head">
                    <h3>{t("Restaurant 1")}</h3>
                  </div>
                  <div className="complement-body">
                    <div className="box">
                      <h4>{t("Nom")}</h4>
                      <input type="text" defaultValue={t("Restaurant 1")} />
                    </div>
                    <div className="box">
                      <h4>{t("Type de menu")}</h4>
                      <div className=" input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="carte">{t("A la carte")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="buffet">{t("Buffet")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Caractéristiques du restaurant")}</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Réservé exclusivement aux clients séjournant dans l'établissement")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Résérvation acceptée")}</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">{t("Table a l'extérieur")}</label>
                        </div>
                      </div>
                    </div>
                    <div className="box select">
                      <div>
                        <label htmlFor="">{t("Cuisine")}</label>
                        <select name="" id="">
                          <option value="">{t("Choisir")}</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">{t("Régimes alimentaires")}</label>
                        <select name="" id="">
                          <option value="">{t("Choisir")}</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">{t("Ambiance")}</label>
                        <select name="" id="">
                          <option value="">{t("Choisir")}</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">{t("Ouvert pour")}</label>
                        <select name="" id="">
                          <option value="">{t("Choisir")}</option>
                        </select>
                      </div>
                    </div>
                    <div className="box">
                      <h4>{t("Horaires d'ouverture")}</h4>
                      <div className="input-container">
                        <div className="hour flex gap-15">
                          <div>
                            <label htmlFor="startHours">{t("À partir de:")}</label>
                            <input type="time" name="startHours" id="startHours" />
                          </div>
                          <div>
                            <label htmlFor="endHours">{t("À:")}</label>
                            <input type="time" name="endHours" id="endHours" />
                          </div>
                        </div>
                        <div className="week flex gap-20 mt-10">
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
                    </div>
                    <div className="photos box">
                      <h4>{t("Photos")}</h4>
                      <div className="flex flex-wrap gap-15 mt-5">
                        <PictureCard path="/img/other/restaurant.jpg" />
                        <AddPictureCard />
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
              <button className="btn-orange mt-15">
                <PlusCircle size={20} /> {t("Ajouter")}
              </button>
            </>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>{t("Service d'étage")}</h4>
            <div className="options">
              <ul>
                <li
                  className={roomService === true ? "active" : ""}
                  onClick={() => setRoomService(true)}
                >
                  {t("Oui")}
                </li>
                <li
                  className={roomService === false ? "active" : ""}
                  onClick={() => setRoomService(false)}
                >
                  {t("Non")}
                </li>
              </ul>
            </div>
          </div>
          {roomService && (
            <div className="complement mt-15">
              <div className="box">
                <h4>{t("Payant")}</h4>
                <div className=" input-container flex">
                  <div className="flex gap-5">
                    <input type="radio" name="roomServicePaying" id="free" />
                    <label htmlFor="free">{t("Gratuit")}</label>
                  </div>
                  <div className="flex gap-5">
                    <input type="radio" name="roomServicePaying" id="paid" />
                    <label htmlFor="paid">{t("Payant")}</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="item">
          <div className="head">
            <h4>{t("Bar")}</h4>
            <div className="options">
              <ul>
                <li>{t("Oui")}</li>
                <li>{t("Non")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="head">
            <h4>{t("Réception ouverte 24h/24")}</h4>
            <div className="options">
              <ul>
                <li>{t("Oui")}</li>
                <li>{t("Non")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="head">
            <h4>{t("Sauna")}</h4>
            <div className="options">
              <ul>
                <li>{t("Oui")}</li>
                <li>{t("Non")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="head">
            <h4>{t("Centre de remise en forme")}</h4>
            <div className="options">
              <ul>
                <li>{t("Oui")}</li>
                <li>{t("Non")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="head">
            <h4>{t("Jardin")}</h4>
            <div className="options">
              <ul>
                <li>{t("Oui")}</li>
                <li>{t("Non")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container elevated-card">
        <h3>{t("Les meilleurs équipements")}</h3>
        <div className="item">
          <div className="head">
            <h4>{t("Piscine")}</h4>
            <div className="options">
              <ul>
                <li
                  className={pool === true ? "active" : ""}
                  onClick={() => setPool(true)}
                >
                  {t("Oui")}
                </li>
                <li
                  className={pool === false ? "active" : ""}
                  onClick={() => setPool(false)}
                >
                  {t("Non")}
                </li>
              </ul>
            </div>
          </div>
          {pool && (
            <div className="complement mt-15">
              <Accordion isOpen={true}>
                <div className="complement-head">
                  <h3>{t("Piscine 1")}</h3>
                </div>
                <div className="complement-body">
                  <div className="box">
                    <h4>{t("Nom")}</h4>
                    <input type="text" />
                  </div>
                  <div className="box">
                    <h4>{t("Type")}</h4>
                    <div className=" input-container flex">
                      <div className="flex gap-5">
                        <input type="radio" name="type" id="inside" />
                        <label htmlFor="inside">{t("Intérieur")}</label>
                      </div>
                      <div className="flex gap-5">
                        <input type="radio" name="type" id="outside" />
                        <label htmlFor="outside">{t("Extérieur")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <h4>{t("Payant")}</h4>
                    <div className="input-container flex">
                      <div className="flex gap-5">
                        <input type="radio" name="paying" id="free" />
                        <label htmlFor="free">{t("Gratuit")}</label>
                      </div>
                      <div className="flex gap-5">
                        <input type="radio" name="paying" id="paid" />
                        <label htmlFor="paid">{t("Payant")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <h4>{t("Restriction d'âge")}</h4>
                    <div className="input-container flex">
                      <div className="flex gap-5">
                        <input type="radio" name="age" id="all" />
                        <label htmlFor="all">{t("Pour tous les âges")}</label>
                      </div>
                      <div className="flex gap-5">
                        <input type="radio" name="age" id="kids" />
                        <label htmlFor="kids">{t("Pour les enfants")}</label>
                      </div>
                      <div className="flex gap-5">
                        <input type="radio" name="age" id="adults" />
                        <label htmlFor="adults">{t("Pour les adultes")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <h4>{t("Caractéristiques de la piscine")}</h4>
                    <div className="input-container checkbox flex">
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Sur le toit")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Espace peu profond")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("A débordement")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Chauffée")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Eau salée")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Vue imprenable")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Petite piscine")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <h4>{t("Équipements")}</h4>
                    <div className="input-container checkbox flex">
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Chaises Longues")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Toboggan aquatique")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Bar dans la piscine")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Couverture de piscine")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Serviettes")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Jouets")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Parasols")}</label>
                      </div>
                      <div className="flex gap-5">
                        <CheckBox />
                        <label htmlFor="">{t("Barrière de sécurité")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <h4>{t("Horaires d'ouverture")}</h4>
                    <div className="input-container">
                      <div className="hour flex gap-15">
                        <div>
                          <label htmlFor="startHours">{t("À partir de:")}</label>
                          <input
                            type="time"
                            name="startHours"
                            id="startHours"
                          />
                        </div>
                        <div>
                          <label htmlFor="endHours">{t("À:")}</label>
                          <input type="time" name="endHours" id="endHours" />
                        </div>
                      </div>
                      <div className="week flex gap-20 mt-10">
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
                  </div>
                  <div className="photos box">
                    <h4>{t("Photos")}</h4>
                    <div className="flex flex-wrap gap-15 mt-5">
                      <PictureCard path="/img/other/hotelbanner.jpg" />
                      <AddPictureCard />
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
          )}
        </div>
      </div>

      <div className="btn-purple mt-15">{t("Enregistrer")}</div>
    </div>
  );
};

export default EquipmentsAndServices;