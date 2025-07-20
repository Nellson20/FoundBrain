import React, { useContext, useEffect } from "react";
import "../pages/Portal/Portal.scss";
import {
  BriefcaseFill,
  ExclamationDiamondFill,
  FilePostFill,
  GeoAlt,
  HouseDoorFill,
  PencilSquare,
  PeopleFill,
  ThreeDots,
  Building,
  FileEarmarkPerson,
  Gem,
  House,
  ExclamationCircle,
  ChevronDown,
  HouseDoor,
  ExclamationDiamond,
  FilePost,
  Briefcase,
  People,
} from "react-bootstrap-icons";
import { Outlet, useParams } from "react-router-dom";
import Avatar from "../components/Avatar/Avatar";
import { Link } from "react-router-dom";
import StickySidebar from "../components/StickySideBar/StickySideBar";
import DoNavLink from "../components/DoNavLink/DoNavLink";
import MediaContext from "../context/MediaContext";
import { DESKTOP } from "../constants/MediaTypeConstants";
import Rating from "react-rating";
import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../api/company";
import Logo from "../components/Logo/Logo";
import PortalSkeleton from "../pages/Portal/PortalSkeleton";
const PortalLayout = () => {
  const { deviceType } = useContext(MediaContext);
  const { portalId } = useParams();

  const staticTopBar = (e) => {
    if (e.target.scrollTop > 0) {
      document.getElementById('topbar')?.classList.remove('sticky')
    } else {
      document.getElementById('topbar')?.classList.add('sticky')
    }
    console.log(document.getElementById('portal-nav').getBoundingClientRect())
    if (document.getElementById('portal-nav').getBoundingClientRect().top <= 0) {
      document.getElementById('portal-nav')?.classList.add('sticky')
    } else {
      document.getElementById('portal-nav')?.classList.remove('sticky')
    }
  }

  useEffect(() => {

    document.getElementById('App').addEventListener('scroll', staticTopBar)
    return () => document.getElementById('App').removeEventListener('scroll', staticTopBar)
  }, [])

  const {
    data: company,
    error: companyErr,
    isLoading: companyLoading,
  } = useQuery({
    queryKey: ["repoCompany", portalId],
    queryFn: () => getCompany(portalId)
  });
  useEffect(() => {
    console.log(company, "DOM");
  }, [company]);
  return (
    <div className="portal-page">
      {companyLoading ? (
        <PortalSkeleton />
      ) : (
        <>
          <div className="top">
            <div className="left">
              <div className="banner"></div>
              <div className="portal-info">
                <div className="top flex align-items-end gap-10">
                  <Logo
                    src={company?.activeLogo?.fileUrl}
                    height={60}
                    width={60}
                  />
                  <img src={company?.country.flag.fileUrl} width={35} alt="" />
                </div>
                <div className="bottom flex flex-wrap gap-10 justify-content-between">
                  <div className="left">
                    <div className="flex align-items-center flex-wrap column-gap-10">
                      <h1>{company?.name}</h1>
                      <span className="flex align-items-center">
                        <GeoAlt /> {company?.adress}
                      </span>
                    </div>
                    <div className="evaluation flex align-items-center gap-5">
                      <div className="moy">4.5</div>
                      <Rating
                        readonly
                        initialRating={3.5}
                        className="portal-note"
                        fractions={2}
                        emptySymbol={
                          <img
                            src="/img/icons/diamond_grey.png"
                            className="icon rating-diamond-img"
                          />
                        }
                        fullSymbol={
                          <img
                            src="/img/icons/diamond.png"
                            className="icon rating-diamond-img"
                          />
                        }
                      />
                      <span className="orange-txt flex align-items-center gap-5">
                        500K evaluations <ChevronDown />
                      </span>
                    </div>
                    <span className="portal-domains">
                      {company?.domains.map((d) => d.title).join(",")}
                    </span>
                  </div>
                  <div className="right">
                    <button className="btn btn-purple">Prise de contact</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="portal-nav">
            <div className="flex justify-content-between align-items-center">
            <ul>
              <li>
                <DoNavLink to="accueil" activeClass="active">
                  <span>Accueil</span>
                </DoNavLink>
              </li>
              <li>
                <DoNavLink to="a-propos" activeClass="active">
                  <span>Apropos</span>
                </DoNavLink>
              </li>
              <li>
                <DoNavLink to="actualite" activeClass="active">
                  <span>Actualité</span>
                </DoNavLink>
              </li>
              <li>
                <DoNavLink end={false} to="emplois" activeClass="active">
                  <span>Emplois</span>
                </DoNavLink>
              </li>
              <li>
                <DoNavLink to='faq' activeClass="active">
                  <span>FAQ</span>
                </DoNavLink>
              </li>
              <li>
                <DoNavLink to="evaluation" activeClass="active">
                  <span>Evaluation</span>
                </DoNavLink>
              </li>
            </ul>
            <div className="right">
              <button className="btn btn-purple">Prise de contact</button>
            </div>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <Outlet context={{ company }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default PortalLayout;
