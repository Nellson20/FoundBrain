import { ChevronLeft, ChevronRight, X } from "react-bootstrap-icons";
import "./PictureShowModal.scss";
import CheckBox from "../../components/CheckBox/CheckBox";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PictureShowModal = ({ srcImg, handleCloseModal }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [keywordsList, setKeywordsList] = useState([
    t("Bedroom"), 
    t("Kitchen"), 
    t("Television and multimedia")
  ]);

  const handleSubmitKeyWord = (e) => {
    e.preventDefault()
    setKeywordsList([...keywordsList, inputValue]);
    setInputValue('');
  };

  const handleDeleteKeyword = (index) => {
    setKeywordsList(list => {
      const newList = [...list];
      newList.splice(index, 1);
      return newList;
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
              {t("Include this photo in my main gallery")}
            </label>
          </div>
          <div className="keywords mt-15">
            <h3>
              {t("Associate keywords with this image to best describe it")}
            </h3>
            <form className="input" onSubmit={handleSubmitKeyWord}>
              <input
                type="text"
                placeholder={t("e.g.: Kitchen, Library, Bedroom,...")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </form>
            <div className="list mt-15">
              <ul>
                {keywordsList.map((keyword, i) => (
                  <li key={i}>
                    <X size={25} onClick={() => handleDeleteKeyword(i)} />{" "}
                    <span>{keyword}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="accommodation-type mt-15">
            <h3>{t("Select the accommodation this photo represents")}</h3>
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="">{t("Double Room")}</label>
            </div>
            <div className="flex gap-5">
              <CheckBox />
              <label htmlFor="">{t("Single Room")}</label>
            </div>
          </div>
        </div>
        <div className="bottom">
          <button className="btn-purple">{t("Finish")}</button>
        </div>
      </div>
    </div>
  );
};

export default PictureShowModal;
