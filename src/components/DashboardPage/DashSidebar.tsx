import { styled, Box, Divider, Stack, Typography, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Drawer as MuiDrawer, drawerClasses } from '@mui/material'
import { Link } from 'react-router-dom';
import SidebarProfileContent from './dashSidebar/SidebarProfileContent';
import { WbSunnyOutlined, DarkModeOutlined, SpaceDashboard, CalendarMonth, AutoGraph, ExpandLess, ExpandMore, Dns, FolderCopy, Add, Task, Settings, Language } from '@mui/icons-material'
import useThemeStore from '../../data/Store/themeStore.ts';
import { useState } from 'react';
import { darkTheme } from '../../data/theme/theme.ts';

const deleteStyleLink = { textDecoration: 'none', color: 'inherit' };

type SideBarProps = {
    isMobile: boolean,
    mobileOpen: boolean,
    handleDrawerToggle: () => void
}

const drawerWidth = 240;
const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    //mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

const logo = { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 'bold' };
const spacingOption = { minWidth: '30px', mr: 1, color: '#848484' };

export default function SideMenu({ isMobile, mobileOpen, handleDrawerToggle }: SideBarProps) {

    const { darkMode, toggleTheme } = useThemeStore();

    const [projectOpen, setProjectOpen] = useState(false); //for the project section
    const toggleProjectOpen = () => {
        setProjectOpen(!projectOpen);
    };

    const [taskOpen, setTaskOpen] = useState(false); //for the task section
    const toggleTaskOpen = () => {
        setTaskOpen(!taskOpen);
    };


    return (
        <>
            <Drawer
                variant='permanent'
                sx={{
                    display: { xs: 'none', md: 'block' },
                    [`& .${drawerClasses.paper}`]: { //donc on stylise beaucoup plus le paper car c'est lui qui est visible
                        backgroundColor: 'rgb(246, 251, 255, 0.03)',
                        borderRight: '1xp solid #7E7C7C ',
                    },
                }}
            >
                <Box sx={{ padding: '15px 15px 30px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Typography component={'h3'} variant="h3" sx={logo} >
                        ORAGON<span style={{ color: '#1F73F4' }}>2.0</span>
                    </Typography>

                    <IconButton sx={{ border: '.5px solid #D3CECE', borderRadius: '12px', padding: '5px' }} onClick={toggleTheme}>
                        {darkMode ? <DarkModeOutlined sx={{ width: '20px', height: '20px' }} />
                            :
                            <WbSunnyOutlined sx={{ width: '20px', height: '20px' }} />}
                    </IconButton>
                </Box>
                <Divider />

                <Box
                    sx={{
                        display: 'flex',
                        mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                        p: 1.5,
                    }}
                >
                    <SidebarProfileContent />
                </Box>

                <Divider />
                <Box
                    sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column', }}
                >
                    <List>
                        <Link to={'/'} style={{ ...deleteStyleLink }} >
                            <ListItemButton>
                                <ListItemIcon sx={{ ...spacingOption }} >
                                    <SpaceDashboard sx={{ fontSize: 18 }} />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </Link>

                        <ListItemButton onClick={toggleProjectOpen} >
                            <ListItemIcon sx={{ ...spacingOption }} >
                                <FolderCopy sx={{ fontSize: 18 }} />
                            </ListItemIcon>
                            <ListItemText primary="Projects" />
                            {projectOpen ? <ExpandLess sx={{ color: '#848484', fontSize: 17 }} /> : <ExpandMore sx={{ color: '#848484', fontSize: 17 }} />}
                        </ListItemButton>

                        {/* subOptions of Project */}
                        <Collapse in={projectOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to={'/projects'} style={{ ...deleteStyleLink }} >
                                    <ListItemButton sx={{ pl: 4 }} onClick={toggleProjectOpen} >
                                        <ListItemIcon sx={{ ...spacingOption }} >
                                            <Dns />
                                        </ListItemIcon>
                                        <ListItemText primary="All Projects"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: '12px',
                                                    fontWeight: 'semibold',
                                                },
                                            }} />
                                    </ListItemButton>
                                </Link>
                                <Link to={'projects/newProject'} style={{ ...deleteStyleLink }}>
                                    <ListItemButton sx={{ pl: 4 }} onClick={toggleProjectOpen}>
                                        <ListItemIcon sx={{ ...spacingOption }} >
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Project"
                                            sx={{
                                                "& .MuiTypography-root": {
                                                    fontSize: '12px',
                                                    fontWeight: 'semibold',
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={toggleTaskOpen} >
                            <ListItemIcon sx={{ ...spacingOption }} >
                                <Task sx={{ fontSize: 18 }} />
                            </ListItemIcon>
                            <ListItemText primary="Tasks" />
                            {taskOpen ? <ExpandLess sx={{ color: '#848484', fontSize: 17 }} /> : <ExpandMore sx={{ color: '#848484', fontSize: 17 }} />}
                        </ListItemButton>

                        {/* subOptions of tasks */}
                        <Collapse in={taskOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to={'/tasks'} style={{ ...deleteStyleLink }} >
                                    <ListItemButton sx={{ pl: 4 }} onClick={toggleTaskOpen} >
                                        <ListItemIcon sx={{ ...spacingOption }} >
                                            <Dns />
                                        </ListItemIcon>
                                        <ListItemText primary="All Tasks"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: '12px',
                                                    fontWeight: 'semibold',
                                                },
                                            }} />
                                    </ListItemButton>
                                </Link>
                                <Link to={'/tasks/newTask'} style={{ ...deleteStyleLink }} >
                                    <ListItemButton sx={{ pl: 4 }} onClick={toggleTaskOpen} >
                                        <ListItemIcon sx={{ ...spacingOption }} >
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Task"
                                            sx={{
                                                "& .MuiTypography-root": {
                                                    fontSize: '12px',
                                                    fontWeight: 'semibold',
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>


                        <Link to={'/calendar'} style={{ ...deleteStyleLink }} >
                            <ListItemButton>
                                <ListItemIcon sx={{ ...spacingOption }} >
                                    <CalendarMonth sx={{ fontSize: 18 }} />
                                </ListItemIcon>
                                <ListItemText primary="Calendar" />
                            </ListItemButton>
                        </Link>

                    </List>
                </Box>


                <Stack
                    direction="row"
                    sx={{
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <List sx={{ width: '100%' }} >

                        <Link to={'/website'} style={{ ...deleteStyleLink }} >
                            <ListItemButton>
                                <ListItemIcon sx={{ ...spacingOption, color: '#2F88BF' }} >
                                    <Language sx={{ fontSize: 18 }} />
                                </ListItemIcon>
                                <ListItemText primary="WebSite" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Stack>
            </Drawer>

            {
                isMobile && (
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            [`& .${drawerClasses.paper}`]: { //donc on stylise beaucoup plus le paper car c'est lui qui est visible
                                backgroundColor: (darkMode ? '#000' : '#fff'),
                                borderRight: '1xp solid #7E7C7C ',
                            },
                        }}
                    >
                        <Box sx={{ padding: '15px 15px 30px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <Typography component={'h3'} variant="h3" sx={logo} >
                                ORAGON<span style={{ color: '#1F73F4' }}>2.0</span>
                            </Typography>

                            <IconButton sx={{ border: '.5px solid #D3CECE', borderRadius: '12px', padding: '5px' }} onClick={toggleTheme}>
                                {darkMode ? <DarkModeOutlined sx={{ width: '20px', height: '20px' }} />
                                    :
                                    <WbSunnyOutlined sx={{ width: '20px', height: '20px' }} />}
                            </IconButton>
                        </Box>
                        <Divider />

                        <Box
                            sx={{
                                display: 'flex',
                                mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                                p: 1.5,
                            }}
                        >
                            <SidebarProfileContent />
                        </Box>

                        <Divider />
                        <Box
                            sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column', }}
                        >
                            <List>
                                <Link to={'/'} style={{ ...deleteStyleLink }} >
                                    <ListItemButton>
                                        <ListItemIcon sx={{ ...spacingOption }} >
                                            <SpaceDashboard sx={{ fontSize: 18 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItemButton>
                                </Link>

                                <ListItemButton onClick={toggleProjectOpen} >
                                    <ListItemIcon sx={{ ...spacingOption }} >
                                        <FolderCopy sx={{ fontSize: 18 }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Projects" />
                                    {projectOpen ? <ExpandLess sx={{ color: '#848484', fontSize: 17 }} /> : <ExpandMore sx={{ color: '#848484', fontSize: 17 }} />}
                                </ListItemButton>

                                {/* subOptions of Project */}
                                <Collapse in={projectOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <Link to={'/projects'} style={{ ...deleteStyleLink }} >
                                            <ListItemButton sx={{ pl: 4 }} onClick={toggleProjectOpen} >
                                                <ListItemIcon sx={{ ...spacingOption }} >
                                                    <Dns />
                                                </ListItemIcon>
                                                <ListItemText primary="All Projects"
                                                    sx={{
                                                        '& .MuiTypography-root': {
                                                            fontSize: '12px',
                                                            fontWeight: 'semibold',
                                                        },
                                                    }} />
                                            </ListItemButton>
                                        </Link>
                                        <Link to={'projects/newProject'} style={{ ...deleteStyleLink }}>
                                            <ListItemButton sx={{ pl: 4 }} onClick={toggleProjectOpen}>
                                                <ListItemIcon sx={{ ...spacingOption }} >
                                                    <Add />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Project"
                                                    sx={{
                                                        "& .MuiTypography-root": {
                                                            fontSize: '12px',
                                                            fontWeight: 'semibold',
                                                        }
                                                    }}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </List>
                                </Collapse>

                                <ListItemButton onClick={toggleTaskOpen} >
                                    <ListItemIcon sx={{ ...spacingOption }} >
                                        <Task sx={{ fontSize: 18 }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Tasks" />
                                    {taskOpen ? <ExpandLess sx={{ color: '#848484', fontSize: 17 }} /> : <ExpandMore sx={{ color: '#848484', fontSize: 17 }} />}
                                </ListItemButton>

                                {/* subOptions of tasks */}
                                <Collapse in={taskOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <Link to={'/tasks'} style={{ ...deleteStyleLink }} >
                                            <ListItemButton sx={{ pl: 4 }} onClick={toggleTaskOpen} >
                                                <ListItemIcon sx={{ ...spacingOption }} >
                                                    <Dns />
                                                </ListItemIcon>
                                                <ListItemText primary="All Tasks"
                                                    sx={{
                                                        '& .MuiTypography-root': {
                                                            fontSize: '12px',
                                                            fontWeight: 'semibold',
                                                        },
                                                    }} />
                                            </ListItemButton>
                                        </Link>
                                        <Link to={'/tasks/newTask'} style={{ ...deleteStyleLink }} >
                                            <ListItemButton sx={{ pl: 4 }} onClick={toggleTaskOpen} >
                                                <ListItemIcon sx={{ ...spacingOption }} >
                                                    <Add />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Task"
                                                    sx={{
                                                        "& .MuiTypography-root": {
                                                            fontSize: '12px',
                                                            fontWeight: 'semibold',
                                                        }
                                                    }}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </List>
                                </Collapse>


                                <Link to={'/calendar'} style={{ ...deleteStyleLink }} >
                                    <ListItemButton>
                                        <ListItemIcon sx={{ ...spacingOption }} >
                                            <CalendarMonth sx={{ fontSize: 18 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Calendar" />
                                    </ListItemButton>
                                </Link>

                                <ListItemButton >
                                    <ListItemIcon sx={{ ...spacingOption }} >
                                        <AutoGraph sx={{ fontSize: 18 }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Analytics" />
                                </ListItemButton>

                            </List>
                        </Box>


                        <Stack
                            direction="row"
                            sx={{
                                width: '100%',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <List sx={{ width: '100%' }} >
                                <Link to={'/website'} style={{ ...deleteStyleLink }} >
                                    <ListItemButton>
                                        <ListItemIcon sx={{ ...spacingOption, color: '#2F88BF' }} >
                                            <Language sx={{ fontSize: 18 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="WebSite" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Stack>
                    </Drawer>
                )
            }

        </>
    )
}