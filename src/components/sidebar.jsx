import { useState, useContext } from 'react';
import './sidebar.css';
import assets from '../assets/assets';
import { Context } from './context/context';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { previousPrompt, newChat, onSent, setrecentPrompt } = useContext(Context);

  const loadprompt = async (prompt2) => {
    setrecentPrompt(prompt2);
    await onSent(prompt2);
  };

  return (
    <>
      {/* Mobile overlay */}
      {extended && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setExtended(false)}
        />
      )}

      <div className={`sidebar ${extended ? 'extended' : ''}`}>
        <div className="sidebar-top">
          <div
            onClick={() => setExtended(prev => !prev)}
            className='menu-icon-wrapper'
          >
            <img
              className='menu-icon'
              src={assets.menu_icon}
              alt="Menu"
            />
          </div>

          <div onClick={() => { newChat(); setExtended(false); }} className="new-chat">
            <img src={assets.plus_icon} alt="New chat" />
            {extended && <p>New Chat</p>}
          </div>

          {extended && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              <div className="recent-list">
                {previousPrompt.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => { loadprompt(item); setExtended(false); }}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-bottom">
          <div className="bottom-item">
            <img src={assets.question_icon} alt="" />
            {extended && <p>Help</p>}
          </div>
          <div className="bottom-item">
            <img src={assets.history_icon} alt="" />
            {extended && <p>Activity</p>}
          </div>
          <div className="bottom-item">
            <img src={assets.setting_icon} alt="" />
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
