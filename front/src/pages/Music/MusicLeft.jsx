import React from "react";
import "./MusicLeft.scss";
import { Link } from "react-router-dom";
import { Dot, House, Mic, MusicNote, PlayBtn, X } from "react-bootstrap-icons";
import Avatar from "../../components/Avatar/Avatar";
import StickySideBar from "../../components/StickySideBar/StickySideBar";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const MusicLeft = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`music-left`}
      >
        <StickySideBar top={58}>
          <div className="inside-sticky">
            <nav className="music-menu search-nav">
              <ul>
                <li>
                  <Link className="active">
                    <i className="icon">
                      <House size={20} />
                    </i>
                    <span>Accueil</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="icon">
                      <PlayBtn size={20} />
                    </i>
                    <span>Videos</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="icon">
                      <Mic size={20} />
                    </i>
                    <span>Artistes</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="icon">
                      <MusicNote size={20} />
                    </i>
                    <span>Ma musique</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="popular-artists-list">
              <h2>Artistes populaires</h2>
              <ul>
                <li>
                  <Link>
                    <div className="flag-avatar">
                      <Avatar width={40} height={40} src="/img/artists/5.png" />
                      <img width={30} src="/img/flags/Flag_of_Madagascar.svg" />
                    </div>
                    <span className="text-ellipsis">Malik Ndlovu</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <div className="flag-avatar">
                      <Avatar width={40} height={40} src="/img/artists/1.png" />
                      <img width={30} src="/img/flags/Flag_of_Algeria.svg" />
                    </div>
                    <span className="text-ellipsis">Kwame Nkrumah</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <div className="flag-avatar">
                      <Avatar width={40} height={40} src="/img/artists/2.png" />
                      <img width={30} src="/img/flags/Flag_of_Cape_Verde.svg" />
                    </div>

                    <span className="text-ellipsis">Amina Toure</span>
                  </Link>
                </li>
                <li>
                  <Link>
                    <div className="flag-avatar">
                      <Avatar width={40} height={40} src="/img/artists/3.png" />
                      <img width={30} src="/img/flags/Flag_of_Egypt.svg" />
                    </div>
                    <span className="text-ellipsis">Safiya Ouedraogo</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </StickySideBar>
      </div>
    </>
  );
};

export default MusicLeft;
