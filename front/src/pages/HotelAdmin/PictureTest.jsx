import React, { useState } from "react";
import { CardImage, Eye, ThreeDots } from "react-bootstrap-icons";
import "./Pictures.scss";
import CheckBox from "../../components/CheckBox/CheckBox";
import { Link } from "react-router-dom";
import DropDown from "../../components/DropDown/DropDown";

const PictureCard = ({ path, checked, onChange }) => {
 return (
    <div className="picture">
      <div className="banner"></div>
      <div className="img">
        <img src={path} alt="chambre" />
      </div>
      <div className="actions">
        <div className="top">
          <CheckBox checked={checked} onChange={onChange} />
          <DropDown>
            <Link>
              <div className="options">
                <ThreeDots size={20} />
              </div>
            </Link>
            <ul>
              <li>
                <Link>Modifier</Link>
              </li>
              <li>
                <Link>Definir comme photo d'accroche préférée</Link>
              </li>
              <li>
                <Link>Supprimer</Link>
              </li>
            </ul>
          </DropDown>
        </div>
        <div className="center">
          <Eye size={30} />
        </div>
      </div>
    </div>
 );
};

const Pictures = () => {
 const [checkedStates, setCheckedStates] = useState({
    doubleRoom: [
      { path: "/img/other/chambre_0.jpg", checked: false },
      { path: "/img/other/chambre_1.jpg", checked: false },
    ],
    singleRoom: [{ path: "/img/other/chambre_2.jpg", checked: false }],
    other: [
      { path: "/img/other/chambre_3.jpg", checked: false },
      { path: "/img/other/chambre_4.jpg", checked: false },
      { path: "/img/other/chambre_5.jpg", checked: false },
      { path: "/img/other/chambre_6.jpg", checked: false },
      { path: "/img/other/chambre_7.jpg", checked: false },
    ],
 });

 const handleCheckChange = (type, index) => {
    setCheckedStates(prevState => {
      const newState = { ...prevState };
      newState[type][index].checked = !newState[type][index].checked;
      return newState;
    });
 };

 return (
    <div id="galery-pictures">
      <h2 className="py-15">Photos de l'établissement</h2>
      <div className="elevated-card p-15">
        <h3>Galerie principale</h3>
        <div className="Gallery-container flex flex-wrap gap-15 mt-15">
          {Object.entries(checkedStates).map(([key, value]) => (
            <React.Fragment key={key}>
              {value.map((image, index) => (
                <PictureCard
                 key={index}
                 path={image.path}
                 checked={image.checked}
                 onChange={() => handleCheckChange(key, index)}
                />
              ))}
            </React.Fragment>
          ))}
          <AddPictureCard />
        </div>
      </div>
      {/* Reste du code */}
    </div>
 );
};

export default Pictures;
