import React from 'react';
import {
  ListItem,
  Grid,
  Box,
  Avatar,
  TextField,
  Typography,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select'
import PersonIcon from '@mui/icons-material/Person'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import SettingsIcon from '@mui/icons-material/Settings'
import CheckIcon from '@mui/icons-material/Check'

function _MessageBox(props) {
  const { msg, setMsg } = props;
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <ListItem
      id={props.id}
      key={msg.id}
      sx={{
        padding: '10px',
      }}
      className={[
        'msg-block',
        msg.generating ? 'rendering' : 'render-done',
        {
          user: 'user-msg',
          system: 'system-msg',
          assistant: 'assistant-msg',
        }[msg?.role || 'user'],
      ].join(' ')}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          {isEditing ? (
            <Select
              value={msg.role}
              onChange={(e) => {
                setMsg && setMsg({ ...msg, role: e.target.value });
              }}
              size="small"
              id={msg.id + 'select'}
            >
              {/* Omitted select options */}
            </Select>
          ) : (
            <Box sx={{ marginTop: '8px' }}>
              {
                {
                  assistant: (
                    <Avatar>
                      <SmartToyIcon />
                    </Avatar>
                  ),
                  user: (
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  ),
                  system: (
                    <Avatar>
                      <SettingsIcon />
                    </Avatar>
                  ),
                }[msg.role]
              }
            </Box>
          )}
        </Grid>
        <Grid item xs sm container sx={{ width: '0px', paddingRight: '15px' }}>
          <Grid item xs>
            {isEditing ? (
              <TextField
                style={{
                  width: '100%',
                }}
                multiline
                placeholder="prompt"
                value={msg.content}
                onChange={(e) => {
                  setMsg && setMsg({ ...msg, content: e.target.value });
                }}
                id={msg.id + 'input'}
              />
            ) : (
              <Box
                sx={{
                  wordBreak: 'break-word',
                  wordWrap: 'break-word',
                }}
                className="msg-content"
                // dangerouslySetInnerHTML={{ __html: md.render(msg.content) }}
              />
            )}
            <Typography variant="body2" sx={{ opacity: 0.5 }}>
              {/* Omitted tips */}
            </Typography>

            {isEditing ? (
              <IconButton onClick={() => setIsEditing(false)} size="large" color="primary">
                <CheckIcon />
              </IconButton>
            ) : (
              <Box sx={{ height: '35px' }}></Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default _MessageBox;