import { ArrowLeft, Home } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import useThemeStore from '../../data/Store/themeStore.js'
import Calendar from './dashCalendar/Calendar.tsx'
import { Link } from 'react-router-dom'
import { useTaskStore } from '../../data/Store/useTaskStore.js'
import { useEffect, useState } from 'react'
import ProjectSelect from './dashTask/AutoCompleteProject.tsx'



const DashCalendar = () => {

    const { tasks, getAllTasks } = useTaskStore();

    useEffect(() => {//for fetching tasks
        getAllTasks("", "", "");
    }, [getAllTasks])

    const [theProjectId, setTheProjectId] = useState("");
    useEffect(() => {
        getAllTasks("", "", theProjectId);
    }, [getAllTasks, theProjectId]);

    const { darkMode } = useThemeStore();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack spacing={2} sx={{ width: '100%' }} >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1, color: 'rgb(160, 160, 160)' }} >
                    <Home sx={{ fontSize: '20px' }} />
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <Typography variant='h4' sx={{ fontWeight: 400, color: 'rgb(122, 122, 122)', fontSize: '12px' }}>
                            Dashboard
                        </Typography>
                    </Link>
                </Box>

                <Stack spacing={5} direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                    <Typography variant='h4' component={'h4'} sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'rgb(26, 26, 26)', fontSize: { xs: '15px', md: '18px' } }}>
                        Calendar
                    </Typography>

                    <ProjectSelect onSelect={(projectId) => setTheProjectId(projectId)} selectedProjectId={theProjectId} />
                </Stack>

                <Calendar tasks={tasks} />
            </Stack>
        </Box >
    )
}

export default DashCalendar
