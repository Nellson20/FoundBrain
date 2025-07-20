import { Images, PlusCircle } from "react-bootstrap-icons";
import "./Accommodations.scss";
import TextViewMore from "../../components/TextViewMore/TextViewMore";
import { Link } from "react-router-dom";

const Accommodations = () => {
  return (
    <div id="accommodation">
      <div className="accommodation-head flex align-items-center">
        <h2>Hébergements</h2>
        <Link to="/hotels/:hotelId/hebergements/nouveau/informations">
          <button className="btn-purple">Crée un mouvel hébergement</button>
        </Link>
      </div>
      <div className="accommodation-list flex gap-20 ">
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_0.jpg" alt="room" />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>Chambre double</h4>
                <p>(123564684)</p>
              </div>
              <p>
                Nombre maximum de personnes: <span>7 personnes</span>
              </p>
              <p>
                Nombre d'adultes maximum: <span>7 adultes</span>
              </p>
              <p>
                Nombre d'enfants maximum: <span>6 enfants</span>
              </p>
              <p>
                Nombre d'hébergement de ce type: <span>10</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">Modifier</div>
              <div className="btn-">Supprimer</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_1.jpg" alt="room" />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>Chambre double</h4>
                <p>(123564684)</p>
              </div>
              <p>
                Nombre maximum de personnes: <span>7 personnes</span>
              </p>
              <p>
                Nombre d'adultes maximum: <span>7 adultes</span>
              </p>
              <p>
                Nombre d'enfants maximum: <span>6 enfants</span>
              </p>
              <p>
                Nombre d'hébergement de ce type: <span>10</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">Modifier</div>
              <div className="btn-">Supprimer</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_2.jpg" alt="room" />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>Chambre double</h4>
                <p>(123564684)</p>
              </div>
              <p>
                Nombre maximum de personnes: <span>7 personnes</span>
              </p>
              <p>
                Nombre d'adultes maximum: <span>7 adultes</span>
              </p>
              <p>
                Nombre d'enfants maximum: <span>6 enfants</span>
              </p>
              <p>
                Nombre d'hébergement de ce type: <span>10</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">Modifier</div>
              <div className="btn-">Supprimer</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="accommodation-item elevated-card">
          <div className="image">
            <img src="/img/other/chambre_3.jpg" alt="room" />
          </div>
          <div className="description">
            <div>
              <div className="nom">
                <h4>Chambre double</h4>
                <p>(123564684)</p>
              </div>
              <p>
                Nombre maximum de personnes: <span>7 personnes</span>
              </p>
              <p>
                Nombre d'adultes maximum: <span>7 adultes</span>
              </p>
              <p>
                Nombre d'enfants maximum: <span>6 enfants</span>
              </p>
              <p>
                Nombre d'hébergement de ce type: <span>10</span>
              </p>
            </div>
            <div className="buttons flex gap-5 mt-20">
              <div className="btn-">Modifier</div>
              <div className="btn-">Supprimer</div>
              <div className="btn-purple">
                <Images size={20} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="ajout">
          <div className="btn-purple">
            <h3>Crée un mouvel hébergement</h3>
            <PlusCircle size={30} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Accommodations;
