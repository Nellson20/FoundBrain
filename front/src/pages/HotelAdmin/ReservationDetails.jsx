import { Link } from "react-router-dom";
import "./ReservationDetails.scss";
import { ChevronDown } from "react-bootstrap-icons";
import DropDown from "../../components/DropDown/DropDown";

const ReservationDetails = () => {
  return (
    <div className="reservation-details">
      <h2>Details de la réservation</h2>
      <div className="flex gap-15">
        <div className="reservation-left">
          <div className="reservation elevated-card flex  p-15">
            <div className="left">
              <div>
                <p>Date d'arrivée</p>
                <span className="important">mar. 19 mars 2024</span>
              </div>
              <div>
                <p>Date de départ</p>
                <span className="important">mer. 20 mars 2024</span>
              </div>
              <div>
                <p>Durée de séjour </p>
                <span>1 nuit</span>
              </div>
              <div>
                <p>Nombre de personnes </p>
                <span>2</span>
              </div>
              <div>
                <p>Nombre de logements </p>
                <span>1</span>
              </div>
              <div>
                <p>Montant total</p>
                <span className="important">$ 152,82</span>
              </div>
            </div>
            <div className="right">
              <div>
                <p>Nom du client :</p>
                <div className="nom flex gap-5">
                  <img src="/img/flags/Flag_of_Madagascar.svg" alt="" />
                  <p>John Doe</p>
                </div>
              </div>
              <div>
                <Link>johnDoe.265@gateAfri.com</Link>
                <Link>+261 32 69 566 35</Link>
              </div>
              <div>
                <p>Langue</p>
                <span>francais</span>
              </div>
              <div className="deux-colone flex">
                <div>
                  <p>Numéro de réservation :</p>
                  <span>1435565653</span>
                </div>
                <div>
                  <p>Montant soumis à commission :</p>
                  <span>$ 150</span>
                </div>
              </div>
              <div className="deux-colone flex">
                <div>
                  <p>Recu le</p>
                  <span>mar. 17 mars 2024</span>
                </div>
                <div>
                  <p>Commission :</p>
                  <span>$ 22,50</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tarif elevated-card p-15 mt-15">
            <div className="head">
              <div className="flex justify-content-between">
                <h4>Chambre Double</h4>
                <span>$ 152,82</span>
              </div>
              <span>mar. 19 mars 2024 - mer. 20 mars 2024</span>
            </div>
            <div className="bottom flex justify-content-between gap-15">
              <div className="left">
                <div>
                  <p>Nom du client</p>
                  <span>john Doe</span>
                </div>
                <div>
                  <p>Occupation maximum</p>
                  <span>7 adultes, 6 enfants (7 personnes max.)</span>
                </div>
              </div>
              <div className="right">
                <table>
                  <tr>
                    <th>Date</th>
                    <th>Tarif</th>
                    <th>Tarif par nuit</th>
                  </tr>
                  <tr>
                    <td>19 - 20 mars</td>
                    <td>Standard Rate</td>
                    <td>$ 150</td>
                  </tr>
                  <tr>
                    <th colspan="2">Sous-total</th>
                    <th>$ 150</th>
                  </tr>
                  <tr>
                    <td>Taxe de sejour</td>
                    <td>$ 1,41 par personne et par jour</td>
                    <td>$ 2,82</td>
                  </tr>
                  <tr className="total">
                    <th colspan="2">Tarif total de l'hébergement</th>
                    <th>$ 152,82</th>
                  </tr>
                  <tr>
                    <td colspan="3">Le tarif comprend 20 % de TVA</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="demandes elevated-card p-15 mt-15">
            <h4 className="mb-10">Demandes des clients</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores doloribus repudiandae voluptate reiciendis repellendus
              esse quis vel culpa fugiat, dolorem quisquam animi aliquid, itaque
              pariatur numquam, aspernatur velit quas ab.
            </p>
          </div>
          <div className="conversation elevated-card p-15 mt-15">
            <h4>Conversation avec le client</h4>
          </div>
        </div>
        <div className="reservation-right">
          <div className="action elevated-card p-15">
            <button className="btn-purple">Imprimer cette page</button>
            <div className="action-reservation">
              <h3 className="mt-10">Action sur les réservations</h3>
              <button className="btn-purple">
                Demander un changement de dates
              </button>
              <button className="btn-purple">
                Demander l'annulation de la réservation
              </button>
              <button className="btn-purple" disabled="disabled">
                Signaler comme non-présentation
              </button>
              <hr />
            </div>
            <div className="paiement">
              <h3>Paiement</h3>
              <button className="btn-purple" disabled="disabled">
                Carte de crédit non valide
              </button>
              <button className="btn-purple" disabled="disabled">
                Coordonnées de la carte de crédit
              </button>
              <div>
                <p>Recue le 19 mars 2024 a 08:47</p>
                <small>
                  Vous n'avez pas l'autorisation pour consulter les coordonnées
                  de carte de crédit.
                </small>
              </div>
              <div className="status">
                <p>Status du paiement</p>
                <DropDown activeClassName="surligné">
                  <div className="selection flex align-items-center justify-content-between">
                    <p>Selectionner le status de paiement</p>
                    <ChevronDown />
                  </div>
                  <ul>
                    <li>
                      <a href="#">Le client a payé l'intégralité</a>
                    </li>
                    <li>
                      <a href="#">Le client a effectué un prépaiement</a>
                    </li>
                    <li>
                      <a href="#">La carte à été préautorisée</a>
                    </li>
                    <li>
                      <a href="#">Le client n'a pas encore payé</a>
                    </li>
                  </ul>
                </DropDown>
              </div>
            </div>
            <hr />
            <div className="probleme">
              <h3>Problème</h3>
              <button className="btn-purple">
                Signaler un comportement inapproprié du client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
