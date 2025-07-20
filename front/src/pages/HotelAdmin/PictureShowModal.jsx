import { ChevronLeft, ChevronRight, X } from "react-bootstrap-icons";
import "./PictureShowModal.scss";
import CheckBox from "../../components/CheckBox/CheckBox";
import { useState } from "react";

const PictureShowModal = ({ srcImg, handleCloseModal }) => {
    const [inputValue, setInputValue] = useState('');
  const [keywordsList, setKeywordsList] = useState(["Chambre", "Cuisine", "Television et multimedia"]);
  const handleSubmitKeyWord = (e) => {
    e.preventDefault()
    setKeywordsList([...keywordsList, inputValue]);
    setInputValue('');
 };
 const handleDeleteKeyword = (index) => {
    setKeywordsList(list => {
        const newList = [...list]; // Créez une copie du tableau d'origine
        newList.splice(index, 1); // Supprimez l'élément à l'index spécifié
        return newList; // Mettez à jour l'état avec le nouveau tableau
    });
};
  return (
    <div className="picture-show-modal elevated-card">
      <div className="left">
        <div className="image">
          <div className="banner"></div>
          <img src={srcImg} alt="" />
        </div>
        <div className="prev-slide-btn">
          <ChevronLeft size={20} />
        </div>
        <div className="next-slide-btn">
          <ChevronRight size={20} />
        </div>
      </div>
      <div className="right">
        <div className="head flex justify-content-end">
          <div
            className="close"
            onClick={() => handleCloseModal({ open: false, src: "" })}
          >
            <X size={30} />
          </div>
        </div>
        <div className="body">
          <div className="flex gap-5">
            <CheckBox checked={true} />
            <label htmlFor="">
              Inclure cette photo dans ma galerie principale{" "}
            </label>
          </div>
          <div className="keywords mt-15">
            <h3>
              Associez des mots-clés à cette image pour la décrire au mieux
            </h3>
            <form className="input" onSubmit={handleSubmitKeyWord}>
              <input
                type="text"
                placeholder="ex: Cuisine, Bibliotheque, Chambre,..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} 
              />
            </form>
            <div className="list mt-15">
              <ul>
                {keywordsList.map((keyword, i) => (
                  <li key={i}><X size={25} onClick={()=>handleDeleteKeyword(i)}/> <span>{keyword}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="accommodation-type mt-15">
            <h3>Sélectionnez l'hébergement que la photo représente</h3>
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="">Chambre Double</label>
            </div>
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="">Chambre Simple</label>
            </div>
          </div>
        </div>
        <div className="bottom">
          <button className="btn-purple">Terminer</button>
        </div>
      </div>
    </div>
  );
};

export default PictureShowModal;
