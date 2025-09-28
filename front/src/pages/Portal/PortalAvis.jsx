import {
  App,
  ArrowLeft,
  ArrowRight,
  CheckSquareFill,
  X,
} from "react-bootstrap-icons";
import "./PortalAvis.scss";
import { useState } from "react";
import CheckBox from "../../components/CheckBox/CheckBox";
import DiamondRating from "../../components/DiamondRating/DiamondRating";
import { useTranslation } from "react-i18next";

const PortalEvaluation = ({ handleClose }) => {
  const { t } = useTranslation();

  const choix1 = [
    t("Détendue"),
    t("Palpitante"),
    t("Stressante"),
    t("Collaborative"),
    t("Compétitive"),
    t("Paisible"),
    t("Je ne sais pas"),
  ];
  const choix2 = [
    t('Appel téléphonique'),
    t('Test écrit'),
    t('Test/travail à faire à la maison'),
    t('Exercices de résolution de problèmes'),
    t('Entretien en groupe'),
    t('Entretien sur place'),
    t('Présentation'),
    t('Vérification des antécédents'),
    t('Test stupéfiant'),
    t('Aucun entretien'),
    t('Autre')
  ];
  return (
    <div className="portal-avis elevated-card p-15">
      <div className="questions">
        <div className="yesOrNo">
          <div className="head  mb-5">
            <div className="heading2 justify-content-between align-items-center">
              <h3>{t("Perception")}</h3>
              <X size={25} className="close" onClick={() => handleClose(false)} />
            </div>
            <p>
              {t("Chaque avis partagé est une pierre précieuse qui contribue à bâtir une meilleure compréhension de notre entreprise pour nos visiteurs.")}
            </p>
          </div>
          <div className="">
            <div className="question mt-20">
              <h4>{t("Recommanderiez-vous a un ami de travailler chez Design?")}</h4>
              <div className="btn">
                <button>{t("Oui")}</button>
                <button>{t("Non")}</button>
              </div>
            </div>
            <div className="question">
              <h4>{t("Recommanderiez-vous a un ami de travailler chez Design?")}</h4>
              <div className="btn">
                <button>{t("Oui")}</button>
                <button>{t("Non")}</button>
              </div>
            </div>
            <div className="question">
              <h4>{t("Recommanderiez-vous a un ami de travailler chez Design?")}</h4>
              <div className="btn">
                <button>{t("Oui")}</button>
                <button>{t("Non")}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="choix">
          <div className="description-culture category">
            <h3>{t("Description de la culture d'entreprise")}</h3>
            <p>{t("Choix multiple possible:")}</p>
            <div className="responses">
              {choix1.map((value, i) => (
                <div className="option" key={i}>
                  <CheckBox id={value} name={value} />
                  <label htmlFor={value}>{value}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="choix">
          <div className="description-culture category">
            <h3>{t("Quels types de tests avez-vous passés chez Design dans le cadre de votre entretien ?")}</h3>
            <p>{t("Choix multiple possible:")}</p>
            <div className="responses">
              {choix2.map((value, i) => (
                <div className="option" key={i}>
                  <CheckBox id={value} name={value} />
                  <label htmlFor={value}>{value}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="category">
          <h3>{t("Entreprise")}</h3>
          <div className="question">
            <div className="section">
              <h4>{t("Note Globale")}</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>{t("Équilibre vie professionnelle/personnelle")}</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>{t("Salaire/Avantages")}</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>{t("Sécurité de l'emploi/Évolution de carrière")}</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>{t("Direction")}</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>{t("Culture d'entreprise")}</h4>
              <DiamondRating className="" />
            </div>
          </div>
        </div>
        <div className="category avis">
          <h3>{t("Soumettre un avis")}</h3>
          <p>
            {t("Nous vous invitons à partager votre avis sur votre expérience avec nous. Votre retour est précieux pour nous aider à améliorer nos services.")}
          </p>
          <div className="titre">
            <label htmlFor="titre">{t("Titre de l'avis")}</label>
            <input
              id="titre"
              name="titre"
              type="text"
              placeholder={t("Exemple: Salaire satisfaisante")}
            />
          </div>
          <div className="corps">
            <label htmlFor="corps">{t("Votre avis")}</label>
            <div className="points-a-dire">
              <p>{t("Donnez-nous votre avis sur:")}</p>
              <ul>
                <li>{t("Environnement de travail")}</li>
                <li>{t("Communication et collaboration")}</li>
                <li>{t("Culture d'entreprise")}</li>
                <li>{t("Développement professionnel")}</li>
                <li>{t("Relations interpersonnelles")}</li>
                <li>{t("Satisfaction globale")}</li>
              </ul>
            </div>
            <textarea name="corps" id="corps"></textarea>
          </div>
          <div className="points ">
            <div className="point-positif">
              <label htmlFor="point-positif">{t("Points positifs")}</label>
              <input type="text" placeholder={t("Votre visions positif")} />
            </div>
            <div className="point-positif">
              <label htmlFor="point-positif">{t("Points negatifs")}</label>
              <input type="text" placeholder={t("Votre visions negatif")} />
            </div>
          </div>
          <div className="valider ">
            <button className="btn-">{t("Valider")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalEvaluation;
