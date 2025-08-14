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
import { useTranslation } from "react-i18next";

const PricingPlans = () => {
  const { t } = useTranslation();

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
      <h2 className="py-15">{t("Pricing plans")}</h2>
      <p>
        {t(
          "Create and adjust various pricing plans to meet your clients' needs."
        )}
      </p>
      <div className=" container elevated-card">
        <div className="head flex justify-content-between align-items-center mt-15 p-15">
          <Link to="ajout">
            <button className="btn-purple">
              <Plus size={25} /> {t("Add a pricing plan")}
            </button>
          </Link>
          <select name="period" id="period">
            <option value="30 derniers jours">{t("Last 30 days")}</option>
            <option value="3 derniers mois">{t("Last 3 months")}</option>
            <option value="6 derniers mois">{t("Last 6 months")}</option>
            <option value="12 derniers mois">{t("Last 12 months")}</option>
          </select>
        </div>
        <div className=" table">
          <table>
            <thead>
              <tr className="title">
                <th></th>
                <th>{t("Pricing plan name")}</th>
                <th>{t("Cancellation conditions")}</th>
                <th>{t("Rate")}</th>
                <th>{t("Cancellation rate")}</th>
                <th>{t("Net revenue")}</th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((plan, index) => (
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
                              <th>{t("Accommodation types")}</th>
                              <th>{t("Meals")}</th>
                              <th>{t("Benefits")}</th>
                              <th>{t("Minimum stay")}</th>
                              <th>{t("Bookable")}</th>
                              <th>{t("Actions")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <ul className="flex flex-column gap-5">
                                  <li className="flex align-items-center gap-5">
                                    <CircleFill size={5} /> {t("Double room")}
                                  </li>
                                  <li className="flex align-items-center gap-5">
                                    <CircleFill size={5} /> {t("Single room")}
                                  </li>
                                </ul>
                              </td>
                              <td>{t("No meals")}</td>
                              <td>{t("No benefits")}</td>
                              <td>{t("No minimum stay duration")}</td>
                              <td>{t("Anytime")}</td>
                              <td className=" buttons">
                                <button className="edit" title={t("Edit")}>
                                  <PencilSquare
                                    size={20}
                                    onClick={() => setOpenModal(true)}
                                  />{" "}
                                  <span className="tooltiptext">{t("Edit")}</span>
                                  <Modal open={openModal}>
                                    <ModalPricingPlan
                                      handleCloseModal={setOpenModal}
                                      action="modify"
                                    />
                                  </Modal>
                                </button>
                                <button
                                  className="delete"
                                  title={t("Delete")}
                                >
                                  <Trash size={20} />{" "}
                                  <span className="tooltiptext">{t("Delete")}</span>
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
