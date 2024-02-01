import { Grid } from '@mui/material';
import './App.css';
import RightMenu from './components/RightMenu';
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import './css/Chatbot.css';
import useAuth from './handle/useAuth';

function App() {
  const [isLogin,token,logout] = useAuth();
  const saveMessages = (messages, HTMLString) => {    localStorage.setItem('chat_messages', JSON.stringify(messages));  };
  const loadMessages = () => {    const messages = JSON.parse(localStorage.getItem('chat_messages'));    return messages;  };
  return (
    isLogin && (
    <Grid container spacing={2} className='App'>
      <Grid xs={3}>
        <RightMenu handleLogout={logout} ></RightMenu>
      </Grid>
      <Grid xs={9}>
          <Chatbot       
            config={config}
            messageParser={MessageParser}
            messageHistory={loadMessages()}
            actionProvider={ActionProvider}
            saveMessages={saveMessages}
          />
      </Grid>
    </Grid>
    )
  );
}

export default App;
