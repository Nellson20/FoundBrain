import React, { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import {
  InfoCircleFill,
  PlusLg,
  QuestionCircle,
  QuestionLg,
  ThreeDots,
  Trash,
  Search,
  X,
} from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import "./Access.scss";
import Modal from "../../components/Modal/Modal";
import useInfiniteScroll from "../../Hooks/useInfiniteScroll";
import AccessTypes from "../../constants/AccessTypes";
import Searchbar from "../../components/Searchbar/Searchbar";
import { useTranslation } from "react-i18next";

const ModalAccess = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { portalId } = useParams();
  const [access, setAccess] = useState({
    user: null,
    company: `/companies/${portalId}`,
    type: "ADMIN",
  });

  return (
    <>
      <button className="btn btn-purple" onClick={() => setOpen(true)}>
        <PlusLg />
        <span>{t("Ajouter")}</span>
      </button>

      <Modal open={open} className={"modal-access"}>
        <div className="modal-access-container">
          <div className="head flex justify-content-between">
            <h1>{t("Créer un accès à mon portail")}</h1>
            <div className="close" onClick={() => setOpen(false)}>
              <div className="close">
                <X size={25} />
              </div>
            </div>
          </div>
          <div className="corps">
            <div className="p-10">
              {access.user ? (
                <div className="selectionner flex justify-content-between align-items-center">
                  <div className="person flex align-items-center p-5 gap-10">
                    <Avatar
                      src={access.user.activeProfilePicture?.fileUrl}
                      width={40}
                      height={40}
                    />
                    <div className="apropos">
                      <h2 className="nom text-ellipsis">{access.user.firstName}</h2>
                      <small className="text-ellipsis">
                        {t("Develosmallpeur React")}
                      </small>
                    </div>
                  </div>
                  <div
                    className="trash"
                    onClick={() => setAccess((prev) => ({ ...prev, user: null }))}
                  >
                    <Trash size={18} />
                  </div>
                </div>
              ) : (
                <Searchbar
                  placeholder={t("Rechercher un utilisateur")}
                  suggestUrl={`${process.env.REACT_APP_API_DOMAIN}/users`}
                  queryKey={["searchUserSuggest"]}
                  suggest={true}
                  mapSuggests={(user) => (
                    <div
                      onClick={() => setAccess((prev) => ({ ...prev, user }))}
                      className="user-suggest-item flex align-items-center gap-10"
                    >
                      <Search />
                      <Avatar
                        src={user.activeProfilePicture?.fileUrl}
                        height={40}
                        width={40}
                      />
                      <b>
                        {user.firstName}
                        {user.lastName && " " + user.lastName}
                      </b>
                    </div>
                  )}
                />
              )}
            </div>
            <div className="roles">
              <div className="questions flex align-items-center">
                <b>{t("Attribuer un rôle d'administrateur")}</b>
                <span>
                  <QuestionLg />
                </span>
              </div>
              <div className="admin-types items">
                <div className="item flex gap-10">
                  <input
                    type="radio"
                    defaultChecked
                    id="adminType"
                    value="ADMIN"
                    onChange={(e) =>
                      setAccess((prev) => ({ ...prev, type: e.target.value }))
                    }
                    name="accessType"
                  />
                  <label htmlFor="adminType">
                    <div className="text">
                      <h2>{t("Super administrateur")}</h2>
                      <small>
                        {t(
                          "Ce role permet de tout gerer sur la Page. C'est le seul role qui peut modifier la Page et gerer tous les administrateurs."
                        )}
                      </small>
                    </div>
                  </label>
                </div>
                <div className="item flex gap-10">
                  <input
                    type="radio"
                    id="editorType"
                    value="EDITOR"
                    onChange={(e) =>
                      setAccess((prev) => ({ ...prev, type: e.target.value }))
                    }
                    name="accessType"
                  />
                  <label htmlFor="editorType">
                    <div className="text">
                      <h2>{t("Éditeur de contenu")}</h2>
                      <small>
                        {t(
                          "Ce role publie et gere le contenu et les commentaires en tant que Page et exporte les statiques."
                        )}
                      </small>
                    </div>
                  </label>
                </div>
                <div className="item flex gap-10">
                  <input
                    type="radio"
                    id="analystType"
                    value="ANALYST"
                    onChange={(e) =>
                      setAccess((prev) => ({ ...prev, type: e.target.value }))
                    }
                    name="accessType"
                  />
                  <label htmlFor="analystType">
                    <div className="text">
                      <h2>{t("Analyste")}</h2>
                      <small>
                        {t(
                          "Ce role peut uniquement consulter et exporter les statistiques sur LinkedIn et aura un acces limite sur les outils partenaires tiers."
                        )}
                      </small>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="foot">
            <button className="btn btn-purple">{t("Enregistrer")}</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Access = () => {
  const { t } = useTranslation();
  const { portalId } = useParams();

  const {
    data: accesses,
    flatData: accessesFlat,
    error,
    hasNextPage: accessesNextPage,
    isFetching: accessesFetching,
    isFetchingNextPage: accessesFetchingNextPage,
    status: accessesLoadingStatus,
    refetch,
    refetchPage,
  } = useInfiniteScroll({
    url: `${process.env.REACT_APP_API_DOMAIN}/companies/${portalId}/accesses`,
    ipp: 10,
    queryKey: ["portalAccess", portalId],
  });

  return (
    <div id="portal-access">
      <div className="heading flex justify-content-between">
        <h1>{t("Accès a mon portail")}</h1>
        <ModalAccess />
      </div>
      <div className="access-container mt-15">
        <div className="access-list">
          <div className="top flex align-items-center">
            <div className="flex-grow-1">
              <h4>{t("Utilisateur")}</h4>
            </div>
            <div className="flex-grow-1">
              <h4>{t("Rôle")}</h4>
            </div>
            <div></div>
          </div>

          {accessesFetching && !accessesFetchingNextPage ? (
            <>
              <h1>{t("Loading")}</h1>
            </>
          ) : error ? (
            <p>
              {t("Error")}: {error.message}
            </p>
          ) : accesses?.pages[0]?.data?.length > 0 ? (
            accesses?.pages?.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((access, i) => (
                  <div key={i} className="access-list-item flex">
                    <div className="flex align-items-center gap-10 flex-grow-1">
                      <Avatar
                        src={access.user.activeProfilePicture?.fileUrl}
                        height={45}
                        width={45}
                      />
                      <div>
                        <Link className="user-name">{access.user.firstName}</Link>
                        <small>{t("Vous")}</small>
                      </div>
                    </div>
                    <div className="flex align-items-center flex-grow-1">
                      <span>{AccessTypes[access.type]}</span>
                    </div>
                    <div></div>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="empty-job flex flex-column justify-content-center align-items-center gap-5">
              <h4>{t("Aucun contact en attente")}</h4>
              <p className="text-center">
                {t(
                  "Nous vous invitons à créer une première offre d'emplois pour commencer le recrutement pour votre entreprise"
                )}
              </p>
              <Link to="/emplois/nouveau" className="btn btn-gradient">
                {t("Prendre contact")}
              </Link>
            </div>
          )}
          {accessesFetchingNextPage ? (
            <h1>{t("Loading")}</h1>
          ) : accessesNextPage ? (
            ""
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Access;
