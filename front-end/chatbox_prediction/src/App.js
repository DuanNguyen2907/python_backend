// Import the styles for the App component
import './App.css';
import React , { useEffect, useRef, useState, MutableRefObject } from 'react';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  Toolbar,
  Box,
  Badge,
  Snackbar,
  List,
  ListSubheader,
  ListItemText,
  MenuList,
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  Grid,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
  TextField,
  useTheme,
  useMediaQuery,
  debounce,
} from '@mui/material'
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import Save from '@mui/icons-material/Save'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useTranslation } from 'react-i18next'

// Import the useAuth hook
import useAuth from './hooks/useAuth';

function Main(){
    const { t } = useTranslation()
    const [openSettingDialog, setOpenSettingDialog] = React.useState(false)
    const [openAboutDialog, setOpenAboutDialog] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)

    const messageListRef = useRef<HTMLDivElement>(null)
    // const messageScrollRef = useRef<{ msgId: string; smooth?: boolean } | null>(null)
  return (
    <Box className="App">
        <Grid
            container
            sx={{
                height: '100%',
            }}
        >
            {showMenu && (
                <Grid
                    item
                    sx={{
                        height: '100%',
                        // [theme.breakpoints.down('sm')]: {
                        //     position: 'absolute',
                        //     zIndex: 100,
                        //     left: '20px',
                        //     right: 0,
                        //     bottom: 0,
                        //     top: 0,
                        // },
                    }}
                >
                    <Stack
                        className="ToolBar"
                        sx={{
                            width: '210px',
                            height: '100%',
                            // [theme.breakpoints.down('sm')]: {
                            //     position: 'absolute',
                            //     zIndex: 1,
                            // },
                        }}
                        spacing={2}
                    >
                        <Toolbar
                            variant="dense"
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                            }}
                        >
                            {/* <img
                                src={icon}
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    marginRight: '5px',
                                }}
                            /> */}
                            <Typography variant="h5" color="inherit" component="div" style={{ fontSize: '26px' }}>
                                Chatbox
                            </Typography>
                        </Toolbar>

                        {/* <MenuList
                            sx={{
                                width: '100%',
                                position: 'relative',
                                overflow: 'auto',
                                height: '60vh',
                                '& ul': { padding: 0 },
                            }}
                            className="scroll"
                            subheader={<ListSubheader component="div">{t('chat')}</ListSubheader>}
                            component="div"
                            // ref={sessionListRef}
                        >
                            <DndContext
                                // modifiers={[restrictToVerticalAxis]}
                                // sensors={sensors}
                                collisionDetection={closestCenter}
                                // onDragEnd={handleDragEnd}
                            >
                                <SortableContext items={sortedSessions} strategy={verticalListSortingStrategy}>
                                    {sortedSessions.map((session, ix) => (
                                        <SortableItem key={session.id} id={session.id}>
                                            <SessionItem
                                                key={session.id}
                                                selected={store.currentSession.id === session.id}
                                                session={session}
                                                switchMe={() => {
                                                    store.switchCurrentSession(session)
                                                    textareaRef?.current?.focus()
                                                }}
                                                deleteMe={() => store.deleteChatSession(session)}
                                                copyMe={() => {
                                                    const newSession = createSession(session.name + ' copied')
                                                    newSession.messages = session.messages
                                                    store.createChatSession(newSession, ix)
                                                }}
                                                switchStarred={() => {
                                                    store.updateChatSession({
                                                        ...session,
                                                        starred: !session.starred,
                                                    })
                                                }}
                                                editMe={() => setConfigureChatConfig(session)}
                                            />
                                        </SortableItem>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </MenuList> */}

                        <Divider />

                        <MenuList>

                            <MenuItem>
                            {/* onClick={handleCreateNewSession} */}
                                <ListItemIcon>
                                    <IconButton>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText>{t('new chat')}</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    {/* ⌘N */}
                                </Typography>
                            </MenuItem>
                            {/* <MenuItem
                                onClick={() => {
                                    setOpenSettingDialog(true)
                                }}
                            >
                                <ListItemIcon>
                                    <IconButton>
                                        <SettingsIcon fontSize="small" />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText>{t('settings')}</ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                </Typography>
                            </MenuItem> */}

                            {/* <MenuItem onClick={() => setOpenAboutDialog(true)}>
                                <ListItemIcon>
                                    <IconButton>
                                        <InfoOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText>
                                    <Badge
                                        color="primary"
                                        variant="dot"
                                        invisible={!store.needCheckUpdate}
                                        sx={{ paddingRight: '8px' }}
                                    >
                                        <Typography sx={{ opacity: 0.5 }}>
                                            {t('About')} ({store.version})
                                        </Typography>
                                    </Badge>
                                </ListItemText>
                            </MenuItem> */}
                        </MenuList>
                    </Stack>
                    <Box
                        onClick={() => setShowMenu(false)}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            // [theme.breakpoints.up('sm')]: {
                            //     display: 'none',
                            // },
                        }}
                    ></Box>
                </Grid>
            )}
            <Grid
                item
                xs
                sx={{
                    width: '0px',
                    height: '100%',
                }}
            >
                <Stack
                    sx={{
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <Toolbar style={{ padding: '0 10px' }}>
                        <IconButton onClick={() => setShowMenu(!showMenu)}>
                            {!showMenu ? (
                                <img
                                    src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fd1hjkbq40fs2x4.cloudfront.net%2F2017-08-21%2Ffiles%2Flandscape-photography_1645.jpg&tbnid=wASLhvwyDli46M&vet=12ahUKEwji1vqLtJmDAxURH3AKHQhMA4kQMygBegQIARBM..i&imgrefurl=https%3A%2F%2Fsnapshot.canon-asia.com%2Fvn%2Farticle%2Fviet%2Flandscape-photography-quick-tips-for-stunning-deep-focused-images&docid=wJEFdG0FFBO98M&w=1024&h=683&q=%E1%BA%A3nh&client=firefox-b-d&ved=2ahUKEwji1vqLtJmDAxURH3AKHQhMA4kQMygBegQIARBM"
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                />
                            ) : (
                                <MenuOpenIcon style={{ fontSize: '26px' }} />
                            )}
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
                            noWrap
                            sx={{
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            <span
                                // onClick={() => {
                                //     editCurrentSession()
                                // }}
                                style={{ cursor: 'pointer' }}
                            >
                                Hello
                            </span>
                        </Typography>
                        {/* <SponsorChip sessionId={store.currentSession.id} /> */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            // onClick={() => setSessionClean(store.currentSession)}
                        >
                            <CleaningServicesIcon />
                        </IconButton>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{}}
                            // onClick={() => saveSession(store.currentSession)}
                        >
                            <Save />
                        </IconButton>
                    </Toolbar>
                    {/* <List
                        className="scroll"
                        sx={{
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                            '& ul': { padding: 0 },
                            height: '100%',
                        }}
                        component="div"
                        ref={messageListRef}
                    >
                        {store.currentSession.messages.map((msg, ix) => (
                            <MessageBox
                                id={msg.id}
                                key={msg.id}
                                msg={msg}
                                showWordCount={store.settings.showWordCount || false}
                                showTokenCount={store.settings.showTokenCount || false}
                                showModelName={store.settings.showModelName || false}
                                setMsg={(updated) => {
                                    store.currentSession.messages = store.currentSession.messages.map((m) => {
                                        if (m.id === updated.id) {
                                            return updated
                                        }
                                        return m
                                    })
                                    store.updateChatSession(store.currentSession)
                                }}
                                delMsg={() => {
                                    store.currentSession.messages = store.currentSession.messages.filter(
                                        (m) => m.id !== msg.id,
                                    )
                                    store.updateChatSession(store.currentSession)
                                }}
                                refreshMsg={() => {
                                    if (msg.role === 'assistant') {
                                        const promptMsgs = store.currentSession.messages.slice(0, ix)
                                        generate(store.currentSession, promptMsgs, msg)
                                    } else {
                                        const promptsMsgs = store.currentSession.messages.slice(0, ix + 1)
                                        const newAssistantMsg = createMessage('assistant', '....')
                                        const newMessages = [...store.currentSession.messages]
                                        newMessages.splice(ix + 1, 0, newAssistantMsg)
                                        store.currentSession.messages = newMessages
                                        store.updateChatSession(store.currentSession)
                                        generate(store.currentSession, promptsMsgs, newAssistantMsg)
                                        messageScrollRef.current = { msgId: newAssistantMsg.id, smooth: true }
                                    }
                                }}
                                copyMsg={() => {
                                    navigator.clipboard.writeText(msg.content)
                                    store.addToast(t('copied to clipboard'))
                                }}
                                quoteMsg={() => {
                                    let input = msg.content
                                        .split('\n')
                                        .map((line) => `> ${line}`)
                                        .join('\n')
                                    input += '\n\n-------------------\n\n'
                                    setQuoteCache(input)
                                }}
                            />
                        ))}
                    </List> */}
                    {/* <Box sx={{ padding: '20px 0', position: 'relative' }}>
                        {needScroll && (
                            <ButtonGroup
                                sx={{
                                    position: 'absolute',
                                    right: '0.2rem',
                                    top: '-5.5rem',
                                    opacity: 0.6,
                                }}
                                orientation="vertical"
                            >
                                <IconButton
                                    onClick={() => messageListToTop()}
                                    sx={{ visibility: atScrollTop ? 'hidden' : 'visible' }}
                                >
                                    <ArrowCircleUpIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => messageListToBottom()}
                                    sx={{ visibility: atScrollBottom ? 'hidden' : 'visible' }}
                                >
                                    <ArrowCircleDownIcon />
                                </IconButton>
                            </ButtonGroup>
                        )}
                        <InputBox
                            quoteCache={quoteCache}
                            setQuotaCache={setQuoteCache}
                            onSubmit={async (newUserMsg, needGenerating = true) => {
                                if (needGenerating) {
                                    const promptsMsgs = [...store.currentSession.messages, newUserMsg]
                                    const newAssistantMsg = createMessage('assistant', '....')
                                    store.currentSession.messages = [
                                        ...store.currentSession.messages,
                                        newUserMsg,
                                        newAssistantMsg,
                                    ]
                                    store.updateChatSession(store.currentSession)
                                    generate(store.currentSession, promptsMsgs, newAssistantMsg)
                                    messageScrollRef.current = { msgId: newAssistantMsg.id, smooth: true }
                                } else {
                                    store.currentSession.messages = [...store.currentSession.messages, newUserMsg]
                                    store.updateChatSession(store.currentSession)
                                    messageScrollRef.current = { msgId: newUserMsg.id, smooth: true }
                                }
                            }}
                            textareaRef={textareaRef}
                        />
                    </Box> */}
                </Stack>
            </Grid>

            {/* <SettingDialog
                open={openSettingDialog}
                settings={store.settings}
                save={(settings) => {
                    store.setSettings(settings)
                    setOpenSettingDialog(false)
                    if (settings.fontSize !== store.settings.fontSize) {
                        store.addToast(t('font size changed, effective after next launch'))
                    }
                }}
                close={() => setOpenSettingDialog(false)}
            />
            <AboutDialog
                open={openAboutDialog}
                version={store.version}
                lang={store.settings.language}
                close={() => setOpenAboutDialog(false)}
            /> */}
            {/* {configureChatConfig !== null && (
                <ChatConfigDialog
                    open={configureChatConfig !== null}
                    session={configureChatConfig}
                    save={(session) => {
                        store.updateChatSession(session)
                        setConfigureChatConfig(null)
                    }}
                    close={() => setConfigureChatConfig(null)}
                />
            )}
            {sessionClean !== null && (
                <CleanWidnow
                    open={sessionClean !== null}
                    session={sessionClean}
                    save={(session) => {
                        sessionClean.messages.forEach((msg) => {
                            msg?.cancel?.()
                        })

                        store.updateChatSession(session)
                        setSessionClean(null)
                    }}
                    close={() => setSessionClean(null)}
                />
            )}
            {store.toasts.map((toast) => (
                <Snackbar
                    key={toast.id}
                    open
                    onClose={() => store.removeToast(toast.id)}
                    message={toast.content}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                />
            ))} */}
        </Grid>
    </Box>
)
}

// Define the App component
function App() {
  // Get the user's login status from the useAuth hook
  const isLogin = useAuth();
  console.log(isLogin);

  // Render different content based on the user's login status
  return (
    // The user is logged in
    isLogin && (
      <div className="App">
        <Main></Main>

      </div>
    )
    // The user is not logged in
    || (
      <div>Not logged in</div>
    )
  );
}

// Export the App component
export default App;
