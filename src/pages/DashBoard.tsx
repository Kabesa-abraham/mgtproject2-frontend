import { AppBar, Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import DashSidebar from '../components/DashboardPage/DashSidebar'
import { Outlet } from 'react-router-dom'
import { lightTheme, darkTheme } from '../data/theme/theme.ts'
import useThemeStore from '../data/Store/themeStore.ts'
import { Menu } from '@mui/icons-material'
import { useState } from 'react'


const DashBoard = () => {
    const { darkMode } = useThemeStore();

    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{
            width: '100%', height: '100vh', display: 'flex',
            bgcolor: (darkMode === false ? lightTheme.palette.background.default : darkTheme.palette.background.default),
            color: (darkMode === false ? lightTheme.palette.text.primary : darkTheme.palette.text.primary),
        }}>
            <DashSidebar isMobile={isMobile} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Box sx={{ width: '100%' }} >
                <AppBar position="fixed" sx={{
                    backgroundColor: (darkMode === false ? lightTheme.palette.background.default : darkTheme.palette.background.default),
                    color: (darkMode === false ? lightTheme.palette.text.primary : darkTheme.palette.text.primary),
                    boxShadow: '0 2px 5px rgba(40, 154, 247, 0.16)', zIndex: 50, padding: '5px',
                    display: { xs: 'block', md: 'none' },
                }}>
                    <IconButton onClick={handleDrawerToggle} >
                        <Menu />
                    </IconButton>
                </AppBar>

                <Box component={'div'} sx={{ width: '100%', height: '100vh', padding: { xs: '70px 10px', md: '40px 30px' } }} >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default DashBoard
