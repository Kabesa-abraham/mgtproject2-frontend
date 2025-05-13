import { Add, AddCircleRounded, ArrowLeft, Home, Search, UnfoldMore } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import useThemeStore from '../../data/Store/themeStore.js'
import AllTaskTab from './dashTask/AllTaskTab.tsx'
import { Link } from 'react-router-dom'
const styledButton = { '&:hover': { boxShadow: 'none' }, boxShadow: 'none', textTransform: 'none', borderRadius: '5px' }
import { useTaskStore } from '../../data/Store/useTaskStore.js'
import { useEffect, useState } from 'react'
import ProjectSelect from './dashTask/AutoCompleteProject.tsx'


const DashTask = () => {

    const { darkMode } = useThemeStore();
    const { getAllTasks, tasks, loading } = useTaskStore();
    const [searchTerm, setSeachTerm] = useState("");
    const [status, setStatus] = useState("");
    const [changeBarSearch, setChangeBarSearch] = useState("task") //for changing the search bar for task or project
    const [theProjectId, setTheProjectId] = useState("");

    useEffect(() => {
        getAllTasks(searchTerm, status === "uncategorized" ? "" : status, theProjectId);
    }, [getAllTasks, searchTerm, status, theProjectId])

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
                        Tasks
                    </Typography>

                    <Stack spacing={{ xs: 1, sm: 2 }} direction={{ xs: 'column', sm: 'row' }}  >
                        <Link to={'/projects/newProject'} style={{ textDecoration: 'none', color: 'inherit' }} >
                            <Button startIcon={<Add />} variant='contained' sx={{ ...styledButton }} size='small' >New project</Button>
                        </Link>
                        <Link to={'/tasks/newTask'} style={{ textDecoration: 'none', color: 'inherit' }} >
                            <Button startIcon={<AddCircleRounded />} variant='outlined' sx={{ ...styledButton }} size='small'>New task</Button>
                        </Link>

                    </Stack>
                </Stack>

                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ alignItems: 'end' }} >
                    {
                        changeBarSearch === "task" ? (
                            <Box sx={{ position: 'relative', flex: 1, minWidth: 125, width: { xs: '100%', md: 'auto' } }}>
                                <Search sx={{ position: 'absolute', top: 8, left: 8, color: 'rgb(117, 116, 116)' }} />
                                <TextField type='text' variant='outlined'
                                    placeholder='Search task...'
                                    size='small'
                                    value={searchTerm}
                                    onChange={(e) => setSeachTerm(e.target.value)}
                                    sx={{
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            padding: '2px 4px 2px 25px', fontSize: 14, height: 36
                                        },
                                        '& input::placeholder': {
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </Box>
                        ) : (<ProjectSelect selectedProjectId={theProjectId} onSelect={projectId => setTheProjectId(projectId)} />)
                    }

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ width: { xs: '100%', md: 'auto' } }} >
                        <Stack>
                            <Typography component={'span'} sx={{ fontSize: 13, color: darkMode ? 'rgb(199, 197, 197)' : 'rgb(75, 75, 75)', mb: '3px' }} >Search by</Typography>
                            <FormControl sx={{ minWidth: 200 }} size='small' >
                                <Select sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}
                                    value={changeBarSearch} onChange={(e) => setChangeBarSearch(e.target.value)}
                                    IconComponent={UnfoldMore}
                                >
                                    <MenuItem value="task" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }} >Task</MenuItem>
                                    <MenuItem value="project" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}>Project</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack>
                            <Typography component={'span'} sx={{ fontSize: 13, color: darkMode ? 'rgb(199, 197, 197)' : 'rgb(75, 75, 75)', mb: '3px' }} >Status</Typography>
                            <FormControl sx={{ minWidth: 200 }} size='small' >
                                <Select sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}
                                    value={status === "" ? "uncategorized" : status} onChange={(e) => setStatus(e.target.value)} IconComponent={UnfoldMore}
                                >
                                    <MenuItem value="uncategorized" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }} >Filter by status</MenuItem>
                                    <MenuItem value="To do" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}>To do</MenuItem>
                                    <MenuItem value="In progress" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }} >In progress</MenuItem>
                                    <MenuItem value="Completed" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Stack>

                <AllTaskTab tasksDatas={tasks} loading={loading} />
            </Stack>
        </Box >
    )
}

export default DashTask
