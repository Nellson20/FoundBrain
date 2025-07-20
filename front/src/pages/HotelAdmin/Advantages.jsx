import { Dot, PencilSquare, Trash } from "react-bootstrap-icons";
import "./Advantages.scss";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import ModalAdvantages from "./ModalAdvantages";

const Advantages = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div id="advantages">
      <h2 className="mt-15"> Les Avantages</h2>
      <p>
        Vous avez la possibilité de lier jusqu'à 5 Avantages à chaque plan
        tarifaire. Une fois qu'ils sont associés, ces Avantages seront
        disponibles pour les clients.
      </p>
      <div className="avantage-container elevated-card mt-15">
        <div className="head flex align-items-center justify-content-between p-15">
          <h3>Vos Avantages</h3>
          <button
            className="btn-purple"
            onClick={() => setOpenModalCreate(true)}
          >
            Crée des Avantages
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
                <th>Nom des avantages</th>
                <th>Avantages proposées</th>
                <th>Liés aux plans tarifaires</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Avantage 1</td>
                <td>
                  <ul className="flex align-items-center gap-2">
                    <li>Départ tardif</li>
                    <span>
                      <Dot />
                    </span>
                    <li>Internet haut débit</li>
                    <span>
                      <Dot />
                    </span>
                    <li>Parking</li>
                    <span>
                      <Dot />
                    </span>
                    <li>Bouteille de vin</li>
                    <span>
                      <Dot />
                    </span>
                    <li>Enregistrement tardif</li>
                  </ul>
                </td>
                <td>0 plan tarifaire</td>
                <td className=" buttons">
                  <button className="edit" title="Modifier">
                    <PencilSquare
                      size={20}
                      onClick={() => setOpenModal(true)}
                    />{" "}
                    <span className="tooltiptext">Modifier</span>
                    <Modal open={openModal}>
                      <ModalAdvantages handleCloseModal={setOpenModal} />
                    </Modal>
                  </button>
                  <button className="delete" title="Supprimer">
                    <Trash size={20} />{" "}
                    <span className="tooltiptext">Supprimer</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Avantage 2</td>
                <td>
                  <ul className="flex align-items-center gap-2">
                    <li>Départ tardif</li>
                    <span>
                      <Dot />
                    </span>
                    <li>Internet haut débit</li>
                    <span>
                      <Dot />
                    </span>

                    <li>Enregistrement tardif</li>
                  </ul>
                </td>
                <td>2 plan tarifaire</td>
                <td className=" buttons">
                  <button className="edit" title="Modifier">
                    <PencilSquare
                      size={20}
                      onClick={() => setOpenModal(true)}
                    />{" "}
                    <span className="tooltiptext">Modifier</span>
                    <Modal open={openModal}>
                      <ModalAdvantages handleCloseModal={setOpenModal} />
                    </Modal>
                  </button>
                  <button className="delete" title="Supprimer">
                    <Trash size={20} />{" "}
                    <span className="tooltiptext">Supprimer</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Avantage 3</td>
                <td>
                  <ul className="flex align-items-center gap-2">
                    <li>Séjour pour animaux de compagnie</li>
                  </ul>
                </td>
                <td>0 plan tarifaire</td>
                <td className=" buttons">
                  <button className="edit" title="Modifier">
                    <PencilSquare
                      size={20}
                      onClick={() => setOpenModal(true)}
                    />{" "}
                    <span className="tooltiptext">Modifier</span>
                    <Modal open={openModal}>
                      <ModalAdvantages handleCloseModal={setOpenModal} />
                    </Modal>
                  </button>
                  <button className="delete" title="Supprimer">
                    <Trash size={20} />{" "}
                    <span className="tooltiptext">Supprimer</span>
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
