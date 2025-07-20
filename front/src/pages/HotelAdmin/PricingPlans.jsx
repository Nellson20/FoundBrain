import {
  ChevronDown,
  ChevronUp,
  CircleFill,
  Dot,
  PencilSquare,
  Plus,
  PlusCircle,
  Trash,
} from "react-bootstrap-icons";
import "./PricingPlans.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ModalPricingPlan from "./ModalPricingPlan";

const PricingPlans = () => {
  const [openPlans, setOpenPlans] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const togglePlan = (planId) => {
    setOpenPlans((prevState) => ({
      ...prevState,
      [planId]: !prevState[planId],
    }));
  };

  const pricingPlans = [
    {
      id: 1,
      name: "Standard Rate",
      conditions: "Flexible - 18h00, le jour d'arrivée",
      tarif: "Géré par votre Calendrier",
      tauxAnnulation: "Données insuffisantes",
      revenusNets: "1 050,00 €",
    },
    {
      id: 2,
      name: "Non-refundable Rate",
      conditions: "Flexible - 18h00, le jour d'arrivée",
      tarif: "Géré par votre Calendrier",
      tauxAnnulation: "Données insuffisantes",
      revenusNets: "1 050,00 €",
    },
    {
      id: 3,
      name: "Weekly Rate",
      conditions: "Flexible - 18h00, le jour d'arrivée",
      tarif: "Géré par votre Calendrier",
      tauxAnnulation: "Données insuffisantes",
      revenusNets: "1 050,00 €",
    },
  ];
  return (
    <div className="pricing-plans">
      <h2 className="py-15">Plans tarifaires</h2>
      <p>
        Élaborez et ajustez divers plans tarifaires pour répondre aux besoins de
        vos clients.
      </p>
      <div className=" container elevated-card">
        <div className="head flex justify-content-between align-items-center mt-15 p-15">
          <Link to="ajout">
            <button className="btn-purple">
              <Plus size={25} /> Ajouter un plan tarifaire
            </button>
          </Link>
          <select name="period" id="period">
            <option value="30 derniers jours">30 derniers jours</option>
            <option value="3 derniers mois">3 derniers mois</option>
            <option value="6 derniers mois">6 derniers mois</option>
            <option value="12 derniers mois">12 derniers mois</option>
          </select>
        </div>
        <div className=" table">
          <table>
            <thead>
              <tr className="title">
                <th></th>
                <th>Nom du plan tarifaire</th>
                <th>Conditions d'annulation</th>
                <th>Tarif</th>
                <th>Taux d'annulation</th>
                <th>Revenus nets</th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((plan,index) => (
                <React.Fragment key={index}>
                  <tr
                    className="primary"
                    onClick={() => {
                      togglePlan(plan.id);
                    }}
                  >
                    <td
                      className="icon"
                      style={{
                        borderRadius: openPlans[plan.id] && "5px 0 0 0",
                      }}
                    >
                      {openPlans[plan.id] ? <ChevronUp /> : <ChevronDown />}
                    </td>
                    <td>
                      <span>{plan.name}</span>
                      <small>ID {plan.id}</small>
                    </td>
                    <td>{plan.conditions}</td>
                    <td>{plan.tarif}</td>
                    <td>{plan.tauxAnnulation}</td>
                    <td
                      style={{
                        borderRadius: openPlans[plan.id] && "0 5px 0 0",
                      }}
                    >
                      {plan.revenusNets}
                    </td>
                  </tr>
                  {openPlans[plan.id] && (
                    <tr className="more">
                      <td colSpan={6}>
                        <table>
                          <thead>
                            <tr>
                              <th>Types d'hébergement</th>
                              <th>Repas</th>
                              <th>Avantages</th>
                              <th>Séjour minimum</th>
                              <th>Réservable</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <ul className="flex flex-column gap-5">
                                  <li className="flex align-items-center gap-5">
                                    <CircleFill size={5} /> Chambre Double
                                  </li>
                                  <li className="flex align-items-center gap-5">
                                    <CircleFill size={5} /> Chambre Simple
                                  </li>
                                </ul>
                              </td>
                              <td>Aucun repas</td>
                              <td>Pas d'avantages</td>
                              <td>Aucune durée de séjour minimum</td>
                              <td>A tout moment</td>
                              <td className=" buttons">
                                <button className="edit" title="Modifier">
                                  <PencilSquare
                                    size={20}
                                    onClick={() => setOpenModal(true)}
                                  />{" "}
                                  <span class="tooltiptext">Modifier</span>
                                  <Modal open={openModal}>
                                    <ModalPricingPlan
                                      handleCloseModal={setOpenModal}
                                      action="modify"
                                    />
                                  </Modal>
                                </button>
                                <button className="delete" title="Supprimer">
                                  <Trash size={20} />{" "}
                                  <span class="tooltiptext">Supprimer</span>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
