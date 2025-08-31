import { Link } from "react-router-dom";
import "./ReservationDetails.scss";
import { ChevronDown } from "react-bootstrap-icons";
import DropDown from "../../components/DropDown/DropDown";
import { useTranslation } from "react-i18next";

const ReservationDetails = () => {
  const { t } = useTranslation();

  return (
    <div className="reservation-details">
      <h2>{t("Reservation details") /* Details de la réservation */}</h2>
      <div className="flex gap-15">
        <div className="reservation-left">
          <div className="reservation elevated-card flex  p-15">
            <div className="left">
              <div>
                <p>{t("Date d'arrivée")}</p>
                <span className="important">mar. 19 mars 2024</span>
              </div>
              <div>
                <p>{t("Date de départ")}</p>
                <span className="important">mer. 20 mars 2024</span>
              </div>
              <div>
                <p>{t("Durée de séjour")}</p>
                <span>1 nuit</span>
              </div>
              <div>
                <p>{t("Nombre de personnes")}</p>
                <span>2</span>
              </div>
              <div>
                <p>{t("Nombre de logements")}</p>
                <span>1</span>
              </div>
              <div>
                <p>{t("Montant total")}</p>
                <span className="important">$ 152,82</span>
              </div>
            </div>
            <div className="right">
              <div>
                <p>{t("Nom du client")} :</p>
                <div className="nom flex gap-5">
                  <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                  <p>John Doe</p>
                </div>
              </div>
              <div>
                <Link>johnDoe.265@FoundBrain.com</Link>
                <Link>+261 32 69 566 35</Link>
              </div>
              <div>
                <p>{t("Langue")}</p>
                <span>francais</span>
              </div>
              <div className="deux-colone flex">
                <div>
                  <p>{t("Numéro de réservation")} :</p>
                  <span>1435565653</span>
                </div>
                <div>
                  <p>{t("Montant soumis à commission")} :</p>
                  <span>$ 150</span>
                </div>
              </div>
              <div className="deux-colone flex">
                <div>
                  <p>{t("Recu le")}</p>
                  <span>mar. 17 mars 2024</span>
                </div>
                <div>
                  <p>{t("Commission")} :</p>
                  <span>$ 22,50</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tarif elevated-card p-15 mt-15">
            <div className="head">
              <div className="flex justify-content-between">
                <h4>{t("Chambre Double")}</h4>
                <span>$ 152,82</span>
              </div>
              <span>mar. 19 mars 2024 - mer. 20 mars 2024</span>
            </div>
            <div className="bottom flex justify-content-between gap-15">
              <div className="left">
                <div>
                  <p>{t("Nom du client")}</p>
                  <span>john Doe</span>
                </div>
                <div>
                  <p>{t("Occupation maximum")}</p>
                  <span>{t("7 adultes, 6 enfants (7 personnes max.)")}</span>
                </div>
              </div>
              <div className="right">
                <table>
                  <tr>
                    <th>{t("Date")}</th>
                    <th>{t("Tarif")}</th>
                    <th>{t("Tarif par nuit")}</th>
                  </tr>
                  <tr>
                    <td>19 - 20 mars</td>
                    <td>{t("Standard Rate")}</td>
                    <td>$ 150</td>
                  </tr>
                  <tr>
                    <th colSpan="2">{t("Sous-total")}</th>
                    <th>$ 150</th>
                  </tr>
                  <tr>
                    <td>{t("Taxe de sejour")}</td>
                    <td>$ 1,41 {t("par personne et par jour")}</td>
                    <td>$ 2,82</td>
                  </tr>
                  <tr className="total">
                    <th colSpan="2">{t("Tarif total de l'hébergement")}</th>
                    <th>$ 152,82</th>
                  </tr>
                  <tr>
                    <td colSpan="3">{t("Le tarif comprend 20 % de TVA")}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="demandes elevated-card p-15 mt-15">
            <h4 className="mb-10">{t("Demandes des clients")}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores doloribus repudiandae voluptate reiciendis repellendus
              esse quis vel culpa fugiat, dolorem quisquam animi aliquid, itaque
              pariatur numquam, aspernatur velit quas ab.
            </p>
          </div>
          <div className="conversation elevated-card p-15 mt-15">
            <h4>{t("Conversation avec le client")}</h4>
          </div>
        </div>
        <div className="reservation-right">
          <div className="action elevated-card p-15">
            <button className="btn-purple">{t("Imprimer cette page")}</button>
            <div className="action-reservation">
              <h3 className="mt-10">{t("Action sur les réservations")}</h3>
              <button className="btn-purple">{t("Demander un changement de dates")}</button>
              <button className="btn-purple">{t("Demander l'annulation de la réservation")}</button>
              <button className="btn-purple" disabled="disabled">{t("Signaler comme non-présentation")}</button>
              <hr />
            </div>
            <div className="paiement">
              <h3>{t("Paiement")}</h3>
              <button className="btn-purple" disabled="disabled">{t("Carte de crédit non valide")}</button>
              <button className="btn-purple" disabled="disabled">{t("Coordonnées de la carte de crédit")}</button>
              <div>
                <p>{t("Recue le 19 mars 2024 a 08:47")}</p>
                <small>{t("Vous n'avez pas l'autorisation pour consulter les coordonnées de carte de crédit.")}</small>
              </div>
              <div className="status">
                <p>{t("Status du paiement")}</p>
                <DropDown activeClassName="surligné">
                  <div className="selection flex align-items-center justify-content-between">
                    <p>{t("Selectionner le status de paiement")}</p>
                    <ChevronDown />
                  </div>
                  <ul>
                    <li><a href="#">{t("Le client a payé l'intégralité")}</a></li>
                    <li><a href="#">{t("Le client a effectué un prépaiement")}</a></li>
                    <li><a href="#">{t("La carte à été préautorisée")}</a></li>
                    <li><a href="#">{t("Le client n'a pas encore payé")}</a></li>
                  </ul>
                </DropDown>
              </div>
            </div>
            <hr />
            <div className="probleme">
              <h3>{t("Problème")}</h3>
              <button className="btn-purple">{t("Signaler un comportement inapproprié du client")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
