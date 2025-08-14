import { GeoAltFill, PlusLg, ThreeDots } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const Residences = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="residences">
        <div className="flex align-items-center justify-content-between">
          <h4>{t("Places of residence")}</h4>
          {/* <button className="btn btn-transparent">
            <PlusLg size={16} />
          </button> */}
          <div className="btn add-ville-btn flex align-items-center gap-10">
            <button className="btn btn-transparent">
              <PlusLg /> <span>{t("Add a city")}</span>
            </button>
          </div>
        </div>

        <ul>
          <li className="flex gap-10">
            <div className="ico">
              <GeoAltFill size={16} />
            </div>
            <div className="flex-grow-1 flex gap-10">
              <div className="flex-grow-1">
                <small>{t("Hometown")}</small>
                <p>Antananarivo</p>
              </div>
              <div>
                <button className="btn btn-transparent">
                  <ThreeDots size={16} />
                </button>
              </div>
            </div>
          </li>
          <li className="flex gap-10">
            <div className="ico">
              <GeoAltFill size={16} />
            </div>
            <div className="flex-grow-1 flex gap-10">
              <div className="flex-grow-1">
                <small>{t("Current city")}</small>
                <p>Antsiranana, Madagascar</p>
              </div>
              <div>
                <button className="btn btn-transparent">
                  <ThreeDots size={16} />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Residences;
