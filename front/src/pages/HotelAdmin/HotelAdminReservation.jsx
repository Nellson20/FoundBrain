import { ChevronDown } from "react-bootstrap-icons"; 
import "./HotelAdminReservation.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HotelAdminReservation = () => {
  const { t } = useTranslation();

  return (
    <div className="hotel-admin-reservation mt-15">
      <h2>{t("Réservations")}</h2>
      <div className="container elevated-card">
        <form action="" className="search flex p-15 gap-15 mt-15">
          <div className="trie">
            <label htmlFor="">{t("Date de")}</label>
            <div className="flex align-items-center gap-20">
              <p>{t("Arrivées")}</p>
              <ChevronDown size={13} />
            </div>
          </div>
          <div>
            <label htmlFor="start">{t("Du")}</label>
            <input type="date" name="start" id="start" />
          </div>
          <div>
            <label htmlFor="end">{t("Au")}</label>
            <input type="date" name="end" id="end" />
          </div>
          <div className="btn-purple">{t("Voir")}</div>
        </form>
        <div className="reservation-lists px-15 mt-5">
          <table>
            <tr className="title">
              <th>{t("Nom du client")}</th>
              <th>{t("Arivée")}</th>
              <th>{t("Depart")}</th>
              <th>{t("Hébergements")}</th>
              <th>{t("Réservé le")}</th>
              <th>{t("Status")}</th>
              <th>{t("Tarif")}</th>
              <th>{t("Commission")}</th>
              <th>{t("Numéro de reservation")}</th>
            </tr>
            <tr>
              <td>
                <Link>John Doe</Link>
                <span>{t("2 personnes")}</span>
              </td>
              <td>19 mars 2024</td>
              <td>21 mars 2024</td>
              <td>{t("Chambre double")}</td>
              <td>17 mars 2024</td>
              <td className="status">OK</td>
              <td>$ 150</td>
              <td>$ 22,50</td>
              <td>
                <Link to={":reservationId"}>12315546</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link>John Doe</Link>
                <span>{t("2 personnes")}</span>
              </td>
              <td>19 mars 2024</td>
              <td>21 mars 2024</td>
              <td>{t("Chambre double")}</td>
              <td>17 mars 2024</td>
              <td className="status">OK</td>
              <td>$ 150</td>
              <td>$ 22,50</td>
              <td>
                <Link to={":reservationId"}>12315546</Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="bottom elevated-card p-15">
        <span>{t("Commission")} : $ 57,50</span>
        <span className="total">{t("Montant total")} : $ 506</span>
      </div>
    </div>
  );
};

export default HotelAdminReservation;
