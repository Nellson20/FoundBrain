import {
  CalendarCheck,
  CalendarX,
  CheckCircleFill,
  CircleFill,
  GraphUpArrow,
  Pencil,
  ThreeDots,
} from "react-bootstrap-icons";
import "./Restrictions.scss";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropDown from "../../components/DropDown/DropDown";
import { Link } from "react-router-dom";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import { useTranslation } from "react-i18next";

const Restrictions = () => {
  const { t } = useTranslation();
  const [ruleActive, setRuleActive] = useState("unsold");
  return (
    <div className="restriction">
      <h2 className="py-15">{t("Règles et restriction dynamiques")}</h2>
      <p>
        {t(
          "Les restrictions sont essentielles pour une gestion efficace de votre entreprise, mais elles peuvent parfois restreindre votre flexibilité et réduire vos opportunités. Cependant, grâce aux règles de restriction dynamiques, ce n'est plus un souci. Vous avez désormais la possibilité d'adapter dynamiquement vos restrictions et vos tarifs en fonction de vos besoins, trouvant ainsi un juste équilibre entre votre taux d'occupation, vos revenus et vos dépenses."
        )}
      </p>
      <div className="rule-list-container elevated-card mt-15">
        <div className="title p-15">
          <h3>{t("Gérez vos règles")}</h3>
        </div>
        <div className="rule-list mt-15">
          <table className="px-15">
            <tr>
              <th>{t("Type de règle")}</th>
              <th>{t("Période")}</th>
              <th>{t("Restrictions")}</th>
              <th>{t("Tarif")}</th>
              <th>{t("Types d'hébergements")}</th>
              <th style={{ width: "180px" }}>{t("Plans tarifaires")}</th>
              <th>{t("Statut de la règle")}</th>
              <th></th>
            </tr>
            <tr>
              <td>{t("Pour les nuitées inaccessibles")}</td>
              <td>{t("7 prochains jours")}</td>
              <td>{t("Durée de séjour minimum : 14 nuits")}</td>
              <td>{t("Augmenter de 54 %")}</td>
              <td>
                <ul>
                  <li>{t("- Double Room")}</li>
                  <li>{t("- Single Room")}</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>{t("- Standard Rate")}</li>
                  <li>{t("- Non-refundable Rate")}</li>
                  <li>{t("- Weekly Rate")}</li>
                </ul>
              </td>
              <td>{t("Activé")}</td>
              <td>
                <DropDown activeClassName="surligné">
                  <Link>
                    <ThreeDots size={20} />
                  </Link>
                  <ul>
                    <li>
                      <a href="#">{t("Modifier")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Désactiver")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Supprimer")}</a>
                    </li>
                  </ul>
                </DropDown>
              </td>
            </tr>
            <tr>
              <td>{t("Pour les nuitées non vendues")}</td>
              <td>{t("7 prochains jours")}</td>
              <td>
                <ul>
                  <li>{t("Durée de séjour minimum : 4 nuits")}</li>
                  <li>{t("Délai min. de réservation avant arrivée : 6H")}</li>
                </ul>
              </td>
              <td>{t("Réduire de 5 %")}</td>
              <td>
                <ul>
                  <li>{t("- Double Room")}</li>
                  <li>{t("- Single Room")}</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>{t("- Standard Rate")}</li>
                  <li>{t("- Non-refundable Rate")}</li>
                  <li>{t("- Weekly Rate")}</li>
                </ul>
              </td>
              <td>{t("Activé")}</td>
              <td>
                <DropDown activeClassName="surligné">
                  <Link>
                    <ThreeDots size={20} />
                  </Link>
                  <ul>
                    <li>
                      <a href="#">{t("Modifier")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Désactiver")}</a>
                    </li>
                    <li>
                      <a href="#">{t("Supprimer")}</a>
                    </li>
                  </ul>
                </DropDown>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="rule-creation-container elevated-card mt-15">
        <div className=" title p-15">
          <h3>{t("Création d'une règle")}</h3>
        </div>
        <div className="rule-creation px-15 mt-15">
          <h4>
            <span>{t("1")}</span>
            {t(
              "Première étape : Choisissez les nuitées pour lesquelles vous souhaitez établir une règle."
            )}
          </h4>
          <div className="overnight-stay flex gap-15 mt-15">
            <div
              className={`item ${ruleActive === "unsold" ? "active" : ""}`}
              onClick={() => setRuleActive("unsold")}
            >
              <div className="check">
                <CheckCircleFill size={17} />
              </div>
              <div className="icon">
                <GraphUpArrow size={30} />
              </div>
              <h3>{t("Nuitées non vendues")}</h3>
              <p>
                {t(
                  "Ces sont des nuitées avec des restrictions qui sont encore disponibles à la vente."
                )}
              </p>
            </div>
            <div
              className={`item ${
                ruleActive === "inaccessibles" ? "active" : ""
              }`}
              onClick={() => setRuleActive("inaccessibles")}
            >
              <div className="check">
                <CheckCircleFill size={17} />
              </div>
              <div className="icon">
                <CalendarX size={30} />
              </div>
              <h3>{t("Nuitées inaccessibles")}</h3>
              <p>
                {t(
                  "Ces nuitées ne peuvent pas être réservées en raison d'une exigence de durée de séjour minimale."
                )}
              </p>
            </div>
          </div>
          <div className="note mt-15">
            <h3>
              {t(
                "Cette règle sera appliquée aux nuitées inaccessibles de la manière suivante."
              )}
            </h3>
            <div>
              <Pencil size={20} />
              <p>
                {t(
                  "En configurant cette règle, vous définissez les ajustements à apporter aux restrictions et aux tarifs pour les nuitées"
                )}
                {ruleActive === "unsold"
                  ? t(" non vendues")
                  : t(" inaccessibles")}{" "}
                {t(
                  "dans une période future que vous aurez déterminée."
                )}
              </p>
            </div>
            <div className="mt-15">
              <CalendarCheck size={20} />
              <p>
                {ruleActive === "unsold"
                  ? t(
                      " Durant cette période, incluant des nuitées non vendues, votre règle s'appliquera aux types d'hébergement et aux plans tarifaires choisis, augmentant ainsi la visibilité de votre établissement pour les clients."
                    )
                  : t(
                      " Durant cette période, incluant des nuitées inaccessibles, votre règle s'appliquera aux types d'hébergement et aux plans tarifaires choisis, permettant ainsi aux clients de réserver ces nuitées."
                    )}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="configuration px-15">
          <h4>
            <span>{t("2")}</span>
            {t("Deuxième étape : Personnalisez votre règle.")}
          </h4>
          <Formik
            initialValues={{
              period: "",
              overnightStay: "",
              delay: "",
              rate: "",
              amount: "",
              AccommodationType: "",
              ratePlan: "",
              ruleStatus: "",
            }}
            validationSchema={Yup.object({
              period: Yup.string().required(t("Required")),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="period">
                  <h3>
                    {t(
                      "Votre règle doit être appliquée à une période à venir déterminée."
                    )}
                  </h3>
                  <small>
                    {t(
                      "Votre règle sera appliquée quotidiennement aux nuitées"
                    )}{" "}
                    {ruleActive === "unsold"
                      ? t("non vendues")
                      : t("inaccessibles")}{" "}
                    {t("dans la période future spécifiée.")}
                  </small>
                  <div className="select">
                    <label htmlFor="period">{t("Periode")}</label>
                    <Field as="select" name="period" id="period">
                      <option value="">{t("Sélectionner")}</option>
                      <option value="3">{t("3 prochains jours")}</option>
                      <option value="7">{t("7 prochains jours")}</option>
                      <option value="14">{t("14 prochains jours")}</option>
                    </Field>
                  </div>
                </div>
                <div className="restriction-rate mt-20">
                  {ruleActive === "unsold" ? (
                    <h3>
                      {t(
                        "Lorsque votre règle est active, les restrictions et les tarifs à appliquer doivent être déterminés."
                      )}
                    </h3>
                  ) : (
                    <>
                      <h3>
                        {t(
                          "Définissez une limite pour la durée de séjour minimum et"
                        )}
                        <br />
                        {t(
                          "indiquez si vous souhaitez une modification tarifaire lors de l'application de la règle."
                        )}
                      </h3>
                      <small>
                        {t(
                          "Votre durée de séjour minimum sera uniquement raccourcie pour correspondre à la durée des nuitées inaccessibles. Elle ne sera jamais plus courte que la limite que vous fixerez ci-dessous."
                        )}
                      </small>
                    </>
                  )}
                  <div className="flex align-items-end gap-20 mt-0">
                    <div className="select">
                      <label htmlFor="">{t("Durée de séjour minimum")}</label>
                      <Field
                        as="select"
                        name="overnightStay"
                        id="overnightStay"
                      >
                        <option value="">{t("Sélectionner")}</option>
                        <option value="1">{t("1 nuitée")}</option>
                        <option value="2">{t("2 nuitée")}</option>
                        <option value="3">{t("3 nuitée")}</option>
                      </Field>
                    </div>
                    {ruleActive === "unsold" && (
                      <div className="select">
                        <label htmlFor="">
                          {t("Délai minimum de réservation avant arrivée")}{" "}
                          <small>({t("facultatif")})</small>
                        </label>
                        <Field as="select" name="delay" id="delay">
                          <option value="">{t("Sélectionner")}</option>
                          <option value="">{t("Aucun")}</option>
                          <option value="1">{t("1 heure")}</option>
                          <option value="4">{t("4 heures")}</option>
                          <option value="6">{t("6 heures")}</option>
                          <option value="12">{t("12 heures")}</option>
                        </Field>
                      </div>
                    )}
                    <div className="select">
                      <label htmlFor="">{t("Modification du tarif")}</label>
                      <Field as="select" name="rate" id="rate">
                        <option value="">{t("Sélectionner")}</option>
                        <option value="currentRate">{t("Utiliser le tarif actuel")}</option>
                        <option value="increase">{t("Augmenter (en pourcentage)")}</option>
                        <option value="decrease">{t("Diminuer (en pourcentage)")}</option>
                      </Field>
                    </div>
                    {(values.rate === "increase" || values.rate === "decrease") && (
                      <div className="select">
                        <label htmlFor="">{t("Montant")}</label>
                        <div className="number">
                          <Field type="number" name="amount" id="amount" />
                          <span>%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="plan-type mt-20">
                  <h3>
                    {t(
                      "Cette règle doit être appliquée à certains types d'hébergements et plans tarifaires."
                    )}
                  </h3>
                  <div className="flex gap-20 mt-10">
                    <div className="accommodation-type">
                      <label htmlFor="">{t("Type d'hebergement")}</label>
                      <div role="group" aria-labelledby="checkbox-group">
                        <div>
                          <label className="flex align-items-center gap-5">
                            <Field
                              type="checkbox"
                              name="AccommodationType"
                              id="AccommodationType"
                              value="chambre double"
                            />
                            <span>{t("Chambre double")}</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex align-items-center gap-5">
                            <Field
                              type="checkbox"
                              name="AccommodationType"
                              id="AccommodationType"
                              value="chambre simple"
                            />
                            <span>{t("Chambre simple")}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="rate-plan">
                      <label htmlFor="">{t("Plan tarifaire")}</label>
                      <div role="group" aria-labelledby="checkbox-group">
                        <div>
                          <label className="flex align-items-center gap-5">
                            <Field
                              type="checkbox"
                              name="ratePlan"
                              id="ratePlan"
                              value="standardRate"
                            />
                            <span>{t("Standard Rate")}</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex align-items-center gap-5">
                            <Field
                              type="checkbox"
                              name="ratePlan"
                              id="ratePlan"
                              value="nonRefundableRate"
                            />
                            <span>{t("Non-refundable Rate")}</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex align-items-center gap-5">
                            <Field
                              type="checkbox"
                              name="ratePlan"
                              id="ratePlan"
                              value="weeklyRate"
                            />
                            <span>{t("Weekly Rate")}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rule-status mt-20">
                  <h3>{t("Indiquez l'état de votre règle : ")}</h3>
                  <div className="mt-10">
                    <label htmlFor="">{t("Status de la règle")}</label>
                    <ul role="group" aria-labelledby="my-radio-group">
                      <li className="flex gap-5">
                        <Field type="radio" name="ruleStatus" value="active" />
                        <span>{t("Activée")}</span>
                      </li>
                      <li>
                        <div className="flex gap-5">
                          <Field
                            type="radio"
                            name="ruleStatus"
                            value="timedActivation"
                          />
                          <span>{t("Activé jusqu'à une date programmée")}</span>
                        </div>
                        {values.ruleStatus === "timedActivation" && (
                          <div className="programmed-date selected">
                            <Field type="date" name="programmedDate" />
                          </div>
                        )}
                      </li>
                      <li className="flex gap-5">
                        <Field type="radio" name="ruleStatus" value="disable" />
                        <span>{t("Désactivée")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <button type="submit" className="btn-purple mt-20">
                  {t("Crée cette règle")}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Restrictions;
