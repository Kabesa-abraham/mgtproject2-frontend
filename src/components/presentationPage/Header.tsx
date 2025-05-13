import { Brightness5Rounded, Brightness4Rounded } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { lightTheme, darkTheme } from '../../data/theme/theme.js';
import useThemeStore from '../../data/Store/themeStore.js';
import { useAuthStore } from '../../data/Store/useAuthStore.js';

const appBarStyle: object = {
    borderBottom: '1px solid rgba(204, 204, 204, 0.58)',
    backgroundColor: lightTheme.palette.background.default, color: lightTheme.palette.text.primary,
    boxShadow: 'none'
}
const flexCenter: object = {
    display: 'flex', alignItems: 'center'
}
const logo = { fontSize: { xs: '.7rem', sm: '1rem', md: '1.2rem' }, fontWeight: 'bold' }
const UserBox = {
    ...flexCenter, gap: { xs: '.5rem', sm: '2rem', md: '3rem' }, backgroundColor: 'white', padding: '4px 15px',
    borderRadius: '12px', border: '.5px solid #E2E0E0', cursor: 'pointer', boxShadow: '0px 1px 1px rgba(56, 72, 78, 0.25)'
}
const sunStyle = { width: { xs: '1rem', md: '1.2rem' }, height: { xs: '1rem', md: '1.2rem' }, color: lightTheme.palette.primary.main }

const Header = () => {

    const { darkMode, toggleTheme } = useThemeStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" sx={{
            ...appBarStyle,
            ...(darkMode && { backgroundColor: darkTheme.palette.background.default, color: darkTheme.palette.primary.main })
        }} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', minHeight: '52px !important' }} >
                <Link to={'/website'} style={{ textDecoration: 'none', color: 'inherit' }} ><Typography component={'h3'} variant="h3" sx={logo} >
                    Oragon<span style={{ color: '#1F73F4' }}>2.0</span>
                </Typography></Link>

                <Box sx={{ ...flexCenter, gap: '1rem' }} >
                    {
                        user &&
                        <Box sx={UserBox} onClick={() => { navigate('/profile') }} >
                            <Typography component={'p'} sx={{ fontSize: { xs: '.7rem', sm: '1rem' }, fontWeight: 'light' }} >
                                {user.firstName + ' ' + user.lastName}
                            </Typography>

                            <Avatar sx={{ bgcolor: '#1F73F4', width: 30, height: 30, padding: 0, margin: 0 }} alt={user.firstName + ' ' + user.lastName} src={user.image} />
                        </Box>
                    }

                    <IconButton sx={{ backgroundColor: "#F3F3F3", border: '.5px solid #D3CECE' }} >
                        {darkMode ? <Brightness4Rounded sx={sunStyle} onClick={toggleTheme} />
                            :
                            <Brightness5Rounded sx={sunStyle} onClick={toggleTheme} />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header
