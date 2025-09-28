import { useState } from "react";
import { useTranslation } from "react-i18next";
import CheckBox from "../../components/CheckBox/CheckBox";
import "./AccommodationsDetails.scss";

const AccommodationsDetails = () => {
  const { t } = useTranslation();

  const equipmentRoomList = ["ventilateur", "cheminée", "chauffage", "dressing"];
  const equipmentBathList = ["Peignoir", "Baignoire", "Toilettes", "Shampoing"];

  const [activeOptionsRoom, setActiveOptionsRoom] = useState(
    equipmentRoomList.reduce((acc, equipment) => {
      acc[equipment] = 2;
      return acc;
    }, {})
  );
  const [activeOptionsBath, setActiveOptionsBath] = useState(
    equipmentBathList.reduce((acc, equipment) => {
      acc[equipment] = 2;
      return acc;
    }, {})
  );

  const handleOptionRoomClick = (equipment, option) => {
    setActiveOptionsRoom((prevState) => ({
      ...prevState,
      [equipment]: option,
    }));
  };
  const handleOptionBathClick = (equipment, option) => {
    setActiveOptionsBath((prevState) => ({
      ...prevState,
      [equipment]: option,
    }));
  };

  return (
    <div id="accommodations-details">
      <h2 className="mt-15">{t("Détails des hébergements")}</h2>
      <p>{t("Merci de vérifier les informations à compléter.")}</p>

      <div className="size elevated-card p-15 mt-15">
        <h3>{t("Superficie de votre/vos hébergement(s)")}</h3>
        <div className="container flex flex-wrap gap-15  mt-15">
          <div className="item">
            <label htmlFor="doubleRoom">{t("Chambre Double")}</label>
            <div className="input-container">
              <input type="number" name="doubleRoom" id="doubleRoom" />
              <div className="unity">
                <span>m²</span>
              </div>
            </div>
          </div>
          <div className="item">
            <label htmlFor="simpleRoom">{t("Chambre Simple")}</label>
            <div className="input-container">
              <input type="number" name="simpleRoom" id="simpleRoom" />
              <div className="unity">
                <span>m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="equipment elevated-card mt-15">
        <h3>{t("Équipements en chambre")}</h3>
        <div className="container">
          {equipmentRoomList.map((equipment) => (
            <div key={equipment} className="item">
              <h4>{t(equipment)}</h4>
              <div className="options">
                <ul>
                  <li
                    onClick={() => handleOptionRoomClick(equipment, 0)}
                    className={activeOptionsRoom[equipment] === 0 ? "active" : ""}
                  >
                    {t("Tous les hébergements")}
                  </li>
                  <li
                    onClick={() => handleOptionRoomClick(equipment, 1)}
                    className={activeOptionsRoom[equipment] === 1 ? "active" : ""}
                  >
                    {t("Certains hébergements")}
                  </li>
                  <li
                    onClick={() => handleOptionRoomClick(equipment, 2)}
                    className={activeOptionsRoom[equipment] === 2 ? "active" : ""}
                  >
                    {t("Aucun(e)")}
                  </li>
                </ul>
                <div
                  className={`list-room ${
                    activeOptionsRoom[equipment] === 1 && "show"
                  }`}
                >
                  <div className="room">
                    <CheckBox />
                    <label htmlFor="">{t("Chambre Double")}</label>
                  </div>
                  <div className="room">
                    <CheckBox />
                    <label htmlFor="">{t("Chambre Simple")}</label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="equipment elevated-card mt-15">
        <h3>{t("Salle de bains")}</h3>
        <div className="container">
          {equipmentBathList.map((equipment) => (
            <div key={equipment} className="item">
              <h4>{t(equipment)}</h4>
              <div className="options">
                <ul>
                  <li
                    onClick={() => handleOptionBathClick(equipment, 0)}
                    className={activeOptionsBath[equipment] === 0 ? "active" : ""}
                  >
                    {t("Tous les hébergements")}
                  </li>
                  <li
                    onClick={() => handleOptionBathClick(equipment, 1)}
                    className={activeOptionsBath[equipment] === 1 ? "active" : ""}
                  >
                    {t("Certains hébergements")}
                  </li>
                  <li
                    onClick={() => handleOptionBathClick(equipment, 2)}
                    className={activeOptionsBath[equipment] === 2 ? "active" : ""}
                  >
                    {t("Aucun(e)")}
                  </li>
                </ul>
                <div
                  className={`list-room ${
                    activeOptionsBath[equipment] === 1 && "show"
                  }`}
                >
                  <div className="room">
                    <CheckBox />
                    <label htmlFor="">{t("Chambre Double")}</label>
                  </div>
                  <div className="room">
                    <CheckBox />
                    <label htmlFor="">{t("Chambre Simple")}</label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="btn-purple mt-15">{t("Enregistrer")}</div>
    </div>
  );
};

export default AccommodationsDetails;
