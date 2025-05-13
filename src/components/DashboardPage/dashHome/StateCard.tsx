import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import useThemeStore from '../../../data/Store/themeStore.ts'

type StateCardProps = {
    icon: React.ReactElement<any, any>;
    title: string;
    value: number;
    iconColor: string
}

const StateCard = ({ icon, title, value, iconColor }: StateCardProps) => {

    const styledIcon = React.cloneElement(icon, {
        sx: { fontSize: '60px', color: iconColor, mr: 2 },
    });

    const { darkMode } = useThemeStore();

    return (
        <Card sx={{
            maxHeight: '150px', height: '100%', width: '100%', bgcolor: darkMode ? 'rgb(10, 10, 10)' : '',
            p: 2, boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(125, 132, 143, 0.34)' : 'rgba(0, 0, 0, 0.12)'} `, borderRadius: '5px',
            position: 'relative'
        }}>
            <Box component={'div'} sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                borderBottom: '1px solid rgba(148, 148, 148, 0.12)', pb: 2
            }} >
                <Box sx={{ mr: "2px", }}>{styledIcon}</Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', }} >
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 25 }}>{value}</Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: 14, fontWeight: 400 }} >{title}</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default StateCard
