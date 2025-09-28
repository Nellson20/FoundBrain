import { useState } from "react";
import "./PortalEvaluation.scss";
import { ArrowDownShort, ArrowUpShort, Gem } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import Avatar from "../../components/Avatar/Avatar";
import Modal from "../../components/Modal/Modal";
import PortalAvis from './PortalAvis'
import StickySideBar from '../../components/StickySideBar/StickySideBar'

const PortalEvaluation = ({ t }) => {
  const [isCroissant, setIsCroissant] = useState(true);
  const [isActive, setIsActive] = useState(t("Date"));
  const [open, setOpen] = useState(false)

  const handleClick = (value) => {
    setIsActive(value);
    setIsCroissant((val) => !val);
  };
  return (
    <div className="portal-evaluation">
      <div className="head elevated-card px-15 mt-15 pb-15">
        <div className="heading2 justify-content-between">
          <h3>{t("Avis des Employés")}</h3>
          <button className="btn-evaluer-nous" onClick={() => setOpen(true)}>{t("Evaluer Nous")}</button>
          <Modal open={open} className='modal-evaluation'>
            <PortalAvis handleClose={setOpen} />
          </Modal>
        </div>
        <div className="triage">
          <div className="selection flex">
            <div className="poste">
              <label htmlFor="poste">{t("Poste")}</label>
              <select name="poste" id="poste">
                <option value="Tous">{t("Tous")}</option>
              </select>
            </div>
            <div className="lieu">
              <label htmlFor="lieu">{t("Lieu")}</label>
              <select name="lieu" id="lieu">
                <option value="tana">Tana</option>
              </select>
            </div>
            <div className="langue">
              <label htmlFor="langue">{t("Langue")}</label>
              <select name="langue" id="langue">
                <option value="toutes">{t("Toutes")}</option>
              </select>
            </div>
          </div>
          <div className="bottom">
            <div className="trie">
              <h3>{t("Trier par")}</h3>
              <div className="option">
                {[t("Pertinence"), t("Note"), t("Date")].map((value, i) => (
                  <div
                    className={`item ${isActive === value ? "active" : ""}`}
                    key={i}
                    onClick={() => handleClick(value)}
                  >
                    <span>{value}</span>
                    <span className="arrow">
                      {isCroissant ? (
                        <ArrowUpShort size={25} />
                      ) : (
                        <ArrowDownShort size={25} />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="titre">
        <span>3200</span> {t("avis correspondant à votre recherche")}{" "}
        <Link>{t("Voir touts")}</Link>
      </p>
      <div className="avis mt-15 flex">
        <div className="list-avis ">
          <div className="avi-item elevated-card px-15 mb-5">
            <div className="left">
              <div className="profil">
                <Avatar width={40} height={40} />
                <div className="text">
                  <span class="name">Harena</span>
                  <span class="date">18/02/2024</span>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="top">
                <Rating
                  readonly
                  initialRating={3.5}
                  className="portal-evaluation-note"
                  fractions={2}
                  emptySymbol={
                    <img
                      src="/img/icons/diamond_grey.png"
                      className="icon rating-diamond-img"
                    />
                  }
                  fullSymbol={
                    <img
                      src="/img/icons/diamond.png"
                      className="icon rating-diamond-img"
                    />
                  }
                />
                <span className="note">3,5</span>
              </div>
              <h3>{t("Bon équilibre vie pro/perso")}</h3>
              <p className="text">
                Un bon équilibre vie professionnelle et personnelle grâce au
                semaine sur 6 jours ce qui est compensé par des petites
                journées. Cependant très peu de perspective d'évolution.
              </p>
              <div className="bottom">
                <div className="question">
                  <p>{t("Avez-vous trouvé cet avis utile ?")}</p>
                  <div className="btn">
                    <button>{t("Oui")}</button>
                    <button>{t("Non")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="avi-item avi-item elevated-card px-15 mb-5">
            <div className="left">
              <div className="profil">
                <Avatar width={40} height={40} />
                <div className="text">
                  <span class="name">Harena</span>
                  <span class="date">18/02/2024</span>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="top">
                <Rating
                  readonly
                  initialRating={3.5}
                  className="portal-evaluation-note"
                  fractions={2}
                  emptySymbol={
                    <img
                      src="/img/icons/diamond_grey.png"
                      className="icon rating-diamond-img"
                    />
                  }
                  fullSymbol={
                    <img
                      src="/img/icons/diamond.png"
                      className="icon rating-diamond-img"
                    />
                  }
                />
                <span className="note">3,5</span>
              </div>
              <h3>{t("Un travail pour enrichir son expérience CV")}</h3>
              <p className="text">
                Des engagements non tenus lors de mon entretien. L'ambiance avec
                les responsables ou la responsable de département est difficile
                et celle avec les collègues dépend du secteur où l'on travaille.
                Pas toujours facile d'être disponible lorsque les horaires
                changent ou que le nombre d'absents au département est
                important. La ville ne permet pas toujours de se loger . Les
                loyers sont chers par rapport à notre salaire et pas toujours
                très agréables à vivre. Les amplitudes selon les semaines que
                l'on demande de faire (Tôt le matin ou de fermeture le soir) ne
                sont pas faciles et ne permettent pas toujours de concilier vie
                personnelle et vie professionnelle lorsqu'il y a des
                changements. J'ai pris ce travail pour enrichir mon expérience
                mais je ne ferai pas carrière dans la grande distribution. Trop
                de contraintes par rapport à la considération, la vie
                personnelle et au salaire
              </p>
              <div className="bottom">
                <div className="question">
                  <p>{t("Avez-vous trouvé cet avis utile ?")}</p>
                  <div className="btn">
                    <button>{t("Oui")}</button>
                    <button>{t("Non")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="avi-item avi-item elevated-card px-15 mb-5">
            <div className="left">
              <div className="profil">
                <Avatar width={40} height={40} />
                <div className="text">
                  <span class="name">Harena</span>
                  <span class="date">18/02/2024</span>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="top">
                <Rating
                  readonly
                  initialRating={3.5}
                  className="portal-evaluation-note"
                  fractions={2}
                  emptySymbol={
                    <img
                      src="/img/icons/diamond_grey.png"
                      className="icon rating-diamond-img"
                    />
                  }
                  fullSymbol={
                    <img
                      src="/img/icons/diamond.png"
                      className="icon rating-diamond-img"
                    />
                  }
                />
                <span className="note">3,5</span>
              </div>
              <h3>{t("Bon équilibre vie pro/perso")}</h3>
              <p className="text">
                Un bon équilibre vie professionnelle et personnelle grâce au
                semaine sur 6 jours ce qui est compensé par des petites
                journées. Cependant très peu de perspective d'évolution.
              </p>
              <div className="bottom">
                <div className="question">
                  <p>{t("Avez-vous trouvé cet avis utile ?")}</p>
                  <div className="btn">
                    <button>{t("Oui")}</button>
                    <button>{t("Non")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="avi-item avi-item elevated-card px-15 mb-5">
            <div className="left">
              <div className="profil">
                <Avatar width={40} height={40} />
                <div className="text">
                  <span class="name">Harena</span>
                  <span class="date">18/02/2024</span>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="top">
                <Rating
                  readonly
                  initialRating={3.5}
                  className="portal-evaluation-note"
                  fractions={2}
                  emptySymbol={
                    <img
                      src="/img/icons/diamond_grey.png"
                      className="icon rating-diamond-img"
                    />
                  }
                  fullSymbol={
                    <img
                      src="/img/icons/diamond.png"
                      className="icon rating-diamond-img"
                    />
                  }
                />
                <span className="note">3,5</span>
              </div>
              <h3>{t("Bon équilibre vie pro/perso")}</h3>
              <p className="text">
                Un bon équilibre vie professionnelle et personnelle grâce au
                semaine sur 6 jours ce qui est compensé par des petites
                journées. Cependant très peu de perspective d'évolution.
              </p>
              <div className="bottom">
                <div className="question">
                  <p>{t("Avez-vous trouvé cet avis utile ?")}</p>
                  <div className="btn">
                    <button>{t("Oui")}</button>
                    <button>{t("Non")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="avi-item avi-item elevated-card px-15 mb-5">
            <div className="left">
              <div className="profil">
                <Avatar width={40} height={40} />
                <div className="text">
                  <span class="name">Harena</span>
                  <span class="date">18/02/2024</span>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="top">
                <Rating
                  readonly
                  initialRating={3.5}
                  className="portal-evaluation-note"
                  fractions={2}
                  emptySymbol={
                    <img
                      src="/img/icons/diamond_grey.png"
                      className="icon rating-diamond-img"
                    />
                  }
                  fullSymbol={
                    <img
                      src="/img/icons/diamond.png"
                      className="icon rating-diamond-img"
                    />
                  }
                />
                <span className="note">3,5</span>
              </div>
              <h3>{t("Bon équilibre vie pro/perso")}</h3>
              <p className="text">
                Un bon équilibre vie professionnelle et personnelle grâce au
                semaine sur 6 jours ce qui est compensé par des petites
                journées. Cependant très peu de perspective d'évolution.
              </p>
              <div className="bottom">
                <div className="question">
                  <p>{t("Avez-vous trouvé cet avis utile ?")}</p>
                  <div className="btn">
                    <button>{t("Oui")}</button>
                    <button>{t("Non")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <StickySideBar bottom={5}>
            <div className="note-global container elevated-card">
              <h3>{t("Note globale")}</h3>
              <div className="content">
                <div className="rating">
                  <div className="progress-bar">
                    <span>4.5</span>
                  </div>
                  <Rating
                    readonly
                    initialRating={3.5}
                    className="portal-evaluation-note"
                    fractions={2}
                    emptySymbol={
                      <img
                        src="/img/icons/diamond_grey.png"
                        className="icon rating-diamond-img"
                      />
                    }
                    fullSymbol={
                      <img
                        src="/img/icons/diamond.png"
                        className="icon rating-diamond-img"
                      />
                    }
                  />
                </div>
                <div className="rating-breakdown">
                  <p>{t("D'après 3200 avis")}</p>
                  <div className="item">
                    <span className="numero">5</span>
                    <img src="/img/icons/diamond.png" alt="" />{" "}
                    <div className="bar-container">
                      <div
                        className="bar-progress"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <span class="compte">3,5k</span>
                  </div>
                  <div className="item">
                    <span className="numero">4 </span>
                    <img src="/img/icons/diamond.png" alt="" />
                    <div className="bar-container">
                      <div
                        className="bar-progress"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                    <span class="compte">2,5k</span>
                  </div>
                  <div className="item">
                    <span className="numero">3 </span>
                    <img src="/img/icons/diamond.png" alt="" />
                    <div className="bar-container">
                      <div
                        className="bar-progress"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                    <span class="compte">1,3k</span>
                  </div>
                  <div className="item">
                    <span className="numero">2 </span>
                    <img src="/img/icons/diamond.png" alt="" />
                    <div className="bar-container">
                      <div
                        className="bar-progress"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <span class="compte">2k</span>
                  </div>
                  <div className="item">
                    <span className="numero">1 </span>
                    <img src="/img/icons/diamond.png" alt="" />
                    <div className="bar-container">
                      <div
                        className="bar-progress"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <span class="compte">1,1k</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="question container elevated-card">
              <h3>{t("Voulez-vous poser une question ?")}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                tenetur ducimus architecto, consectetur debitis aspernatur. Vero
                asperiores, repellendus provident culpa eligendi fuga eius? Porro
                nesciunt labore deleniti ipsam quam ipsa!
              </p>
              <div className="btn">{t("Poser une question")}</div>
            </div>
            <div className="job-populaire container elevated-card">
              <h3>{t("Travails populaire:")}</h3>
              <ul>
                <li>{t("-Super administrateur")}</li>
                <li>{t("-Administrateur de contenu")}</li>
                <li>{t("-Analyste")}</li>
                <li>{t("-Super administrateur")}</li>
                <li>{t("-Administrateur de contenu")}</li>
                <li>{t("-Analyste")}</li>
              </ul>
              <Link>{t("Voir tout les travails")}</Link>
            </div>
          </StickySideBar>
        </div>
      </div>
    </div>
  );
};

export default PortalEvaluation;