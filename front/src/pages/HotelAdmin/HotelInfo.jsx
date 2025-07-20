import { Link } from "react-router-dom";
import "./HotelInfo.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import LocationSelector from "../../components/LocationSelector/LocationSelector";

const HotelInfo = () => {
    const [changeName, setChangeName] = useState(false)
    const inputRef = useRef(null);

  useEffect(() => {
    if (changeName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [changeName]);
  return (
    <div id="hotel-info">
      <h2 className="py-15">Infos sur l'hotel</h2>
      <div className="elevated-card p-15">
        <div className="info">
          <h3>Nom de l'établissement :</h3>
          <input className={changeName ? "active" : ""} type="text" defaultValue="Hotel Name" disabled={!changeName} ref={inputRef} /> <br />
          <Link to="#" onClick={()=>setChangeName(true)}>Changer le nom de l'établissement</Link>
        </div>
        <hr />
        <div className="info">
          <h3>Adresse de l'établissement :</h3>
          <span>Ankorahotra</span>
        </div>
        <hr />
        <div className="info">
          <h3>Emplacement de l'établissement :</h3>
          <span>
            -18.9049298, 47.506462 (sur <Link to="https://www.google.com/maps?q=-18.9049298,47.506462" target="blank">Google Maps</Link> et{" "}
            <Link>OpenStreetMap</Link>)
          </span>
          {/* <LocationSelector /> */}
        </div>
        <hr />
        <div className="info">
          <h3>Statut de l'hébergement:</h3>
          <span className="status close">Fermé / Non réservable</span>
        </div>
      </div>
      <h2 className="py-15">Sélection du type d'hôte</h2>
      <div className="type elevated-card p-15">
        <p>Pour respecter les règles de protection des consommateurs, nous devons demander à nos partenaires les informations suivantes. Cela nous permettra d'informer les clients sur la nature professionnelle ou privée de l'établissement qu'ils ont réservé.</p>

        <h3>Sélectionnez l'option qui semble être la plus pertinente pour vous.</h3>

        <div className="option flex gap-10">
            <input type="radio" name="option" id="pro" />
            <label htmlFor="pro">
                <h4>Hôte professionnel</h4>
                <span>Mise en location d'un ou plusieurs hébergement(s) dans le cadre de ma profession ou de mon activité commerciale. Exemples : il s'agit de mon activité principale, je travaille dans une société de gestion immobilière, je perçois la TVA, mon entreprise possède une raison sociale, etc.</span>
            </label>
        </div>
        <div className="option flex gap-10">
            <input type="radio" name="option" id="individual" />
            <label htmlFor="individual">
                <h4>Particulier / hôte non professionnel</h4>
                <span>Mise en location d'un ou plusieurs hébergement(s) en dehors de ma profession ou de toute activité commerciale. Exemples : il s'agit d'une activité complémentaire, je loue mon logement occasionnellement, etc.</span>
            </label>
        </div>
        <button className="btn-purple">Mettre a jour mes informations</button>
      </div>
    </div>
  );
};
export default HotelInfo;
