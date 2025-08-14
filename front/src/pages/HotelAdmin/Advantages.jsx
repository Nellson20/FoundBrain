import { Dot, PencilSquare, Trash } from "react-bootstrap-icons";
import "./Advantages.scss";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import ModalAdvantages from "./ModalAdvantages";
import { useTranslation } from 'react-i18next';

const Advantages = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div id="advantages">
      <h2 className="mt-15">{t("Les Avantages")}</h2>
      <p>
        {t("Vous avez la possibilité de lier jusqu'à 5 Avantages à chaque plan tarifaire. Une fois qu'ils sont associés, ces Avantages seront disponibles pour les clients.")}
      </p>
      <div className="avantage-container elevated-card mt-15">
        <div className="head flex align-items-center justify-content-between p-15">
          <h3>{t("Vos Avantages")}</h3>
          <button
            className="btn-purple"
            onClick={() => setOpenModalCreate(true)}
          >
            {t("Crée des Avantages")}
          </button>
          <Modal open={openModalCreate}>
            <ModalAdvantages
              handleCloseModal={setOpenModalCreate}
              action="create"
            />
          </Modal>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr className="title">
                <th>{t("Nom des avantages")}</th>
                <th>{t("Avantages proposées")}</th>
                <th>{t("Liés aux plans tarifaires")}</th>
                <th>{t("Actions")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("Avantage 1")}</td>
                <td>
                  <ul className="flex align-items-center gap-2">
                    <li>{t("Départ tardif")}</li>
                    <span>
                      <Dot />
                    </span>
                    <li>{t("Internet haut débit")}</li>
                    <span>
                      <Dot />
                    </span>
                    <li>{t("Parking")}</li>
                    <span>
                      <Dot />
                    </span>
                    <li>{t("Bouteille de vin")}</li>
                    <span>
                      <Dot />
                    </span>
                    <li>{t("Enregistrement tardif")}</li>
                  </ul>
                </td>
                <td>{t("0 plan tarifaire")}</td>
                <td className=" buttons">
                  <button className="edit" title={t("Modifier")}>
                    <PencilSquare
                      size={20}
                      onClick={() => setOpenModal(true)}
                    />{" "}
                    <span className="tooltiptext">{t("Modifier")}</span>
                    <Modal open={openModal}>
                      <ModalAdvantages handleCloseModal={setOpenModal} />
                    </Modal>
                  </button>
                  <button className="delete" title={t("Supprimer")}>
                    <Trash size={20} />{" "}
                    <span className="tooltiptext">{t("Supprimer")}</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>{t("Avantage 2")}</td>
                <td>
                  <ul className="flex align-items-center gap-2">
                    <li>{t("Départ tardif")}</li>
                    <span>
                      <Dot />
                    </span>
                    <li>{t("Internet haut débit")}</li>
                    <span>
                      <Dot />
                    </span>
                    <li>{t("Enregistrement tardif")}</li>
                  </ul>
                </td>
                <td>{t("2 plan tarifaire")}</td>
                <td className=" buttons">
                  <button className="edit" title={t("Modifier")}>
                    <PencilSquare
                      size={20}
                      onClick={() => setOpenModal(true)}
                    />{" "}
                    <span className="tooltiptext">{t("Modifier")}</span>
                    <Modal open={openModal}>
                      <ModalAdvantages handleCloseModal={setOpenModal} />
                    </Modal>
                  </button>
                  <button className="delete" title={t("Supprimer")}>
                    <Trash size={20} />{" "}
                    <span className="tooltiptext">{t("Supprimer")}</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>{t("Avantage 3")}</td>
                <td>
                  <ul className="flex align-items-center gap-2">
                    <li>{t("Séjour pour animaux de compagnie")}</li>
                  </ul>
                </td>
                <td>{t("0 plan tarifaire")}</td>
                <td className=" buttons">
                  <button className="edit" title={t("Modifier")}>
                    <PencilSquare
                      size={20}
                      onClick={() => setOpenModal(true)}
                    />{" "}
                    <span className="tooltiptext">{t("Modifier")}</span>
                    <Modal open={openModal}>
                      <ModalAdvantages handleCloseModal={setOpenModal} />
                    </Modal>
                  </button>
                  <button className="delete" title={t("Supprimer")}>
                    <Trash size={20} />{" "}
                    <span className="tooltiptext">{t("Supprimer")}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
