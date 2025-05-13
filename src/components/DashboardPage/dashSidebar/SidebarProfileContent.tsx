import MenuItem from '@mui/material/MenuItem';
import { Box, Typography, IconButton, Menu, Avatar, Stack } from '@mui/material';
import { MoreVert, Person, LogoutOutlined, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../data/Store/useAuthStore.js';


export default function SidebarProfileContent() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl); //pour savoir si le menu est ouvert ou pas en convertissant l'élément d'ancrage en boolean

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation(); // Empêche les conflits de clics
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const logoutUser = async () => {
        const loggedOut = await logout();
        if (loggedOut === true) navigate('/website');
    }

    return (
        <>
            <Box sx={{ width: "100%", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }} onClick={handleClick}>
                {/* Profil Section */}
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "black", color: 'white', width: 40, height: 40 }} src={user?.image} ></Avatar>
                    <Stack >
                        <Typography variant="body1" fontWeight={500} fontSize={14} >{user?.firstName + " " + user?.lastName}</Typography>
                        <Typography variant="body2" color="gray" fontSize={12} >
                            {user && user?.email.length > 16 ? user?.email.substring(0, 16) + "..." : user?.email.substring(0, 50)}
                        </Typography>
                    </Stack>
                    <IconButton sx={{ mt: 1 }}>
                        <MoreVert />
                    </IconButton>
                </Box>

                {/* Menu qui s'affiche */}
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
                    <MenuItem onClick={() => { navigate('/profile') }}
                    >
                        <Person sx={{ color: 'rgb(25, 111, 209)' }} />
                        <Typography variant="body2" sx={{ ml: 1 }}>My Account</Typography>
                    </MenuItem>

                    <MenuItem onClick={logoutUser}>
                        <LogoutOutlined sx={{ color: 'rgb(194, 39, 65)' }} />
                        <Typography variant="body2" sx={{ ml: 1 }}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
}