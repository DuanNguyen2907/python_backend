import React from "react";
import '../css/Chatbot.css'
import icon from '../assets/pngtree-world-health-day-our-planet-doctors-and-medical-workers-are-celebrating-png-image_9043300.png'

const CoBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none" }}
      >
        <img alt="BotAvatar" src={icon} />
      </div>
    </div>
  );
};

export default CoBotAvatar;