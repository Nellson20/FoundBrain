import {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useContext,
  useRef,
} from "react";
import "./App.scss";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";

import { DESKTOP, SMARTPHONE, TABLET } from "./constants/MediaTypeConstants";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import "./toast.scss";

import { useDispatch, useSelector } from "react-redux";
import { setConnectedUser } from "./redux/actions/userActions";

import PageLoader from "./components/PageLoader/PageLoader";

import { io } from "socket.io-client";
import SocketIOContext from "./context/SocketIOContext";



import ThemeContext from "./context/ThemeContext";

import { showToast } from "./utils/toastUtils";
import PostNotificationContent from "./pages/Notifications/PostNotificationContent";
import CurrencyContext from "./context/CurrencyContext";
import { media } from "./functions";
import MediaContext from "./context/MediaContext";

import AppRoutes from './components/AppRoutes/AppRoutes'

function App() {
  

  const { user } = useSelector((store) => store.user);
  const [socket, setSocket] = useState(null);
  const socketValue = useMemo(() => {
    return {
      socket,
      setSocket,
    };
  }, [socket]);

  useEffect(() => {
    if (socket && user) {
      socket?.emit("connectUser", user.id);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket?.on("newNotification", (notification) => {
        showToast({ content: <PostNotificationContent data={notification} /> });
      });
    }
  }, [socket]);

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, [window.location.pathname]);

  /**
   * Theme
   */
  if (!localStorage.getItem("appTheme")) {
    localStorage.setItem("appTheme", "light");
  }
  const [theme, setTheme] = useState(localStorage.getItem("appTheme"));
  const changeTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("appTheme", theme);
  };
  const activeTheme = useMemo(() => {
    return {
      theme,
      setTheme: changeTheme,
    };
  }, [theme]);

  /**
   * Currency
   */
  const [currency, setCurrency] = useState(
    JSON.parse(localStorage.getItem("currency"))
  );
  if (!localStorage.getItem("currency")) {
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/currencies/1`,
      method: "get",
    }).then((res) => {
      console.log(res.data, "DOLLARCURRENCY");
      localStorage.setItem("currency", JSON.stringify(res.data));
      setCurrency(res.data);
    });
  }
  const [currenciesBaseUSD, setCurrenciesBaseUSD] = useState(null);
  useEffect(() => {
    axios({
      url: `https://cdn.taux.live/api/latest.json`,
      method: "get",
    }).then((res) => {
      setCurrenciesBaseUSD(res.data.rates);
    });
  }, []);

  const changeCurrency = (currency) => {
    setCurrency(currency);
    localStorage.setItem("currency", JSON.stringify(currency));
  };
  const defaultCurrency = useMemo(() => {
    return {
      currency,
      setCurrency: changeCurrency,
      currenciesBaseUSD,
      setCurrenciesBaseUSD,
    };
  }, [currency, currenciesBaseUSD]);

  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
  //Responsive
  

  const [shownSidebar, setShownSidebar] = useState(true);
  const [deviceType, setDeviceType] = useState(DESKTOP);
  const changeDeviceType = (deviceType) => {
    setDeviceType(deviceType);
  };
  const deviceTypeValue = useMemo(() => {
    return {
      deviceType,
      changeDeviceType,
    };
  }, [deviceType]);
  useLayoutEffect(() => {
    media(
      {
        [SMARTPHONE]: "(max-width:768px)",
        [TABLET]: "(min-width:768px) and (max-width:1200px)",
        [DESKTOP]: "(min-width: 1200px)",
      },
      (deviceType) => {
        setDeviceType(deviceType);
      }
    );
  }, [deviceType]);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/users`,
      method: "get",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    const token = Cookies.get("BEARER");
    console.log(token, "USER");
    if (token) {
      const user = jwt_decode(token);
      if (user.exp * 1000 > new Date().getTime()) {
        axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/users/${user.id}`,
          method: "get",
          withCredentials: true,
        })
          .then((res) => {
            dispatch(setConnectedUser(res.data));
            setPageLoading(false);
            setSocket(io(process.env.REACT_APP_REAL_DOMAIN));
          })
          .catch((err) => {
            setPageLoading(false);
          });
      }
    } else {
      setPageLoading(false);
    }
  }, []);

  return (
    <SocketIOContext.Provider value={socketValue}>

      <MediaContext.Provider value={deviceTypeValue}>
        <CurrencyContext.Provider value={defaultCurrency}>
          <ThemeContext.Provider value={activeTheme}>
            <div id="AppTheme" className={`theme-${theme}`}>
              <div
                id="App"
                style={{
                  paddingBottom:
                    (deviceType === SMARTPHONE || deviceType === TABLET) &&
                      !window.location.pathname.startsWith("/messages")
                      ? "var(--bottom-nav-height)"
                      : 0,
                }}
              >
                <BrowserRouter>
                  <AppRoutes pageLoading={pageLoading} setPageLoading={setPageLoading}/>

                </BrowserRouter>
              </div>
              <PageLoader open={pageLoading} />
            </div>
          </ThemeContext.Provider>
        </CurrencyContext.Provider>
      </MediaContext.Provider>

    </SocketIOContext.Provider>
  );
}

export default App;
