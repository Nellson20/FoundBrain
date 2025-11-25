import {
  ArrowReturnRight,
  Check2Circle,
  Question,
  QuestionCircle,
  X,
} from "react-bootstrap-icons";
import Accordion from "../../components/Accordion/Accordion";
import "./PortalFaq.scss";
import SliderNav from "../../components/SliderNav/SliderNav";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import StickySideBar from "../../components/StickySideBar/StickySideBar";

const PortalFaq = ({ t }) => {
  // Les données statiques questionsReponses restent car il n'y a pas d'entité FAQ dans le backend
  // TODO: Créer une entité FAQ dans le backend pour rendre ces données dynamiques
  const questionsReponses = [
    {
      question: "Pouvez-vous me parler de la culture d'entreprise ?",
      reponses: [
        "Notre entreprise valorise la collaboration, l'innovation et le respect. Nous encourageons un environnement de travail inclusif où chaque voix est entendue et respectée.",
      ],
      datePublication: "2024 fevrier 2023",
    },
    {
      question:
        "Quels sont les principaux objectifs de l'entreprise à court et à long terme ?",
      reponses: [
        "À court terme, notre objectif est de lancer un nouveau produit sur le marché. À long terme, nous visons à devenir un leader de l'industrie en innovant continuellement et en offrant une valeur exceptionnelle à nos clients.",
        "Nos principaux objectifs à court terme comprennent l'expansion de notre présence sur le marché et l'amélioration de notre rentabilité. À long terme, nous visons à devenir un employeur de choix et à avoir un impact positif sur notre communauté.",
      ],
      datePublication: "2024 fevrier 2022",
    },
    {
      question:
        "Comment l'entreprise soutient-elle le développement professionnel de ses employés ?",
      reponses: [
        "Nous offrons des programmes de formation et de développement, des opportunités d'avancement interne, ainsi que des programmes de mentorat pour aider nos employés à atteindre leur plein potentiel professionnel.",
        "Nous encourageons les employés à poursuivre des programmes de formation continue et offrons un soutien financier pour les certifications et les diplômes pertinents.",
      ],
      datePublication: "2024 fevrier 2021",
    },
    {
      question:
        "Quelles sont les opportunités d'avancement au sein de l'entreprise ?",
      reponses: [
        "Nous croyons en la promotion interne et offrons des opportunités d'avancement aux employés performants et engagés. Nous encourageons le développement professionnel et offrons des formations pour préparer nos employés à des rôles de leadership.",
      ],
      datePublication: "2024 fevrier 2020",
    },
    {
      question:
        "Comment l'entreprise favorise-t-elle la diversité et l'inclusion sur le lieu de travail ?",
      reponses: [
        "Nous valorisons la diversité et l'inclusion et nous nous engageons à créer un environnement de travail où chacun se sent respecté et valorisé. Nous avons des politiques et des programmes en place pour favoriser la diversité et l'inclusion à tous les niveaux de l'entreprise.",
      ],
      datePublication: "2024 fevrier 2019",
    },
    {
      question:
        "Quel est l'environnement de travail typique au sein de l'entreprise ?",
      reponses: [
        "Nous avons un environnement de travail collaboratif et dynamique où les idées sont encouragées et où les employés sont soutenus dans leurs efforts. Nous encourageons une culture de travail saine qui favorise l'équilibre entre vie professionnelle et vie personnelle.",
      ],
      datePublication: "2024 fevrier 2018",
    },
    {
      question:
        "Quels sont les défis auxquels l'entreprise est confrontée actuellement ?",
      reponses: [
        "Nous faisons face à des défis de marché compétitifs ainsi qu'à des changements technologiques rapides. Cependant, nous voyons ces défis comme des opportunités de croissance et d'innovation.",
      ],
      datePublication: "2024 fevrier 2017",
    },
    {
      question: "Pouvez-vous me décrire une journée type dans ce poste ?",
      reponses: [
        "Une journée type dans ce poste pourrait impliquer des réunions d'équipe, des tâches de travail sur des projets assignés, des interactions avec des clients ou des collègues, ainsi que des mises à jour de rapports ou de documentation selon les besoins.",
      ],
      datePublication: "2024 fevrier 2016",
    },
    {
      question: "Quelles sont les attentes de performance pour ce poste ?",
      reponses: [
        "Nous attendons des employés qu'ils démontrent un engagement envers l'excellence, qu'ils respectent les délais, qu'ils travaillent de manière collaborative et qu'ils contribuent positivement à l'équipe et aux objectifs de l'entreprise.",
      ],
      datePublication: "2024 fevrier 2015",
    },
    {
      question: "Comment l'entreprise évalue-t-elle la réussite dans ce rôle ?",
      reponses: [
        "La réussite dans ce rôle est évaluée en fonction des objectifs fixés, de la qualité du travail accompli, de la contribution à l'équipe et à l'entreprise, ainsi que de la capacité à s'adapter aux besoins changeants de l'entreprise.",
      ],
      datePublication: "2024 fevrier 2014",
    },
  ];
  const Formulaire = ({ titre, sousTitre, setOpen }) => {
    return (
      <form>
        <div className="head flex justify-content-between">
          <h3 className="titre">
            {titre}
          </h3>
          <div className="close" onClick={() => setOpen(false)}>
            <div className="close">
              <X size={25} />
            </div>
          </div>
        </div>
        <div className="body">
          <p>{sousTitre}</p>
          <textarea
            name="question"
            id="question"
            placeholder={t("Saisissez votre question ici...")}
          ></textarea>
        </div>
        <div className="foot flex justify-content-end">
          <button className="btn-" onClick={(e) => e.preventDefault()}>
            {t("Poser ma question")}
          </button>
        </div>
      </form>
    );
  };
  const ModalQuestion = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button className="btn-gradient" onClick={() => setOpen(true)}>
          {t("Poser une question")}
        </button>
        <Modal open={open} className="modal-question">
          <Formulaire
            titre={t("Posez votre question")}
            sousTitre={
              "Nous vous encourageons à poser des questions claires et spécifiques pour obtenir les meilleures réponses possibles. Veuillez remplir les champs ci-dessous avec autant de détails que possible."
            }
            setOpen={setOpen}
          />
        </Modal>
      </>
    );
  };
  const ModalReponse = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div className="btn-" onClick={() => setOpen(true)}><ArrowReturnRight />  {t("Repondre")}</div>
        <Modal open={open} className="modal-reponse">
          <Formulaire
            titre={t("Publier une reponse")}
            sousTitre={
              "Votre contribution est précieuse pour aider les autres et enrichir la communauté. Veuillez remplir les champs ci-dessous avec des réponses claires, utiles et pertinentes."
            }
            setOpen={setOpen}
          />
        </Modal>
      </>
    );
  };
  return (
    <div className="portal-faq ">
      
      <div className="bottom flex gap-5">

        <div className="questions-list">
        <div className="head elevated-card px-15 pb-15 mb-15">
        <div className="heading2  ">
          <h3>{t("Questions et Reponses")}</h3>
        </div>
        <div className="category-question">
          <p>{t("Voir les questions sur les categories suivants :")}</p>
          <ul className="list-category">
            <li className="active">{t("Tous")}</li>
            <li>{t("Salaire")}</li>
            <li>{t("Horaire de travail")}</li>
            <li>{t("Avantage")}</li>
            <li>{t("Processus de recrutement")}</li>
            <li>{t("Teletravail")}</li>
            <li>{t("Emplois")}</li>
            <li>{t("Temps partiel")}</li>
            <li>{t("Ambiance de travail")}</li>
            <li>{t("culture d'entreprise")}</li>
          </ul>
        </div>
      </div>
          {questionsReponses.map((item, i) => (
            <div className="item elevated-card mb-5" key={i}>
              <Accordion>
                <div className="question">
                  <h3>{item.question}</h3>
                  <small>{t("posée le")} {item.datePublication}</small>
                </div>
                <div className="reponse">
                  {item.reponses.map((res, index) => (
                    <p key={index} className="flex">
                      {res}
                    </p>
                  ))}
                </div>
              </Accordion>
              <div className="footer">
                <ModalReponse />
              </div>
            </div>
          ))}
        </div>
        <div className="left">
          <StickySideBar top={63}>
            <aside className="question-btn p-15">
              <h5>{t("Voulez vous poser une question concernant Donnell ?")}</h5>
              <ModalQuestion />
            </aside>
          </StickySideBar>
        </div>
      </div>
    </div>
  );
};

export default PortalFaq;