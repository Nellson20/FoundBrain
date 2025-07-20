import "./EquipmentsAndServices.scss";
import CheckBox from "../../components/CheckBox/CheckBox";
import Accordion from "../../components/Accordion/Accordion";
import {
  AddPictureCard,
  PictureCard,
} from "../../components/PictureCard/PictureCard";
import { useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";

const EquipmentsAndServices = () => {
  const [pool, setPool] = useState(null);
  const [restaurant, setRestarant] = useState(null);
  const [roomService, setRoomService] = useState(null);
  return (
    <div id="equipment-service">
      <h2 className="mt-15">Equipements et services</h2>
      <p>
        Assurez-vous de répertorier et de tenir à jour vos équipements dans
        cette section.{" "}
      </p>
      <div className="info-container elevated-card">
        <h3>Informations sur le bâtiment</h3>
        <div className="mt-15">
          <label htmlFor="">Nombre d'etage du bâtiment</label>
          <input type="number" />
        </div>
        <div className="mt-15">
          <label htmlFor="">Nombre total d'hébergements dans cet établissement</label>
          <input type="number" />
        </div>
      </div>
      <div className="container elevated-card">
        <h3>Les meilleurs équipements</h3>
        <div className="item">
          <div className="head">
            <h4>Piscine</h4>
            <div className="options">
              <ul>
                <li
                  className={pool === true ? "active" : ""}
                  onClick={() => setPool(true)}
                >
                  Oui
                </li>
                <li
                  className={pool === false ? "active" : ""}
                  onClick={() => setPool(false)}
                >
                  Non
                </li>
              </ul>
            </div>
          </div>
          {pool && (
            <>
              <div className="complement mt-15">
                <Accordion isOpen={true}>
                  <div className="complement-head">
                    <h3>Piscine 1</h3>
                  </div>
                  <div className="complement-body">
                    <div className="box">
                      <h4>Nom</h4>
                      <input type="text" defaultValue="Piscine 1"/>
                    </div>
                    <div className="box">
                      <h4>Type</h4>
                      <div className=" input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="type" id="inside" />
                          <label htmlFor="inside">Intérieur</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="type" id="outside" />
                          <label htmlFor="outside">Extérieur</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Payant</h4>
                      <div className="input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="paying" id="free" />
                          <label htmlFor="free">Gratuit</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="paying" id="paid" />
                          <label htmlFor="paid">Payant</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Restriction d'âge</h4>
                      <div className="input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="all" />
                          <label htmlFor="all">Pour tous les âges</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="kids" />
                          <label htmlFor="kids">Pour les enfants</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="adults" />
                          <label htmlFor="adults">Pour les adultes</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Caractéristiques de la piscine</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Sur le toit</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Espace peu profond</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">A débordement</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Chauffée</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Eau salée</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Vue imprenable</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Petite piscine</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Équipements</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Chaises Longues</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Toboggan aquatique</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Bar dans la piscine</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Couverture de piscine</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Serviettes</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Jouets</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Parasols</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Barrière de sécurité</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Horaires d'ouverture</h4>
                      <div className="input-container">
                        <div className="hour flex gap-15">
                          <div>
                            <label htmlFor="startHours">À partir de:</label>
                            <input
                              type="time"
                              name="startHours"
                              id="startHours"
                            />
                          </div>
                          <div>
                            <label htmlFor="endHours">À:</label>
                            <input type="time" name="endHours" id="endHours" />
                          </div>
                        </div>
                        <div className="week flex gap-20 mt-10">
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Lun.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mar.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mer.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Jeu.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Ven.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Sam.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Dim.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="photos box">
                      <h4>Photos</h4>
                      <div className="flex flex-wrap gap-15 mt-5">
                        <PictureCard path="/img/other/hotelbanner.jpg" />
                        <AddPictureCard />
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
              <button className="btn-orange mt-15">
                <PlusCircle size={20} /> Ajouter
              </button>
            </>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>Restaurant</h4>
            <div className="options">
              <ul>
                <li
                  className={restaurant === true ? "active" : ""}
                  onClick={() => setRestarant(true)}
                >
                  Oui
                </li>
                <li
                  className={restaurant === false ? "active" : ""}
                  onClick={() => setRestarant(false)}
                >
                  Non
                </li>
              </ul>
            </div>
          </div>
          {restaurant && (
            <>
              <div className="complement mt-15">
                <Accordion isOpen={true}>
                  <div className="complement-head">
                    <h3>Restaurant 1</h3>
                  </div>
                  <div className="complement-body">
                    <div className="box">
                      <h4>Nom</h4>
                      <input type="text" defaultValue="Restaurant 1"/>
                    </div>
                    <div className="box">
                      <h4>Type de menu</h4>
                      <div className=" input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="carte">A la carte</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="buffet">Buffet</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Caractéristiques du restaurant</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">
                            Réservé exclusivement aux clients séjournant dans
                            l'établissement
                          </label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Résérvation acceptée</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Table a l'extérieur</label>
                        </div>
                      </div>
                    </div>
                    <div className="box select">
                      <div>
                        <label htmlFor="">Cuisine</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">Régimes alimentaires</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">Ambiance</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">Ouvert pour</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Horaires d'ouverture</h4>
                      <div className="input-container">
                        <div className="hour flex gap-15">
                          <div>
                            <label htmlFor="startHours">À partir de:</label>
                            <input
                              type="time"
                              name="startHours"
                              id="startHours"
                            />
                          </div>
                          <div>
                            <label htmlFor="endHours">À:</label>
                            <input type="time" name="endHours" id="endHours" />
                          </div>
                        </div>
                        <div className="week flex gap-20 mt-10">
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Lun.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mar.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mer.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Jeu.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Ven.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Sam.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Dim.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="photos box">
                      <h4>Photos</h4>
                      <div className="flex flex-wrap gap-15 mt-5">
                        <PictureCard path="/img/other/restaurant.jpg" />
                        <AddPictureCard />
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
              <button className="btn-orange mt-15">
                <PlusCircle size={20} /> Ajouter
              </button>
            </>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>Service d'étage</h4>
            <div className="options">
              <ul>
                <li
                  className={roomService === true ? "active" : ""}
                  onClick={() => setRoomService(true)}
                >
                  Oui
                </li>
                <li
                  className={roomService === false ? "active" : ""}
                  onClick={() => setRoomService(false)}
                >
                  Non
                </li>
              </ul>
            </div>
          </div>
          {roomService && (
            <div className="complement mt-15">
              <div className="box">
                <h4>Payant</h4>
                <div className=" input-container flex">
                  <div className="flex gap-5">
                    <input type="radio" name="roomServicePaying" id="free" />
                    <label htmlFor="free">Gratuit</label>
                  </div>
                  <div className="flex gap-5">
                    <input type="radio" name="roomServicePaying" id="paid" />
                    <label htmlFor="paid">Payant</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>Bar</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Réception ouverte 24h/24</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Sauna</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Centre de remise en forme</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Jardin</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container elevated-card">
        <h3>Les meilleurs équipements</h3>
        <div className="item">
          <div className="head">
            <h4>Piscine</h4>
            <div className="options">
              <ul>
                <li
                  className={pool === true ? "active" : ""}
                  onClick={() => setPool(true)}
                >
                  Oui
                </li>
                <li
                  className={pool === false ? "active" : ""}
                  onClick={() => setPool(false)}
                >
                  Non
                </li>
              </ul>
            </div>
          </div>
          {pool && (
            <>
              <div className="complement mt-15">
                <Accordion isOpen={true}>
                  <div className="complement-head">
                    <h3>Piscine 1</h3>
                  </div>
                  <div className="complement-body">
                    <div className="box">
                      <h4>Nom</h4>
                      <input type="text" />
                    </div>
                    <div className="box">
                      <h4>Type</h4>
                      <div className=" input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="type" id="inside" />
                          <label htmlFor="inside">Intérieur</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="type" id="outside" />
                          <label htmlFor="outside">Extérieur</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Payant</h4>
                      <div className="input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="paying" id="free" />
                          <label htmlFor="free">Gratuit</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="paying" id="paid" />
                          <label htmlFor="paid">Payant</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Restriction d'âge</h4>
                      <div className="input-container flex">
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="all" />
                          <label htmlFor="all">Pour tous les âges</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="kids" />
                          <label htmlFor="kids">Pour les enfants</label>
                        </div>
                        <div className="flex gap-5">
                          <input type="radio" name="age" id="adults" />
                          <label htmlFor="adults">Pour les adultes</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Caractéristiques de la piscine</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Sur le toit</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Espace peu profond</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">A débordement</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Chauffée</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Eau salée</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Vue imprenable</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Petite piscine</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Équipements</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Chaises Longues</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Toboggan aquatique</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Bar dans la piscine</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Couverture de piscine</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Serviettes</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Jouets</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Parasols</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Barrière de sécurité</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Horaires d'ouverture</h4>
                      <div className="input-container">
                        <div className="hour flex gap-15">
                          <div>
                            <label htmlFor="startHours">À partir de:</label>
                            <input
                              type="time"
                              name="startHours"
                              id="startHours"
                            />
                          </div>
                          <div>
                            <label htmlFor="endHours">À:</label>
                            <input type="time" name="endHours" id="endHours" />
                          </div>
                        </div>
                        <div className="week flex gap-20 mt-10">
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Lun.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mar.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mer.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Jeu.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Ven.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Sam.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Dim.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="photos box">
                      <h4>Photos</h4>
                      <div className="flex flex-wrap gap-15 mt-5">
                        <PictureCard path="/img/other/hotelbanner.jpg" />
                        <AddPictureCard />
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
              <button className="btn-orange mt-15">
                <PlusCircle size={20} /> Ajouter
              </button>
            </>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>Restaurant</h4>
            <div className="options">
              <ul>
                <li
                  className={restaurant === true ? "active" : ""}
                  onClick={() => setRestarant(true)}
                >
                  Oui
                </li>
                <li
                  className={restaurant === false ? "active" : ""}
                  onClick={() => setRestarant(false)}
                >
                  Non
                </li>
              </ul>
            </div>
          </div>
          {restaurant && (
            <>
              <div className="complement mt-15">
                <Accordion isOpen={true}>
                  <div className="complement-head">
                    <h3>Restaurant 1</h3>
                  </div>
                  <div className="complement-body">
                    <div className="box">
                      <h4>Nom</h4>
                      <input type="text" />
                    </div>
                    <div className="box">
                      <h4>Type de menu</h4>
                      <div className=" input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="carte">A la carte</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="buffet">Buffet</label>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Caractéristiques du restaurant</h4>
                      <div className="input-container checkbox flex">
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">
                            Réservé exclusivement aux clients séjournant dans
                            l'établissement
                          </label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Résérvation acceptée</label>
                        </div>
                        <div className="flex gap-5">
                          <CheckBox />
                          <label htmlFor="">Table a l'extérieur</label>
                        </div>
                      </div>
                    </div>
                    <div className="box select">
                      <div>
                        <label htmlFor="">Cuisine</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">Régimes alimentaires</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">Ambiance</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="">Ouvert pour</label>
                        <select name="" id="">
                          <option value="">Choisir</option>
                        </select>
                      </div>
                    </div>
                    <div className="box">
                      <h4>Horaires d'ouverture</h4>
                      <div className="input-container">
                        <div className="hour flex gap-15">
                          <div>
                            <label htmlFor="startHours">À partir de:</label>
                            <input
                              type="time"
                              name="startHours"
                              id="startHours"
                            />
                          </div>
                          <div>
                            <label htmlFor="endHours">À:</label>
                            <input type="time" name="endHours" id="endHours" />
                          </div>
                        </div>
                        <div className="week flex gap-20 mt-10">
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Lun.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mar.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Mer.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Jeu.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Ven.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Sam.</span>
                          </div>
                          <div className="flex gap-5">
                            <CheckBox checked={true} />
                            <span>Dim.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="photos box">
                      <h4>Photos</h4>
                      <div className="flex flex-wrap gap-15 mt-5">
                        <PictureCard path="/img/other/restaurant.jpg" />
                        <AddPictureCard />
                      </div>
                    </div>
                  </div>
                </Accordion>
              </div>
              <button className="btn-orange mt-15">
                <PlusCircle size={20} /> Ajouter
              </button>
            </>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>Service d'étage</h4>
            <div className="options">
              <ul>
                <li
                  className={roomService === true ? "active" : ""}
                  onClick={() => setRoomService(true)}
                >
                  Oui
                </li>
                <li
                  className={roomService === false ? "active" : ""}
                  onClick={() => setRoomService(false)}
                >
                  Non
                </li>
              </ul>
            </div>
          </div>
          {roomService && (
            <div className="complement mt-15">
              <div className="box">
                <h4>Payant</h4>
                <div className=" input-container flex">
                  <div className="flex gap-5">
                    <input type="radio" name="roomServicePaying" id="free" />
                    <label htmlFor="free">Gratuit</label>
                  </div>
                  <div className="flex gap-5">
                    <input type="radio" name="roomServicePaying" id="paid" />
                    <label htmlFor="paid">Payant</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="item">
          <div className="head">
            <h4>Bar</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Réception ouverte 24h/24</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Sauna</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Centre de remise en forme</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="head">
            <h4>Jardin</h4>
            <div className="options">
              <ul>
                <li>Oui</li>
                <li>Non</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-purple mt-15">Enregistrer</div>
    </div>
  );
};

export default EquipmentsAndServices;
