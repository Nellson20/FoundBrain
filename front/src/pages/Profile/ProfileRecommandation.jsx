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
import { useTranslation } from "react-i18next";

const Formulaire = ({ isRecommander = false, setOpen }) => {
  const { t } = useTranslation();

  return (
    <form>
      <div className="head flex justify-content-between">
        <h3 className="titre">
          {isRecommander
            ? t("Write a recommendation for Harena")
            : t("Ask Harena to recommend you")}
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
            ? t("This recommendation will be displayed on Harena's profile")
            : t("Customize your request")}
        </span>
        <small>{t("All fields are required")}</small>
        {!isRecommander && <h2>{t("How do you know Harena?")}</h2>}
        <div className="relation">
          <label>{t("Level of relationship")}</label>
          <div
            tabIndex={0}
            className="select flex justify-content-between align-items-center"
          >
            <span>{t("Please select")}</span>
            <ChevronDown />
          </div>
        </div>
        {!isRecommander && (
          <div className="poste">
            <label>{t("Position at the time")}</label>
            <div tabIndex={0} className="select flex justify-content-between">
              <span>{t("Please select")}</span>
              <ChevronDown />
            </div>
          </div>
        )}
        <div className="message">
          <label htmlFor="message">
            {isRecommander
              ? t("Add a recommendation")
              : t("Write your message")}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={
              isRecommander ? t("Write your recommendation here ...") : ""
            }
          >
            {isRecommander
              ? ""
              : t("Hello Harena, could you please write me a recommendation?")}
          </textarea>
        </div>
      </div>
      <div className="footer">
        <button className="btn-purple">{t("Send")}</button>
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
          {t("Recommend")}
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
          {t("Request a recommendation")}
        </Link>
      </li>
      <Modal open={open} className="modal-recommandations">
        <Formulaire setOpen={setOpen} />
      </Modal>
    </>
  );
};
const ProfileRecommandation = () => {
  const { t } = useTranslation();

  return (
    <div id="profile-recommandation">
      <div className="top flex justify-content-between align-items-center">
        <h3>{t("Recommendations")}</h3>
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
                <span>{t("Received (10)")}</span>
              </>
            }
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (number, i) => (
                <div className="recommandation-tabs" key={i}>
                  <div className="recommandation-item flex gap-5">
                    <div className="left flex gap-5">
                      <Avatar width={50} height={50} />
                      <div className="info">
                        <h4>{t("John Doe")}</h4>
                        <span>{t("Network Administrator")}</span>
                        <small>
                          {t(
                            "February 8, 2023, John Doe was a client of Harena"
                          )}
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
                <span>{t("Given (2)")}</span>
              </>
            }
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (_, number) => (
                <div className="recommandation-tabs" key={number}>
                  <div className="recommandation-item flex gap-5">
                    <div className="left flex gap-5">
                      <Avatar width={50} height={50} />
                      <div className="info">
                        <h4>{t("John Doe")}</h4>
                        <span>{t("Network Administrator")}</span>
                        <small>
                          {t(
                            "February 8, 2023, John Doe was a client of Harena"
                          )}
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
