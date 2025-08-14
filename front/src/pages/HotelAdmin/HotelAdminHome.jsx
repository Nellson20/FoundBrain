import { 
  BoxArrowInLeft,
  BoxArrowInRight,
  ChevronDown,
  Circle,
  CircleFill,
  Luggage,
  Search,
} from "react-bootstrap-icons";
import "./HotelAdminHome.scss";
import Tabs from "../../components/Tabs/Tabs";
import Tab from "../../components/Tabs/Tab";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HotelAdminHome = () => {
  const { t } = useTranslation();

  return (
    <div className="hotel-admin-home flex gap-15">
      <div className="left">
        <div className="top">
          <div className="box elevated-card">
            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center gap-5">
                <div className="icon">
                  <BoxArrowInRight size={23} />
                </div>
                <div>
                  <h4>{t("Arrivées")}</h4>
                  <span>{t("Cette semaine")}</span>
                </div>
              </div>
              <span>54</span>
            </div>
          </div>
          <div className="box elevated-card">
            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center gap-5">
                <div className="icon">
                  <Luggage size={23} />
                </div>
                <div>
                  <h4>{t("Départs")}</h4>
                  <span>{t("Cette semaine")}</span>
                </div>
              </div>
              <span>12</span>
            </div>
          </div>
          <div className="box last elevated-card flex align-items-center justify-content-between">
            <div className="head flex align-items-center gap-5">
              <span>80%</span>
              <h4>
                {t("Chambres")} <br /> {t("occupées")}
              </h4>
            </div>
            <span>50</span>
          </div>
        </div>
        <div className="reservation elevated-card mt-15">
          <div className="reservation-head flex align-items-center">
            <h3>{t("Reservations")}</h3>
            <div className="search">
              <div className="icon-search">
                <Search size={16} />
              </div>
              <input type="text" placeholder={t("Recherche chambre ou nom")} />
            </div>
            <div className="period flex align-items-center gap-10">
              <span>{t("Aujourd'hui")}</span>
              <ChevronDown />
            </div>
          </div>
          <div className="reservation-body">
            <Tabs className="reservation-tabs">
              <Tab
                title={
                  <>
                    <span>{t("Arrivées")}</span>
                  </>
                }
              >
                <div className="reservation-container ">
                  <div className="item flex justify-content-between">
                    <div className="left">
                      <div className="name flex align-items-center gap-5">
                        <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                        <h3>John Doe</h3>
                      </div>
                      <Link className="reference">231543544</Link>
                    </div>
                    <div className="center">
                      <span>21 mars 2024 - 25 mars 2024</span>
                      <span>{t("Arrivée")}: 11:00 - 12:00</span>
                      <span>4 {t("nuits")} - 2 {t("clients")}</span>
                    </div>
                    <div className="right">
                      <span className="coins">$ 150</span>
                      <span>19 mars 2024</span>
                    </div>
                  </div>
                  <div className="item flex justify-content-between">
                    <div className="left">
                      <div className="name flex align-items-center gap-5">
                        <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                        <h3>John Doe</h3>
                      </div>
                      <Link className="reference">231543544</Link>
                    </div>
                    <div className="center">
                      <span>21 mars 2024 - 25 mars 2024</span>
                      <span>{t("Arrivée")}: 11:00 - 12:00</span>
                      <span>4 {t("nuits")} - 2 {t("clients")}</span>
                    </div>
                    <div className="right">
                      <span className="argent">$ 150</span>
                      <span>19 mars 2024</span>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                title={
                  <>
                    <span>{t("Départs")}</span>
                  </>
                }
              ></Tab>
              <Tab
                title={
                  <>
                    <span>{t("Séjours en cours")}</span>
                  </>
                }
              ></Tab>
              <Tab
                title={
                  <>
                    <span>{t("Demandes des clients")}</span>
                  </>
                }
              ></Tab>
            </Tabs>
          <button className="btn-purple">{t("Voir toutes les réservations")}</button>
          </div>
        </div>

        <div className="reservation-current elevated-card mt-10">
          <h3>{t("Reservations les plus récentes")}</h3>
          <div className="reservation-container ">
            <div className="item flex justify-content-between">
              <div className="left">
                <div className="name flex align-items-center gap-5">
                  <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                  <h3>John Doe</h3>
                </div>
                <Link className="reference">231543544</Link>
              </div>
              <div className="center">
                <span>21 mars 2024 - 25 mars 2024</span>
                <span>{t("Arrivée")}: 11:00 - 12:00</span>
                <span>4 {t("nuits")} - 2 {t("clients")}</span>
              </div>
              <div className="right">
                <span className="argent">$ 150</span>
                <span>19 mars 2024</span>
              </div>
            </div>
            <div className="item flex justify-content-between">
              <div className="left">
                <div className="name flex align-items-center gap-5">
                  <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                  <h3>John Doe</h3>
                </div>
                <Link className="reference">231543544</Link>
              </div>
              <div className="center">
                <span>21 mars 2024 - 25 mars 2024</span>
                <span>{t("Arrivée")}: 11:00 - 12:00</span>
                <span>4 {t("nuits")} - 2 {t("clients")}</span>
              </div>
              <div className="right">
                <span className="argent">$ 150</span>
                <span>19 mars 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="messages elevated-card p-15 mt-15">
          <h3>{t("Messages en attente d'une réponse")}</h3>
          <div className="messages-container flex justify-content-between">
            <div className="name flex align-items-center gap-5">
              <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
              <h4>John Doe</h4>
            </div>
            <div className="msg">
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptate ratione praesentium! Natus atque facilis ipsa dolorem, ut unde, explicabo praesentium consectetur nulla soluta aliquam voluptatum necessitatibus ab, a suscipit.</span>
            </div>
            <span className="date">19 mars</span>
          </div>
          <button className="btn-purple">{t("Voir tout les messages")}</button>
        </div>

        <div className="comment elevated-card p-15 mt-15">
            <h3>{t("Commentaires récents")}</h3>
            <div className="comment-container flex justify-content-between">
            <div className="name flex align-items-center gap-5">
              <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
              <h4>John Doe</h4>
            </div>
            <div className="msg">
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptate ratione praesentium! Natus atque facilis ipsa dolorem, ut unde, explicabo praesentium consectetur nulla soluta aliquam voluptatum necessitatibus ab, a suscipit.</span>
            </div>
            <span className="date">19 mars</span>
          </div>
          <button className="btn-purple">{t("Voir tout les commentaires")}</button>

        </div>
      </div>
      <div className="right ">
        <div className="todays elevated-card p-15 mb-5">
          <h3>{t("Activitées aujourd'hui")}</h3>
          <div className="flex justify-content-center gap-10">
            <div className="reservation">
              <span>5</span>
              <p>{t("Reservation")}</p>
            </div>
            <div className="guest">
              <span>22</span>
              <p>{t("Client qui séjourne")}</p>
            </div>
            <div className="income">
              <span>165 €</span>
              <p>{t("Revenue")}</p>
            </div>
          </div>
        </div>
        <div className="notes elevated-card p-15 mb-5">
          <h3>{t("Vos notes")}</h3>
          <div>
            <div className="flex justify-content-between">
                <p>{t("Score de la page de l'établissement")}</p>
                <p>21%</p>
            </div>
            <div className="bar">
                <div className="bar-progress"></div>
            </div>
          </div>
          <small>{t("Moyenne de destination")}: 90%</small>
        </div>
        <div className="performance elevated-card p-15 mb-5">
            <h3>{t("Votre performance")}</h3>
            <span>{t("Au cours des 30 dernier jours")}</span>
            <div>
                <p className="flex align-items-center gap-5"><CircleFill size={10} className="icon"/>{t("Prix moyen")}</p>
                <span>$ 100</span>
                <small>{t("Moyenne de la destination")}: $ 64,74</small>
            </div>
            <div>
                <p className="flex align-items-center gap-5"><CircleFill size={10} className="icon"/>{t("Taux d'annulation")}</p>
                <span>0%</span>
                <small>{t("Moyenne de la destination")}: 64,74%</small>
            </div>
            <div>
                <p className="flex align-items-center gap-5"><CircleFill size={10} className="icon"/>{t("Revenus")}</p>
                <span>$ 100</span>
            </div>
            <div>
                <p className="flex align-items-center gap-5"><CircleFill size={10} className="icon"/>{t("Nuitées effectuées")}</p>
                <span>5</span>
            </div>
            <div>
                <p className="flex align-items-center gap-5"><CircleFill size={10} className="icon"/>{t("Reservations recues")}</p>
                <span>25</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HotelAdminHome;
