import React from "react";
import { CardImage, Eye, ThreeDots } from "react-bootstrap-icons";
import "./PictureCard.scss";
import CheckBox from "../../components/CheckBox/CheckBox";
import { Link } from "react-router-dom";
import DropDown from "../../components/DropDown/DropDown";
import NavigableList from "../Input/NavigableList/NavigableList";
export const PictureCard = ({ path, checked, onChange, onClick }) => {
  return (
    <div className="picture-card" onClick={onClick}>
      <div className="banner"></div>
      <div className="img">
        <img src={path} alt="chambre" />
      </div>
      <div className="actions">
        <div className="top">
          <div
            className="checkbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckBox checked={checked} onChange={onChange} />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DropDown>
              <Link>
                <div className="options">
                  <ThreeDots size={20} />
                </div>
              </Link>
              <NavigableList startIndex={0}>
                <Link>Modifier</Link>
                <Link>Definir comme photo d'accroche préférée</Link>
                <Link>Supprimer</Link>
              </NavigableList>
            </DropDown>
          </div>
        </div>
        <div className="center">
          <Eye size={30} />
        </div>
      </div>
    </div>
  );
};
export const AddPictureCard = () => {
  return (
    <div className="add-picture-card flex align-items-center justify-content-center flex-column gap-15">
      <div className="banner"></div>
      <div className="icon">
        <CardImage size={30} />
      </div>
      <span>Ajouter</span>
    </div>
  );
};
