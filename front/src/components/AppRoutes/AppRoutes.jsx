import React, {
    useState,
    useEffect,
    useMemo,
    useLayoutEffect,
    useContext,
    useRef,
} from "react";
import {
    Routes,
    Route,
    BrowserRouter,
    Navigate,
    useLocation,
} from "react-router-dom";
import Default from "../../layouts/Default";
import Home from "../../pages/Home/Home";
import JobFindingLayout from "../../layouts/JobFindingLayout";
import JobFindingHome from "../../pages/JobFinding/JobFindingHome";
import CreateJob from "../../pages/JobFinding/CreateJob";
import CreateCv from "../../pages/JobFinding/CreateCv";
import PortalHome from "../../pages/Portal/PortalHome";
import Messages from "../../pages/Messages/Messages";
import Login from "../../pages/Login/Login";
import PortalAbout from "../../pages/Portal/PortalAbout";
import PortalActu from "../../pages/Portal/PortalActu";
import Funding from "../../pages/Funding/Funding";
import Countries from "../../pages/Countries/Countries";


import Video from "../../pages/Video/Video";
import VideoHome from "../../pages/VideoHome/VideoHome";
import MusicLayout from "../../layouts/MusicLayout";
import Music from "../../pages/Music/Music";
import Minimal from "../../layouts/Minimal";
import Popup from "../../components/Popup/Popup"
import Image from "../../pages/Image/Image";
import Register from "../../pages/Register/Register";
import { redirect } from "react-router-dom";
import AuthRedirect from "../../components/AuthRedirect/AuthRedirect";
import Landing from "../../pages/Landing/Landing";
import CreatePortal from "../../pages/Portal/CreatePortal";
import PortalDashboardLayout from "../../layouts/PortalDashboardLayout";
import CreateInvest from "../../pages/Funding/CreateInvest";
import Search from "../../pages/Search/Search";
import PortalAdminLayout from "../../layouts/PortalAdminLayout";
import Dashboard from "../../pages/Portal/Dashboard";
import ProfileLayout from "../../layouts/ProfileLayout";
import ProfileActu from "../../pages/Profile/ProfileActu";
import ProfileAbout from "../../pages/Profile/ProfileAbout";
import Studies from "../../pages/Profile/Studies";
import Contact from "../../pages/Profile/Contact";
import Notifications from "../../pages/Notifications/Notifications";
import PortalLayout from "../../layouts/PortalLayout";
import ExplorerLayout from "../../layouts/ExplorerLayout";
import Explorer from "../../pages/Explorer/Explorer";
import City from "../../pages/Stay/City";
import HotelsHome from "../../pages/Hotels/HotelsHome";
import HotelsReservation from "../../pages/HotelReservation/HotelsReservation";
import ProfilMusic from "../../pages/ProfilMusic/ProfilMusic";
import Statistics from "../../pages/Portal/Statistics";
import PortalMessenger from "../../pages/Portal/PortalMessenger";
import Access from "../../pages/Portal/Access";
import Edit from "../../pages/Portal/Edit";
import JobDetails from "../../pages/JobFinding/JobDetails";
import NotFound from "../../pages/Eroors/NotFound";
import PortalEvaluation from "../../pages/Portal/PortalEvaluation";
import HotelsSearch from "../../pages/HotelsSearch/HotelsSearch";
import PortalEmplois from "../../pages/Portal/PortalEmplois";
import PortalFaq from "../../pages/Portal/PortalFaq";
import ProfileRecommendation from "../../pages/Profile/ProfileRecommandation";
import Residences from "../../pages/Profile/Residences";
import ProfileDetails from "../../pages/Profile/ProfileDetails";
import ProfileEntreprises from "../../pages/Profile/ProfileEntreprises";

