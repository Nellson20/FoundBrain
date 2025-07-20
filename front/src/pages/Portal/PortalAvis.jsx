import {
  App,
  ArrowLeft,
  ArrowRight,
  CheckSquareFill,
  X,
} from "react-bootstrap-icons";
// import StarRating from "../../components/StarRating/StarRating";
import "./PortalAvis.scss";
import { useState } from "react";
import CheckBox from "../../components/CheckBox/CheckBox";
import DiamondRating from "../../components/DiamondRating/DiamondRating";

const PortalEvaluation = ({handleClose}) => {
  const choix1 = [
    "Détendue",
    "Palpitante",
    "Stressante",
    "Collaborative",
    "Compétitive",
    "Paisible",
    "Je ne sais pas",
  ];
  const choix2 = [
    'Appel téléphonique',
    'Test écrit',
    'Test/travail à faire à la maison',
    'Exercices de résolution de problèmes',
    'Entretien en groupe',
    'Entretien sur place',
    'Présentation',
    'Vérification des antécédents',
    'Test stupéfiant',
    'Aucun entretien',
    'Autre'
  ];
  return (
    <div className="portal-avis elevated-card p-15">
      <div className="questions">
        <div className="yesOrNo">
          <div className="head  mb-5">
            <div className="heading2 justify-content-between align-items-center">
              <h3>Perception</h3>
              <X size={25} className="close" onClick={()=>handleClose(false)}/>
            </div>
            <p>
              Chaque avis partagé est une pierre précieuse qui contribue à bâtir
              une meilleure compréhension de notre entreprise pour nos
              visiteurs.
            </p>
          </div>
          <div className="">
            <div className="question mt-20">
              <h4>Recommanderiez-vous a un ami de travailler chez Design?</h4>
              <div className="btn">
                <button>Oui</button>
                <button>Non</button>
              </div>
            </div>
            <div className="question">
              <h4>Recommanderiez-vous a un ami de travailler chez Design?</h4>
              <div className="btn">
                <button>Oui</button>
                <button>Non</button>
              </div>
            </div>
            <div className="question">
              <h4>Recommanderiez-vous a un ami de travailler chez Design?</h4>
              <div className="btn">
                <button>Oui</button>
                <button>Non</button>
              </div>
            </div>
          </div>
        </div>
        <div className="choix">
          <div className="description-culture category">
              <h3>Description de la culture d'entreprise</h3>
            <p>Choix multiple possible:</p>
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
              <h3>Quels types de tests avez-vous passés chez Design dans le cadre de votre entretien ?</h3>
            <p>Choix multiple possible:</p>
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
            <h3>Entreprise</h3>
          <div className="question">
            <div className="section">
              <h4>Note Globale</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>Équilibre vie professionnelle/personnelle</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>Salaire/Avantages</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>Sécurité de l'emploi/Évolution de carrière</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>Direction</h4>
              <DiamondRating className="" />
            </div>
            <div className="section">
              <h4>Culture d'entreprise</h4>
              <DiamondRating className="" />
            </div>
          </div>
        </div>
        <div className="category avis">
            <h3>Soumettre un avis</h3>
          <p>
            Nous vous invitons à partager votre avis sur votre expérience avec
            nous. Votre retour est précieux pour nous aider à améliorer nos
            services.
          </p>
          <div className="titre">
            <label htmlFor="titre">Titre de l'avis</label>
            <input
              id="titre"
              name="titre"
              type="text"
              placeholder="Exemple: Salaire satisfaisante"
            />
          </div>
          <div className="corps">
            <label htmlFor="corps">Votre avis</label>
            <div className="points-a-dire">
              <p>Donnez-nous votre avis sur:</p>
              <ul>
                <li>Environnement de travail</li>
                <li>Communication et collaboration</li>
                <li>Culture d'entreprise</li>
                <li>Développement professionnel</li>
                <li>Relations interpersonnelles</li>
                <li>Satisfaction globale</li>
              </ul>
            </div>
            <textarea name="corps" id="corps"></textarea>
          </div>
          <div className="points ">
            <div className="point-positif">
                <label htmlFor="point-positif">Points positifs</label>
                <input type="text" placeholder="Votre visions positif"/>
            </div>
            <div className="point-positif">
                <label htmlFor="point-positif">Points negatifs</label>
                <input type="text" placeholder="Votre visions negatif"/>
            </div>
          </div>
          <div className="valider ">
            <button className="btn-">Valider</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalEvaluation;
