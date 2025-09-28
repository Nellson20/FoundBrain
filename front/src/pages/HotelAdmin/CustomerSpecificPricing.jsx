import React, { useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import Tab from "../../components/Tabs/Tab";
import Tabs from "../../components/Tabs/Tabs";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import "./CustomerSpecificPricing.scss";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

function convertToCamelCase(str) {
    return str.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    }).replace(/\s+/g, '');
}

const TarificationSection = ({ title, tarifs }) => {
  const { t } = useTranslation();
  const [activeStates, setActiveStates] = useState(tarifs.map(() => true));
  const [selectedOption, setSelectedOption] = useState("recommended");

  const handleToggle = (index) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="item elevated-card">
      <div>
        <Accordion isOpen={false} closeOnClickOutside={false}>
          <div className="head">
            <h3>{t(title)}</h3>
            <div className="flex gap-20">
              <small>{t("Capacité de base: 7 personnes")}</small>
              <small>{t("Capacité maximum: 7 personnes")}</small>
            </div>
          </div>
          <div className="body">
            <h4>{t("Quelle capacité de base souhaitez-vous associer à ce tarif ?")}</h4>
            <p>
              {t("La capacité de base est le nombre de clients que vous prévoyez d'inclure dans votre tarif standard. Ce tarif standard sert de référence pour déterminer la tarification spécifique à chaque client.")}
            </p>
            <div className="capacity-input mt-15">
              <label htmlFor="">{t("Capacité de base")}</label>
              <input type="number" defaultValue={7} />
            </div>
            <div className="mt-20">
              <h4>{t("Configurez des tarifs par client")}</h4>
              <p>
                {t("Vous pouvez adapter vos tarifs en fonction du nombre de personnes qui occuperont une chambre. Vous avez la possibilité de définir manuellement des tarifs pour différentes capacités d'occupation, mais nous vous conseillons d'automatiser ce processus. Vous pouvez le faire en ajoutant un tarif fixe par personne supplémentaire ou en spécifiant un pourcentage d'augmentation pour chaque personne au-delà du premier occupant.")}
              </p>
              <div className="flex gap-20 mt-10">
                <div className="flex align-items-center gap-5">
                  <input
                    type="radio"
                    name={`priceManagment${convertToCamelCase(title)}`}
                    id="recommended"
                    value="recommended"
                    checked={selectedOption === "recommended"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="recommended">{t("Recommandé")}</label>
                </div>
                <div className="flex align-items-center gap-5">
                  <input
                    type="radio"
                    name={`priceManagment${convertToCamelCase(title)}`}
                    id="custom"
                    value="custom"
                    checked={selectedOption === "custom"}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="custom">{t("Personnalisé")}</label>
                </div>
              </div>
              <small>{t("Nos recommandations reposent sur les données d'établissements comme le vôtre.")}</small>
            </div>
            <table>
              <thead>
                <tr className="title">
                  <th>{t("Occupation")}</th>
                  <th>{t("Tarif")}</th>
                  <th>{t("Action")}</th>
                </tr>
              </thead>
              <tbody>
                {activeStates.map((isActive, index) => (
                  <tr key={index} className={index === 0 ? "usuel-price" : ""}>
                    <td>{t(`${7 - index} personnes`)}</td>
                    <td>
                      {index === 0 ? (
                        t("Tarif habituel")
                      ) : (
                        <>
                          <span>{t("Tarif habituel réduit de")}</span>
                          <div className="input">
                            <input type="number" defaultValue={index * 5} />
                            <select name="sign" id="">
                              <option value="%">%</option>
                              <option value="USD">USD</option>
                            </select>
                          </div>
                        </>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-5">
                        <ToggleButton
                          active={isActive}
                          onToggle={() => handleToggle(index)}
                        />
                        <span>{isActive ? t("Activé") : t("Désactivé")}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

const CustomerSpecificPricing = () => {
  const { t } = useTranslation();
  const tarifications = [
    {
      title: "Tarification standard",
      tarifs: Array(7).fill(true),
    },
    {
      title: "Tarification non remboursable",
      tarifs: Array(7).fill(true),
    },
    {
      title: "Tarification à la semaine",
      tarifs: Array(7).fill(true),
    },
  ];

  return (
    <div className="customer-specific-pricing">
      <h2 className="py-15">{t("Tarification par client")}</h2>
      <div className="container">
        <Tabs className="occupation-pricing-tabs">
          <Tab
            title={
              <>
                <span>{t("Chambre double")}</span>
              </>
            }
          >
            <div className="container">
              {tarifications.map((tarif, index) => (
                <TarificationSection {...tarif} key={index} />
              ))}
            </div>
          </Tab>
          <Tab
            title={
              <>
                <span>{t("Chambre simple")}</span>
              </>
            }
          >
            <div className="elevated-card p-15 mt-5">
              <h3>{t("La tarification par client n'est pas disponible pour cet hébergement")}</h3>
              <p>{t("Pour pouvoir activer la tarification par client, rendez-vous sur la page Hébergements et augmentez l'occupation maximum de cet hébergement afin qu'elle soit supérieure à 1.")}</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerSpecificPricing;
