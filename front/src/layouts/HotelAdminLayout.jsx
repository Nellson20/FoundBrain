import {
  ChevronDown,
  Envelope,
  FileEarmarkText,
  House,
  ListUl,
  Pencil,
} from "react-bootstrap-icons";
import DoNavLink from "../components/DoNavLink/DoNavLink";
import "./HotelAdminLayout.scss";
import { Link, Outlet } from "react-router-dom/dist";
import DropDown from "../components/DropDown/DropDown";

const HotelAdminLayout = () => {
  return (
    <div id="hotel-admin">
      <div className="nav"></div>
      <div className="hotel-admin-container">
        <div className="hotel-admin-nav elevated-card flex justify-content-center">
          <ul>
            <li>
              <DoNavLink activeClass="active" to={`home`}>
                <House size={16} />
                <small>Accueil</small>
              </DoNavLink>
            </li>
            <li>
            <DropDown activeClassName="surligné" className="dropdown-tarif-disponibility">
                <Link>
                  <Pencil size={16} />
                  <small className="flex gap-5">
                  Tarif et disponibilités <ChevronDown />
                  </small>
                </Link>
                <ul>
                  <li>
                    <a href="#">Calendrier</a>
                  </li>
                  <li>
                    <DoNavLink to="restrictions">Restrictions</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="control-hebergements">Ouvrir/fermer des hébergements</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="plans-tarifaires">Plans tarifaires</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="avantages">Avantages</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="tarification-par-client">Tarification par client</DoNavLink>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li>
              <DoNavLink to={`reservation`}>
                <ListUl size={16} />
                <small>Reservation</small>
              </DoNavLink>
            </li>
            <li>
              <DropDown activeClassName="surligné">
                <Link>
                  <Pencil size={16} />
                  <small className="flex gap-5">
                    Etablissement <ChevronDown />
                  </small>
                </Link>
                <ul>
                  <li>
                    <DoNavLink to="hotel-info">Information sur l'hotel</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="photos">Galerie Photos</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="equipments-services">Equipements et Services</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="hebergements">Hébergements</DoNavLink>
                  </li>
                  <li>
                    <DoNavLink to="hebergement-details">Details des hébergements</DoNavLink>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li>
              <DoNavLink to={"messages"}>
                <Envelope size={16} />
                <small>Boite de reception</small>
              </DoNavLink>
            </li>
            <li>
              <DoNavLink to={"fdsfsdf"}>
                <FileEarmarkText size={16} />
                <small>Comptabilité</small>
              </DoNavLink>
            </li>
          </ul>
          {/* <div className="hotel-name">
            <h1>Gate Hotel </h1>
            <ChevronExpand/>
          </div> */}
        </div>
        <div className="bottom">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HotelAdminLayout;
