import { styled, alpha } from '@mui/material/styles';
import { Menu, Close } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Button, IconButton, Container, Divider, MenuItem, Drawer, Link as MUILink } from '@mui/material'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { lightTheme, darkTheme } from '../../data/theme/theme';
import useThemeStore from '../../data/Store/themeStore.js';
import { useAuthStore } from '../../data/Store/useAuthStore.js';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    backgroundColor: 'rgba(243, 248, 255, 0.69)',//'#F3F8FF',
    boxShadow: '1px 2px 4px rgba(36, 35, 35, 0.1)',
    padding: '2px 12px',
}));

const LinkMui = styled(MUILink)(() => ({
    textDecoration: 'none', color: 'inherit'
}))

const menuItemStyle = { borderRadius: '10px', transition: 'all 0.2s ease-in-out', fontSize: '.9rem', fontWeight: 'semibold' }
const signINUObtn = { textTransform: 'none', padding: "7px 12px", borderRadius: '8px', boxShadow: 0 }

export default function AppAppBar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const { darkMode } = useThemeStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: { xs: 'calc(var(--template-frame-height, 0px) + 65px)', md: 'calc(var(--template-frame-height, 0px) + 80px)' },
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense"
                    disableGutters
                    sx={{ ...(darkMode && { bgcolor: 'rgba(15, 19, 22, 0.47)', border: '1px solid rgba(223, 237, 248, 0.2)' }) }} >
                    <Box sx={{
                        flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, px: 0,
                        color: (darkMode ? darkTheme.palette.text.primary : 'rgb(59, 59, 59)')
                    }}>
                        <LinkMui href="#home" ><MenuItem sx={{ ...menuItemStyle }} >Home</MenuItem></LinkMui>
                        <LinkMui href="#about" ><MenuItem sx={menuItemStyle} >About us</MenuItem></LinkMui>
                        <LinkMui href="#features" ><MenuItem sx={menuItemStyle} >Features</MenuItem></LinkMui>
                        <LinkMui href="#pricing" ><MenuItem sx={menuItemStyle} >Pricing</MenuItem></LinkMui>
                        <LinkMui href="#contact" ><MenuItem sx={menuItemStyle} >Contact us</MenuItem></LinkMui>
                        <LinkMui href="#faq" ><MenuItem sx={menuItemStyle} >FAQ</MenuItem></LinkMui>
                    </Box>
                    {
                        user ? (
                            <Button onClick={() => navigate('/')}
                                sx={{ display: { xs: 'none', md: 'inline' }, bgcolor: 'rgb(54, 190, 13)', color: "#fff", ...signINUObtn }}>Go to dashboard</Button>
                        ) : (
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: 1,
                                    alignItems: 'center',
                                }}
                            >
                                <Link to={'/login'} >
                                    <Button variant="text" size="small"
                                        sx={{ color: (darkMode ? darkTheme.palette.text.primary : "#5F5C5C"), ...signINUObtn }} >
                                        Sign in
                                    </Button>
                                </Link>
                                <Link to={'/signup'} >
                                    <Button variant="contained" size="small"
                                        sx={{
                                            ...(darkMode ? { color: darkTheme.palette.text.primary } : { bgcolor: '#000', }),
                                            '&:hover': { bgcolor: (darkMode ? 'rgb(9, 117, 240)' : 'rgb(49, 49, 49)'), boxShadow: 0 }, ...signINUObtn
                                        }} >
                                        Sign up
                                    </Button>
                                </Link>
                            </Box>
                        )
                    }

                    {/*mobile menu */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                            <IconButton aria-label="Menu button" onClick={toggleDrawer}>
                                <Menu />
                            </IconButton>

                            {
                                user ? (
                                    <Button onClick={() => navigate('/')}
                                        sx={{ bgcolor: 'rgb(54, 190, 13)', color: "#fff", ...signINUObtn }}>Go to dashboard</Button>
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Link to={'/login'} ><Button variant="text" size="small" sx={{ color: '#5F5C5C', ...signINUObtn }} >
                                            Sign in
                                        </Button></Link>
                                        <Link to={'/signup'} ><Button variant="contained" size="small" sx={{ bgcolor: '#000', '&:hover': { bgcolor: 'rgb(49, 49, 49)', boxShadow: 0 }, ...signINUObtn }} >
                                            Sign up
                                        </Button></Link>
                                    </Box>
                                )
                            }


                        </Box>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer}
                        >
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                                    <IconButton onClick={toggleDrawer}>
                                        <Close />
                                    </IconButton>
                                </Box>

                                <LinkMui href="#home" onClick={toggleDrawer} ><MenuItem sx={menuItemStyle} >Home</MenuItem></LinkMui>
                                <LinkMui href="#about" onClick={toggleDrawer} ><MenuItem sx={menuItemStyle} >About us</MenuItem></LinkMui>
                                <LinkMui href="#features" onClick={toggleDrawer} ><MenuItem sx={menuItemStyle} >Features</MenuItem></LinkMui>
                                <LinkMui href="#pricing" onClick={toggleDrawer} ><MenuItem sx={menuItemStyle} >Pricing</MenuItem></LinkMui>
                                <LinkMui href="#contact" onClick={toggleDrawer} ><MenuItem sx={menuItemStyle} >Contact us</MenuItem></LinkMui>
                                <LinkMui href="#faq" onClick={toggleDrawer} ><MenuItem sx={menuItemStyle} >FAQ</MenuItem></LinkMui>

                                {
                                    !user && (
                                        <>
                                            <Divider sx={{ my: 3 }} />

                                            <Link to={'/signup'} ><Button variant="contained" size="small" sx={{ bgcolor: '#000', '&:hover': { bgcolor: 'rgb(49, 49, 49)', boxShadow: 0 }, ...signINUObtn }} fullWidth >
                                                Sign up
                                            </Button></Link>
                                            <Link to={'/login'} ><Button variant="text" size="small" sx={{ color: '#5F5C5C', ...signINUObtn, mt: 1 }} fullWidth >
                                                Sign in
                                            </Button></Link>
                                        </>
                                    )
                                }

                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar >
    );
}