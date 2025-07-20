import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import Tab from "../../components/Tabs/Tab";
import Tabs from "../../components/Tabs/Tabs";
import "./ProfileRecommandation.scss";
import TextViewMore from "../../components/TextViewMore/TextViewMore";
import {
  ChatDots,
  ChevronDown,
  PencilSquare,
  ThreeDots,
  X,
} from "react-bootstrap-icons";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import DropDown from "../../components/DropDown/DropDown";

const Formulaire = ({ isRecommander = false, setOpen }) => {
  return (
    <form>
      <div className="head flex justify-content-between">
        <h3 className="titre">
          {isRecommander
            ? "Rédiger une recommandation pour Harena"
            : "Demandez à Harena de vous recommander"}
        </h3>
        <div className="close" onClick={() => setOpen(false)}>
          <div className="close">
            <X size={30} />
          </div>
        </div>
      </div>
      <div className="body">
        <span>
          {isRecommander
            ? "Cette recommandation s’affichera sur le profil de Harena"
            : "Personnaliser votre demande"}
        </span>
        <small>Tout les champs sont obligatoir</small>
        {!isRecommander && <h2>Comment connaissez vous Harena ?</h2>}
        <div className="relation">
          <label>Niveau de relation</label>
          <div
            tabIndex={0}
            className="select flex justify-content-between align-items-center"
          >
            <span>Veuiller sélectionner</span>
            <ChevronDown />
          </div>
        </div>
        {!isRecommander && (
          <div className="poste">
            <label>Poste à l'époque</label>
            <div tabIndex={0} className="select flex justify-content-between">
              <span>Veuiller sélectionner</span>
              <ChevronDown />
            </div>
          </div>
        )}
        <div className="message">
          <label htmlFor="message">
            {isRecommander
              ? "Ajouter une recommandation"
              : "Redige votre message"}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={
              isRecommander ? "Rédigez votre recommandation ici ..." : ""
            }
          >
            {isRecommander
              ? ""
              : "Bonjour Harena, pourriez-vous m’écrire une recommandation ?"}
          </textarea>
        </div>
      </div>
      <div className="footer">
        <button className="btn-purple">Envoyer</button>
      </div>
    </form>
  );
};

const ModalRecommander = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li onClick={() => setOpen(true)}>
        <Link>
          <ChatDots size={20} />
          Recommander
        </Link>
      </li>
      <Modal open={open} className="modal-recommandations">
        <Formulaire isRecommander={true} setOpen={setOpen} />
      </Modal>
    </>
  );
};
const ModalSolliciter = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li onClick={() => setOpen(true)}>
        <Link>
          <PencilSquare size={20} />
          Solliciter une recommandation
        </Link>
      </li>
      <Modal open={open} className="modal-recommandations">
        <Formulaire setOpen={setOpen} />
      </Modal>
    </>
  );
};
const ProfileRecommandation = () => {
  return (
    <div id="profile-recommandation">
      <div className="top flex justify-content-between align-items-center">
        <h3>Recommandations</h3>
        <DropDown>
          <div className="three-dots">
            <ThreeDots size={25} />
          </div>
          <ul>
            <ModalSolliciter />
            <ModalRecommander />
          </ul>
        </DropDown>
      </div>
      <div className="body">
        <Tabs className="recommandation-tabs">
          <Tab
            title={
              <>
                <span>Reçues (10)</span>
              </>
            }
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (number,i) => (
                <div className="recommandation-tabs" key={i}>
                  <div className="recommandation-item flex gap-5">
                    <div className="left flex gap-5">
                      <Avatar width={50} height={50} />
                      <div className="info">
                        <h4>John Doe</h4>
                        <span>Administateur Reseau</span>
                        <small>
                          8 fevrier 2023, John Doe etait un client de Harena
                        </small>
                      </div>
                    </div>
                    <div className="right">
                      <TextViewMore>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Doloribus, reprehenderit qui! Natus facilis
                        aliquam eveniet in id eligendi unde totam aperiam quis.
                        Sit eligendi excepturi exercitationem ab doloremque
                        dicta dignissimos? Perferendis totam quaerat repellat
                        iusto itaque ipsum esse laborum ipsa facere asperiores
                        autem officiis animi adipisci nesciunt, officia dolores
                        voluptatibus magnam hic quasi! Eum laborum commodi
                        maiores obcaecati corporis inventore. Blanditiis, nisi?
                        Accusantium fugiat facilis repellendus nisi quod
                        reiciendis quibusdam? Labore itaque dolor placeat atque.
                        Repellendus unde accusamus beatae natus sit in, corrupti
                        sapiente. Officiis possimus sunt molestias nemo
                        architecto. Repudiandae pariatur ex, facilis fuga
                        doloremque impedit? Aliquid officiis vero tempora ea,
                        cum sequi recusandae voluptates nisi facere, sint esse!
                        Blanditiis eligendi aliquid quod aut ad in hic debitis
                        aliquam.
                      </TextViewMore>
                    </div>
                  </div>
                </div>
              )
            )}
          </Tab>
          <Tab
            title={
              <>
                <span>Données (2)</span>
              </>
            }
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (_,number) => (
                <div className="recommandation-tabs" key={number}>
                  <div className="recommandation-item flex gap-5">
                    <div className="left flex gap-5">
                      <Avatar width={50} height={50} />
                      <div className="info">
                        <h4>John Doe</h4>
                        <span>Administateur Reseau</span>
                        <small>
                          8 fevrier 2023, John Doe etait un client de Harena
                        </small>
                      </div>
                    </div>
                    <div className="right">
                      <TextViewMore>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Doloribus, reprehenderit qui! Natus facilis
                        aliquam eveniet in id eligendi unde totam aperiam quis.
                        Sit eligendi excepturi exercitationem ab doloremque
                        dicta dignissimos? Perferendis totam quaerat repellat
                        iusto itaque ipsum esse laborum ipsa facere asperiores
                        autem officiis animi adipisci nesciunt, officia dolores
                        voluptatibus magnam hic quasi! Eum laborum commodi
                        maiores obcaecati corporis inventore. Blanditiis, nisi?
                        Accusantium fugiat facilis repellendus nisi quod
                        reiciendis quibusdam? Labore itaque dolor placeat atque.
                        Repellendus unde accusamus beatae natus sit in, corrupti
                        sapiente. Officiis possimus sunt molestias nemo
                        architecto. Repudiandae pariatur ex, facilis fuga
                        doloremque impedit? Aliquid officiis vero tempora ea,
                        cum sequi recusandae voluptates nisi facere, sint esse!
                        Blanditiis eligendi aliquid quod aut ad in hic debitis
                        aliquam.
                      </TextViewMore>
                    </div>
                  </div>
                </div>
              )
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileRecommandation;
