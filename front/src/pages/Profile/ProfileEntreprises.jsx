import { Search } from "react-bootstrap-icons";
import "./ProfileEntreprises.scss";
import Slider from "react-slick";
import Logo from "../../components/Logo/Logo";
import { useTranslation } from "react-i18next";

const ProfileEntreprises = () => {
  const { t } = useTranslation();

  return (
    <div className="profile-entreprises">
      <div className="top">
        <h3>{t("List d'entreprise")}</h3>
        <div className="search flex align-items-center gap-15">
          <Search size={17} className="icon-search" />
          <input type="text" placeholder={t("Entreprises ...")} />
          <div className="btn-purple">{t("Recherche")}</div>
        </div>
      </div>
      <section className="entreprises-list">
          <div className="entreprise-item">
            <div className="cover">
              <img src="/img/entreprises/a.jpg" alt="" />
            </div>
            <div className="capt">
              <Logo width={35} height={35} />
              <h3>{t("TechInnovate Solutions")}</h3>
              <p className="line-clamp-2">
                {t("TechInnovate Solutions est une entreprise de technologie innovante qui se spécialise dans le développement de solutions logicielles et matérielles pour les industries de la santé, de l'éducation et de l'automobile.")}
              </p>
            </div>
          </div>
          <div className="entreprise-item">
            <div className="cover">
              <img src="/img/entreprises/b.jpg" alt="" />
            </div>
            <div className="capt">
              <Logo width={35} height={35} />
              <h3>{t("EcoGreen Energy")}</h3>
              <p className="line-clamp-2">
                {t("EcoGreen Energy est une entreprise leader dans le secteur des énergies renouvelables, se concentrant sur le développement et la commercialisation de solutions énergétiques durables pour les résidentiels et les entreprises.")}
              </p>
            </div>
          </div>
          <div className="entreprise-item">
            <div className="cover">
              <img src="/img/entreprises/d.jpg" alt="" />
            </div>
            <div className="capt">
              <Logo width={35} height={35} />
              <h3>{t("FashionForward Designs")}</h3>
              <p className="line-clamp-2">
                {t("FashionForward Designs est une marque de mode contemporaine qui se distingue par ses créations uniques et ses designs innovants, ciblant les jeunes adultes et les professionnels de la mode.")}
              </p>
            </div>
          </div>
          <div className="entreprise-item">
            <div className="cover">
              <img src="/img/entreprises/ent1.jpg" alt="" />
            </div>
            <div className="capt">
              <Logo width={35} height={35} />
              <h3>{t("SustainableGrowth Farms")}</h3>
              <p className="line-clamp-2">
                {t("SustainableGrowth Farms est une entreprise agricole qui se distingue par ses méthodes de culture durables et écologiques, produisant des fruits et légumes de haute qualité pour le marché local et international.")}
              </p>
            </div>
          </div>
      </section>
    </div>
  );
};

export default ProfileEntreprises;
