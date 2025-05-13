import { Add, AddCircleRounded, ArrowLeft, Home, Search, UnfoldMore } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import AllProjectTab from './dashProject/AllProjectTab'
import useThemeStore from '../../data/Store/themeStore.ts'
import { Link } from 'react-router-dom'
import { useProjectStore } from '../../data/Store/useProjectStore.ts'
import { useEffect, useState } from 'react'

const styledButton = { '&:hover': { boxShadow: 'none' }, boxShadow: 'none', textTransform: 'none', borderRadius: '5px' }

const DashProject = () => {

    const { darkMode } = useThemeStore();
    const { loading, getProjects, getProjectsParticipated, projects } = useProjectStore();

    const [typeProject, setTypeProject] = useState<string>("myProject");
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        if (typeProject === "myProject") {
            getProjects(searchTerm);
        } else if (typeProject === "participated") { //je dois revoir cette partie car lorque je passe en participated les projects précedente reste
            getProjectsParticipated(searchTerm)
        }
    }, [getProjects, getProjectsParticipated, typeProject, searchTerm]);

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
                        Projects
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

                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ width: '100%' }} >
                    <Box sx={{ position: 'relative', flex: 1, minWidth: 250, }}>
                        <Search sx={{ position: 'absolute', top: 8, left: 8, color: 'rgb(117, 116, 116)' }} />
                        <TextField type='text' variant='outlined'
                            placeholder='Search project...'
                            size='small'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                    <FormControl sx={{ minWidth: 200 }} size='small' >
                        <Select sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}
                            IconComponent={UnfoldMore} defaultValue={"myProject"}
                            onChange={(e) => setTypeProject(e.target.value)}
                        >
                            <MenuItem value="myProject"
                                sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }} >
                                My projects
                            </MenuItem>

                            <MenuItem value="participated"
                                sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}>
                                Participated  projects
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <AllProjectTab projectsDatas={projects} loading={loading} typeProject={typeProject} />
            </Stack>
        </Box>
    )
}

export default DashProject