import AddHotel from "../../pages/HotelsManager/AddHotel";
import Contacts from "../../pages/Contacts/Contacts";
import HotelAdminLayout from "../../layouts/HotelAdminLayout";
import HotelAdminHome from "../../pages/HotelAdmin/HotelAdminHome";
import HotelAdminReservation from "../../pages/HotelAdmin/HotelAdminReservation";
import ReservationDetails from "../../pages/HotelAdmin/ReservationDetails";
import CreateRoom from "../../pages/HotelAddRoom/CreateRoom";
import Restrictions from "../../pages/HotelAdmin/Restrictions";
import Accommodations from "../../pages/HotelAdmin/Accommodations";
import AccommodationControls from "../../pages/HotelAdmin/AccommodationControls";
import PricingPlans from "../../pages/HotelAdmin/PricingPlans";
import AddPricingPlan from "../../pages/HotelAdmin/AddPricingPlan";
import Advantages from "../../pages/HotelAdmin/Advantages";
import CustomerSpecificPricing from "../../pages/HotelAdmin/CustomerSpecificPricing";
import HotelInfo from "../../pages/HotelAdmin/HotelInfo";
import Pictures from "../../pages/HotelAdmin/Pictures";
import JobDetailsPage from "../../pages/JobFinding/JobDetails";
import { useQuery } from "@tanstack/react-query";
import CvList from "../../pages/JobFinding/CvList";


import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AccommodationsDetails from "../../pages/HotelAdmin/AccommodationsDetails";
import EquipmentsAndServices from "../../pages/HotelAdmin/EquipmentsAndServices";
import InBox from "../../pages/HotelAdmin/InBox";
import { useDispatch, useSelector } from "react-redux";
import ArtistDashboardLayout from "../../layouts/ArtistDashboardLayout/ArtistDashboardLayout";
import ArtistContent from "../../pages/Artist/ArtistContent";
import EditArtistProfile from "../../pages/Artist/EditArtistProfile";
import ArtistDashboard from "../../pages/Artist/ArtistDashboard";
import SocketIOContext from '../../context/SocketIOContext'
import { addNotification } from "../../redux/actions/userActions";

