import React, { useState } from 'react'
import '../css/RightMenu.css'
import { 
  Toolbar,
  Typography,
  Stack,
  MenuList,
  MenuItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Badge, 
  Tooltip,
} from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import icon from '../assets/icon.png'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Message } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#39434a' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    padding: '10px',
    paddingLeft: '20px',
    margin: '10px',
    display: 'flex', // Allow for icon placement
    alignItems: 'center', // Center the content vertically
    justifyContent: 'space-between', // Position the icon to the right
  }));

const RightMenu = ({ handleLogout }) => {
    const message1 = 
    {
        id:1,
        message: "Hello"
    }
    const [listSession,setListSession] = useState([message1]);
    const handleNewChat = () => {
        const newSessionId = listSession.length + 1;
        const newMessage = {
            id: newSessionId,
            message: ""
        }
        setListSession([...listSession, newMessage]); 
      };   
    const handleDeleteSession = (id) => {
        console.log('Deleting session:', id);
        if(listSession.length == 1){
            return
        }else{
            setListSession((prevListSession) => prevListSession.filter((session) => session.id !== id));
        }
    };   
  return (
    <div className='right_menu'>
      <div className="logo">
        <Toolbar
            variant="dense"
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            <img
                src={icon}
                style={{
                    width: '35px',
                    height: '35px',
                    marginRight: '5px',
                }}
            />
            <Typography variant="h5" color="inherit" component="div" style={{ fontSize: '26px' , color: 'white' }}>
                Chatbox
            </Typography>
        </Toolbar>
      </div>
      <div className="chatList">
        <h2>Chat</h2>
        <Stack spacing={1}>
            {listSession.map((item) => (
                <Item key={item.id}>
                    Chat {item.id}
                    <Tooltip title="Delete session">
                    <IconButton
                        onClick={() => handleDeleteSession(item.id)}
                        // visibility={hover ? 'visible' : 'hidden'}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                </Item>
            ))}
        </Stack>
      </div>
      <div className="setting">
      <MenuList className='menuList'>
            <MenuItem
                onClick={handleNewChat}
            >
                <ListItemIcon>
                    <IconButton style={{ color: 'white' }}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </ListItemIcon>
                <ListItemText>new chat</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    {/* ⌘N */}
                </Typography>
            </MenuItem>
            <MenuItem
                onClick={handleLogout}
            >
                <ListItemIcon>
                    <IconButton  style={{ color: 'white' }}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    {/* ⌘N */}
                </Typography>
            </MenuItem>

            <MenuItem>
                <ListItemIcon>
                    <IconButton  style={{ color: 'white' }}>
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </ListItemIcon>
                <ListItemText>
                    <Badge
                        color="primary"
                        variant="dot"
                        // invisible={!store.needCheckUpdate}
                        sx={{ paddingRight: '8px' }}
                    >
                        <Typography sx={{ opacity: 0.5 }}>
                            About me
                        </Typography>
                    </Badge>
                </ListItemText>
            </MenuItem>
      </MenuList>
      </div>
    </div>
  )
}

export default RightMenu
