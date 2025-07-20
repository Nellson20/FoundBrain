import React, { useContext } from 'react'
import './VideoHome.scss'
import Slider from 'react-slick'
import { Vinyl, Newspaper, Headset, Play, PlayFill, Search, Dot, Eye, Gem, ThreeDots, ChevronRight } from 'react-bootstrap-icons'
import Avatar from '../../components/Avatar/Avatar'
import Searchbar from '../../components/Searchbar/Searchbar'
import MediaContext from '../../context/MediaContext'
import { DESKTOP, SMARTPHONE } from '../../constants/MediaTypeConstants'
const VideoHome = () => {
  const { deviceType } = useContext(MediaContext)
  return (
    <div id='video-home-page'>
      <div className="top">
        <div>
          <div className="heading">
            <h1>Videos</h1>
          </div>
          <div className="video-page-top flex align-items-end mt-10 mb-10">
            <div className="explorer-slider" style={{ maxWidth: '100%', minWidth: 0 }}>
              <Slider {...{
                dots: false,
                arrows: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                infinite: false,
              }}>
                <div className="slide news-slide">
                  <Newspaper size={22} />
                  <b>News</b>
                </div>
                <div className="slide live-slide">
                  <Vinyl />
                  <b>Live</b>
                </div>
                <div className="slide podcast-slide">
                  <Headset size={22} />
                  <b>Podcast</b>
                </div>
              </Slider>
            </div>
            <div className="right flex align-items-center gap-5">
              <div style={{ maxWidth: 200 }}>
                <Searchbar placeholder='Recherche vidéo' />
              </div>
              <button className="btn btn-purple">
                AD
              </button>
            </div>
          </div>
          <div className="video-top-banner">
            <div className="left relative">
              <img className='absolute' src="/img/video/fes.jpg" alt="" />
              <div className="video-thumb-top-left">
                <div className="live-icon"></div>
                <div className="views-icon"><Eye /><span>20k</span></div>
                <div className="gems-icon"><Gem /><span>4.5</span></div>
              </div>
              <div className="absolute-video-capt flex align-items-end gap-5" style={{ maxWidth: '100%' }}>
                <div className='flex-grow-1' style={{ minWidth: 0 }}>
                  <div className="user-info flex gap-5">
                    <Avatar height={20} width={20} />
                    <img src="/img/flags/Flag_of_Madagascar.svg" alt="" width={30} />
                  </div>
                  <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                </div>
              </div>
              <div className="play-btn"><PlayFill size={30} /></div>
            </div>
            <div className="right">
              <div className='relative'>
                <img className='absolute' src="/img/video/gims.jpeg" alt="" />
                <div className="video-thumb-top-left">
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_Madagascar.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div className='relative'>
                <img className='absolute' src="/img/other/3.jpeg" alt="" />
                <div className="video-thumb-top-left">
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_Côte_d'Ivoire.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div className='relative'>
                <img className='absolute' src="/img/other/2.jpg" alt="" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_Algeria.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div className='relative'>
                <img className='absolute' src="/img/other/1.jpg" alt="" />
                <div className="video-thumb-top-left">
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="left">
          <nav className='floatting-nav'>
            <ul className='flex'>
              <li className='active'>Tous</li>
              <li>Actualités</li>
              <li>Industrie</li>
              <li>Politique</li>
              <li>Technologie</li>
              <li>Science</li>
              <li>Education</li>
              <li>Tourisme</li>
            </ul>
          </nav>
          <div className="mansonry-vid">
            <div class="mansonry-container">
              <div class="box relative">
                <img className='relative' src="https://media.istockphoto.com/id/539454508/fr/photo/jeune-africaine-m%C3%A2le-v%C3%A9rifiant-sa-tablette-dans-un-jardin-potager.jpg?s=612x612&w=0&k=20&c=lMLltOzSH1JtrO68VrUelYlUXU5VjRNt5HFhCIqr-54=" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://media.istockphoto.com/id/1385118964/fr/photo/photo-dune-jeune-femme-utilisant-une-tablette-num%C3%A9rique-alors-quelle-travaillait-dans-un.jpg?s=612x612&w=0&k=20&c=xypzF_oWtDAN4LAWk9jmlxsr0eZHh9jehYZWUf1qkvE=" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/1936154/pexels-photo-1936154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/38280/monkey-mandril-africa-baboon-38280.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/55814/leo-animal-savannah-lioness-55814.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/3347324/pexels-photo-3347324.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/1622817/pexels-photo-1622817.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/667203/pexels-photo-667203.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/3049880/pexels-photo-3049880.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/2305212/pexels-photo-2305212.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/2531237/pexels-photo-2531237.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
              <div class="box relative">
                <img className='relative' src="https://images.pexels.com/photos/259273/pexels-photo-259273.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" loading="lazy" />
                <div className="video-thumb-top-left">
                  <div className="live-icon"></div>
                  <div className="views-icon"><Eye /><span>20k</span></div>
                  <div className="gems-icon"><Gem /><span>4.5</span></div>
                </div>
                <div className="absolute-video-capt flex justify-content-between align-items-end gap-5" style={{ maxWidth: '100%' }}>
                  <div className='flex-grow-1' style={{ minWidth: 0 }}>
                    <div className="user-info flex gap-5">
                      <Avatar height={20} width={20} />
                      <img src="/img/flags/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg" alt="" width={30} />
                    </div>
                    <div className="description text-ellipsis">Live : Maitre Gims en show case à Madagascar</div>
                  </div>
                  <div className="play-btn"><PlayFill size={20} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="sponsored-videos">
            <div className="top flex align-items-center justify-content-between">
              <h5>Sponsorisés</h5>
              <ThreeDots />
            </div>
            <div className="sponsored-videos-slider">
              <Slider {...{
                dots: true,
                arrows: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                infinite: false,
              }}>
                <div className="slide sponsored-video-slide">
                  <Newspaper size={22} />
                  <b>News</b>
                </div>
                <div className="slide sponsored-video-slide">
                  <Vinyl />
                  <b>Live</b>
                </div>
                <div className="slide sponsored-video-slide">
                  <Headset size={22} />
                  <b>Podcast</b>
                </div>
                <div className="slide sponsored-video-slide">
                  <Headset size={22} />
                  <b>Podcast</b>
                </div>
                <div className="slide sponsored-video-slide">
                  <Headset size={22} />
                  <b>Podcast</b>
                </div>

              </Slider>
            </div>
            <div className="bottom relative">
              <span className="flex align-items-center">Voir plus <ChevronRight /></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VideoHome
