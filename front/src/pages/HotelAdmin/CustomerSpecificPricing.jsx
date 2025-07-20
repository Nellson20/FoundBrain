// CustomerSpecificPricing.js
import React, { useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import Tab from "../../components/Tabs/Tab";
import Tabs from "../../components/Tabs/Tabs";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import "./CustomerSpecificPricing.scss";
import { useEffect } from "react";

function convertToCamelCase(str) {
    // Remplace chaque espace par une chaîne vide et convertit chaque mot en camelCase
    return str.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    }).replace(/\s+/g, '');
}

const TarificationSection = ({ title, tarifs }) => {
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
            <h3>{title}</h3>
            <div className="flex gap-20">
              <small>Capacité de base: 7 personnes</small>
              <small>Capacité maximum: 7 personnes</small>
            </div>
          </div>
          <div className="body">
            <h4>
              Quelle capacité de base souhaitez-vous associer à ce tarif ?
            </h4>
            <p>
              La capacité de base est le nombre de clients que vous prévoyez
              d'inclure dans votre tarif standard. Ce tarif standard sert de
              référence pour déterminer la tarification spécifique à chaque
              client.
            </p>
            <div className="capacity-input mt-15">
              <label htmlFor="">Capacité de base</label>
              <input type="number" defaultValue={7} />
            </div>
            <div className="mt-20">
              <h4>Configurez des tarifs par client</h4>
              <p>
                Vous pouvez adapter vos tarifs en fonction du nombre de
                personnes qui occuperont une chambre. Vous avez la possibilité
                de définir manuellement des tarifs pour différentes capacités
                d'occupation, mais nous vous conseillons d'automatiser ce
                processus. Vous pouvez le faire en ajoutant un tarif fixe par
                personne supplémentaire ou en spécifiant un pourcentage
                d'augmentation pour chaque personne au-delà du premier occupant.
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
                  <label htmlFor="recommended">Recommandé</label>
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
                  <label htmlFor="custom">Personnalisé</label>
                </div>
              </div>
              <small>
                Nos recommandations reposent sur les données d'établissements
                comme le vôtre.
              </small>
            </div>
            <table>
              <thead>
                <tr className="title">
                  <th>Occupation</th>
                  <th>Tarif</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeStates.map((isActive, index) => (
                  <tr key={index} className={index === 0 ? "usuel-price" : ""}>
                    <td>{7 - index} personnes</td>
                    <td>
                      {index === 0 ? (
                        "Tarif habituel"
                      ) : (
                        <>
                          <span>Tarif habituel réduit de</span>
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
                        <span>{isActive ? "Activé" : "Désactivé"}</span>
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
  const tarifications = [
    {
      title: "Standard Rate",
      tarifs: Array(7).fill(true),
    },
    {
      title: "Non-refundable Rate",
      tarifs: Array(7).fill(true),
    },
    {
      title: "Weekly Rate",
      tarifs: Array(7).fill(true),
    },
  ];

  return (
    <div className="customer-specific-pricing">
      <h2 className="py-15">Tarification par client</h2>
      <div className="container">
        <Tabs className="occupation-pricing-tabs">
          <Tab
            title={
              <>
                <span>Double Room</span>
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
                <span>Single Room</span>
              </>
            }
          >
            <div className="elevated-card p-15 mt-5">
            <h3>La tarification par client n'est pas disponible pour cet hébergement</h3>
            <p>Pour pouvoir activer la tarification par client, rendez-vous sur la page Hébergements et augmentez l'occupation maximum de cet hébergement afin qu'elle soit supérieure à 1. </p>

            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerSpecificPricing;
