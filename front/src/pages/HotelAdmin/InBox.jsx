import { Search } from "react-bootstrap-icons";
import "./InBox.scss";
import Avatar from "../../components/Avatar/Avatar";

const MailBox = () => {
    const styleAvatar = {width:"40px", height:"40px"}
  return (
    <div id="InBox">
      <div className="left elevated-card">
        <h3 className="mb-15">Messages</h3>
        <div className="search">
          <input type="text" />
          <div className="iconSearch">
            <Search size={15}/>
          </div>
        </div>
        <div className="list-discussion mt-15">
        <div className="discussion">
                <div className="avatar">
                    <Avatar style={styleAvatar}/>
                </div>
                <div className="descri">
                    <div className="head">
                        <span className="name">Jon Doe</span>
                        <small>11:04</small>
                    </div>
                    <div className="msg">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ex consectetur dignissimos tempore iure libero dolore reprehenderit atque enim odio nisi sapiente, magnam nobis vel accusantium harum quae nihil reiciendis?</p>
                    </div>
                </div>
            </div>
            <div className="discussion">
                <div className="avatar">
                    <Avatar style={styleAvatar}/>
                </div>
                <div className="descri">
                    <div className="head">
                        <span className="name">Jon Doe</span>
                        <small>11:04</small>
                    </div>
                    <div className="msg">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ex consectetur dignissimos tempore iure libero dolore reprehenderit atque enim odio nisi sapiente, magnam nobis vel accusantium harum quae nihil reiciendis?</p>
                    </div> 
                </div>
            </div>
            <div className="discussion read">
                <div className="avatar">
                    <Avatar style={styleAvatar}/>
                </div>
                <div className="descri">
                    <div className="head">
                        <span className="name">Jon Doe</span>
                        <small>11:04</small>
                    </div>
                    <div className="msg">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ex consectetur dignissimos tempore iure libero dolore reprehenderit atque enim odio nisi sapiente, magnam nobis vel accusantium harum quae nihil reiciendis?</p>
                    </div>
                </div>
            </div>
            <div className="discussion read">
                <div className="avatar">
                    <Avatar style={styleAvatar}/>
                </div>
                <div className="descri">
                    <div className="head">
                        <span className="name">Jon Doe</span>
                        <small>11:04</small>
                    </div>
                    <div className="msg">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ex consectetur dignissimos tempore iure libero dolore reprehenderit atque enim odio nisi sapiente, magnam nobis vel accusantium harum quae nihil reiciendis?</p>
                    </div>
                </div>
            </div>
            <div className="discussion read">
                <div className="avatar">
                    <Avatar style={styleAvatar}/>
                </div>
                <div className="descri">
                    <div className="head">
                        <span className="name">Jon Doe</span>
                        <small>11:04</small>
                    </div>
                    <div className="msg">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ex consectetur dignissimos tempore iure libero dolore reprehenderit atque enim odio nisi sapiente, magnam nobis vel accusantium harum quae nihil reiciendis?</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="center elevated-card">
        <div className="head">
            <div className="flex align-items-center gap-5">
                <div className="avatar">
                    <Avatar style={styleAvatar}/>
                </div>
                <div className="descri">
                    <span className="name">Jon Doe</span>
                    <small>Actif</small>
                </div>
            </div>
        </div>
        <div className="discussion">
            
        </div>
      </div>
      <div className="right elevated-card"></div>
    </div>
  );
};

export default MailBox;
