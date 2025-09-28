import { Images, PlusCircle } from "react-bootstrap-icons";
import "./Accommodations.scss";
import TextViewMore from "../../components/TextViewMore/TextViewMore";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; 

const Accommodations = () => {
  const { t } = useTranslation();  

  return (
    <div id="accommodation">
      <div className="accommodation-head flex align-items-center">
        <h2>{t("Hébergements")}</h2>
        <Link to="/hotels/:hotelId/hebergements/nouveau/informations">
          <button className="btn-purple">{t("Crée un mouvel hébergement")}</button>
        </Link>
      </div>
      <div className="accommodation-list flex gap-20 ">
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_0.jpg" alt={t("room")} />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>{t("Chambre double")}</h4>
                <p>(123564684)</p>
              </div>
              <p>
                {t("Nombre maximum de personnes")}: <span>{t("7 personnes")}</span>
              </p>
              <p>
                {t("Nombre d'adultes maximum")}: <span>{t("7 adultes")}</span>
              </p>
              <p>
                {t("Nombre d'enfants maximum")}: <span>{t("6 enfants")}</span>
              </p>
              <p>
                {t("Nombre d'hébergement de ce type")}: <span>{t("10")}</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">{t("Modifier")}</div>
              <div className="btn-">{t("Supprimer")}</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        {/* Répéter le même pour les autres éléments */}
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_1.jpg" alt={t("room")} />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>{t("Chambre double")}</h4>
                <p>(123564684)</p>
              </div>
              <p>
                {t("Nombre maximum de personnes")}: <span>{t("7 personnes")}</span>
              </p>
              <p>
                {t("Nombre d'adultes maximum")}: <span>{t("7 adultes")}</span>
              </p>
              <p>
                {t("Nombre d'enfants maximum")}: <span>{t("6 enfants")}</span>
              </p>
              <p>
                {t("Nombre d'hébergement de ce type")}: <span>{t("10")}</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">{t("Modifier")}</div>
              <div className="btn-">{t("Supprimer")}</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_2.jpg" alt={t("room")} />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>{t("Chambre double")}</h4>
                <p>(123564684)</p>
              </div>
              <p>
                {t("Nombre maximum de personnes")}: <span>{t("7 personnes")}</span>
              </p>
              <p>
                {t("Nombre d'adultes maximum")}: <span>{t("7 adultes")}</span>
              </p>
              <p>
                {t("Nombre d'enfants maximum")}: <span>{t("6 enfants")}</span>
              </p>
              <p>
                {t("Nombre d'hébergement de ce type")}: <span>{t("10")}</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">{t("Modifier")}</div>
              <div className="btn-">{t("Supprimer")}</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_3.jpg" alt={t("room")} />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>{t("Chambre double")}</h4>
                <p>(123564684)</p>
              </div>
              <p>
                {t("Nombre maximum de personnes")}: <span>{t("7 personnes")}</span>
              </p>
              <p>
                {t("Nombre d'adultes maximum")}: <span>{t("7 adultes")}</span>
              </p>
              <p>
                {t("Nombre d'enfants maximum")}: <span>{t("6 enfants")}</span>
              </p>
              <p>
                {t("Nombre d'hébergement de ce type")}: <span>{t("10")}</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">{t("Modifier")}</div>
              <div className="btn-">{t("Supprimer")}</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodations;