const AppRoutes = ({ pageLoading, setPageLoading }) => {
    const location = useLocation();
    const background = location.state && location.state.background;
    const connectedUser = useSelector((state) => state.user.user);
    const { socket } = useContext(SocketIOContext)
    const noticationDispatch=useDispatch()
    
    useEffect(() => {
        if (socket) {
            socket?.on('newNotification', (newNotification) => {
                alert('newnotific')
                console.log(newNotification,'NEWNOTIFICATION')
                noticationDispatch(addNotification())
            });
        }
    }, [socket]);

    return (
        <>
            <Routes location={background || location}>
                <Route element={<Default />}>
                    {!pageLoading && (
                        <>

                            <Route path="/landing" element={<Landing />} />
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/notifications"
                                element={<Notifications />}
                            />
                            <Route path="/recherche">
                                <Route index element={<Search />} />
                            </Route>


                            {/* <Route
                              path="/image/:image_id"
                              element={<Image />}
                            /> */}
                            <Route element={<AuthRedirect />}>
                                <Route
                                    path="/inscription"
                                    element={<Register />}
                                />
                            </Route>
                            <Route
                                path="/emplois/:jobOfferId?"
                                element={<JobFindingLayout />}
                            >
                                <Route index element={<JobFindingHome />} />
                                <Route element={<AuthRedirect isLoding={pageLoading} requireAuth={true} />}>
                                    <Route path="nouveau" element={<CreateJob />} />
                                    <Route path="cv">
                                        <Route index element={<CvList />} />
                                        <Route path="nouveau" element={<CreateCv />} />
                                    </Route>
                                </Route>
                                <Route path="details" element={<JobDetails />} />
                            </Route>
                            <Route
                                element={<AuthRedirect isLoding={pageLoading} requireAuth={true} />}
                            >
                                <Route path="/contacts" element={<Contacts />}>
                                    <Route index element={<h1>Hello World</h1>} />
                                    <Route path="profil">
                                        <Route
                                            index
                                            element={
                                                connectedUser ? (
                                                    <Navigate
                                                        to={`${connectedUser.id}`}
                                                        replace={true}
                                                    />
                                                ) : (
                                                    <AuthRedirect requireAuth={true} />
                                                )
                                            }
                                        />
                                        <Route path=":userId" element={<ProfileLayout />}>
                                            <Route
                                                index
                                                element={
                                                    <Navigate to="actu" replace={true} />
                                                }
                                            />
                                            <Route path="actu" element={<ProfileActu />} />
                                            <Route
                                                path="a-propos-de-moi"
                                                element={<ProfileAbout />}
                                            >
                                                <Route
                                                    index
                                                    element={
                                                        <Navigate
                                                            to="etudes-et-emplois"
                                                            replace={true}
                                                        />
                                                    }
                                                />
                                                <Route
                                                    path="etudes-et-emplois"
                                                    element={<Studies />}
                                                />
                                                <Route
                                                    path="mes-coordonnees"
                                                    element={<Contact />}
                                                />
                                            </Route>
                                        </Route>
                                    </Route>
                                </Route>
                            </Route>

                            <Route path="/profil">
                                <Route
                                    index
                                    element={
                                        connectedUser ? (
                                            <Navigate
                                                to={`${connectedUser.id}`}
                                                replace={true}
                                            />
                                        ) : (
                                            <AuthRedirect requireAuth={true} />
                                        )
                                    }
                                />
                                <Route path=":userId" element={<ProfileLayout />}>
                                    <Route
                                        index
                                        element={
                                            <Navigate to="actu" replace={true} />
                                        }
                                    />
                                    <Route path="actu" element={<ProfileActu />} />
                                    <Route
                                        path="a-propos-de-moi"
                                        element={<ProfileAbout />}
                                    >
                                        <Route
                                            index
                                            element={
                                                <Navigate
                                                    to="etudes-et-emplois"
                                                    replace={true}
                                                />
                                            }
                                        />
                                        <Route
                                            path="etudes-et-emplois"
                                            element={<Studies />}
                                        />
                                        <Route
                                            path="mes-coordonnees"
                                            element={<Contact />}
                                        />
                                        <Route
                                            path="residences"
                                            element={<Residences />}
                                        />
                                        <Route path="details-sur-moi" element={<ProfileDetails />} />
                                    </Route>
                                    <Route
                                        path="recommandations"
                                        element={<ProfileRecommendation />}
                                    />
                                    <Route path="entreprises" element={<ProfileEntreprises />} />
                                </Route>
                            </Route>

                            <Route path="/investissements">
                                <Route index element={<Funding />} />
                                <Route
                                    element={<AuthRedirect requireAuth={true} />}
                                >
                                    <Route
                                        path="nouveau"
                                        element={<CreateInvest />}
                                    />
                                </Route>
                            </Route>

                            {/* <Route path='/page' element={<PageLayout />}>
                          <Route index element={<PageHome />} />
                          <Route path='accueil' element={<PageHome />} />
                          <Route path='a-propos' element={<PageAbout />} />
                          <Route path='actualite' element={<PageActu />} />
                        </Route> */}

                            <Route path="/portail">
                                <Route
                                    element={<AuthRedirect requireAuth={true} />}
                                >
                                    <Route
                                        path=""
                                        element={<PortalDashboardLayout />}
                                    >
                                        <Route
                                            path=":portalId"
                                            element={<PortalAdminLayout />}
                                        >
                                            <Route path="dashboard">
                                                <Route index element={<Dashboard />} />
                                                <Route
                                                    path="statistiques"
                                                    element={<Statistics />}
                                                />
                                                <Route
                                                    path="messagerie"
                                                    element={<PortalMessenger />}
                                                />
                                                <Route
                                                    path="acces"
                                                    element={<Access />}
                                                />
                                                <Route
                                                    path="modifier"
                                                    element={<Edit />}
                                                />
                                            </Route>
                                        </Route>
                                        <Route
                                            path="nouveau"
                                            element={<CreatePortal />}
                                        />
                                    </Route>
                                </Route>

                                <Route
                                    path=":portalId"
                                    element={<PortalLayout />}
                                >
                                    <Route index element={<PortalHome />} />
                                    <Route
                                        path="accueil"
                                        element={<PortalHome />}
                                    />
                                    <Route
                                        path="a-propos"
                                        element={<PortalAbout />}
                                    />
                                    <Route
                                        path="actualite"
                                        element={<PortalActu />}
                                    />
                                    <Route path="emplois/:jobOfferId?">
                                        <Route index element={<PortalEmplois />} />
                                        <Route path="details" element={<JobDetailsPage />} />

                                    </Route>

                                    <Route path="faq" element={<PortalFaq />} />
                                    <Route
                                        path="evaluation"
                                        element={<PortalEvaluation />}
                                    />
                                </Route>
                            </Route>
                            <Route path="/video" element={<Minimal />}>
                                <Route index element={<VideoHome />} />
                                <Route path="play" element={<Video />} />
                            </Route>
                            <Route path="/artiste/1" element={<ArtistDashboardLayout/>}>
                                {/* <Route index element={<Music />} /> */}
                                <Route path="dashboard" element={<ArtistDashboard />} />
                                <Route path="mon-contenu" element={<ArtistContent />} />
                                <Route path="personnaliser/*" element={<EditArtistProfile />} />
                            </Route>
                            <Route
                                element={<AuthRedirect requireAuth={true} />}
                            >
                                <Route
                                    path="/messages/:discuId?"
                                    element={<Messages />}
                                />
                            </Route>

                            <Route element={<AuthRedirect />}>
                                <Route path="/connexion" element={<Login />} />
                            </Route>
                            <Route path='/image/:image_id' element={<Popup>
                                <Image />
                            </Popup>} />
                        </>
                    )}

                    {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path=":teamId/edit" element={<EditTeam />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}

                    <Route path="/explorer" element={<Countries />} />


                    {!pageLoading && (
                        <Route path="*" element={<NotFound />} />
                    )}
                </Route>

                <Route path="/musique" element={<MusicLayout />}>
                    <Route index element={<Music />} />
                    <Route path="profil" element={<ProfilMusic />} />
                </Route>

                <Route element={<ExplorerLayout />}>
                    <Route path="/explorer">
                        <Route path="pays/:countryId">
                            <Route index element={<Explorer />} />
                            <Route path="ville/:cityId" element={<City />} />
                        </Route>
                    </Route>

                    <Route path="hotels">
                        <Route element={<AuthRedirect requireAuth={true} isLoading={pageLoading} />}>
                            <Route path="nouveau/*" element={<AddHotel />} />
                        </Route>
                        <Route index element={<HotelsHome />} />
                        <Route path=':hotelId' element={<HotelsReservation />} />
                        <Route path='recherche' element={<HotelsSearch />} />
                        <Route path=":hotelId">
                            <Route element={<AuthRedirect requireAuth={true} isLoading={pageLoading} />}>
                                <Route path='hotel-admin' element={<HotelAdminLayout />}>
                                    <Route index element={<Navigate to='home' replace={true} />} />
                                    <Route path='home' element={<HotelAdminHome />} />
                                    <Route path='reservation'>
                                        <Route index element={<HotelAdminReservation />} />
                                        <Route path=':reservationId' element={<ReservationDetails />} />
                                    </Route>
                                    <Route path="hebergements" element={<Accommodations />} />
                                    <Route path="restrictions" element={<Restrictions />} />
                                    <Route path="control-hebergements" element={<AccommodationControls />} />
                                    <Route path="plans-tarifaires">
                                        <Route index element={<PricingPlans />} />
                                        <Route path="ajout" element={<AddPricingPlan />} />
                                    </Route>
                                    <Route path="avantages" element={<Advantages />} />
                                    <Route path="tarification-par-client" element={<CustomerSpecificPricing />} />
                                    <Route path='hotel-info' element={<HotelInfo />} />
                                    <Route path="photos" element={<Pictures />} />
                                    <Route path="hebergement-details" element={<AccommodationsDetails />} />
                                    <Route path="equipments-services" element={<EquipmentsAndServices />} />
                                    <Route path="messages" element={<InBox />} />
                                </Route>
                                <Route path="hebergements">
                                    <Route path="nouveau/*" element={<CreateRoom />} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>

                </Route>




            </Routes>
            {background && (
                <Routes>
                    <Route path='/image/:image_id' element={<Popup>
                        <Image />
                    </Popup>} />
                </Routes>)}
        </>
    )
}

export default AppRoutes