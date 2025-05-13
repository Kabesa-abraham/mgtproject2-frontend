import { ArrowLeft, Delete, Edit, Home } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CircularProgress, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import useThemeStore from '../../../data/Store/themeStore.js'
import { useProjectStore } from '../../../data/Store/useProjectStore.js'
import { useAuthStore } from '../../../data/Store/useAuthStore.js'
import { useTaskStore } from '../../../data/Store/useTaskStore.js'
import dayjs from 'dayjs';
import Swal from 'sweetalert2'

//cet composant n'est pas encore fini
const TheProject = () => {
    const { darkMode } = useThemeStore();
    const { theProject, getTheProject, projectLoading, deleteProject } = useProjectStore();
    const { user } = useAuthStore();
    const { getAllTasks, tasks } = useTaskStore();
    const { projectId } = useParams(); //return _id of project
    const navigate = useNavigate();

    useEffect(() => {
        if (projectId) {
            getTheProject(projectId);
            getAllTasks("", "", projectId); //get all tasks of the project
        }
    }, [getTheProject, projectId]);

    const deleteTheProject = async (projectId: string) => {
        if (projectId) {
            const res = await deleteProject(projectId);
            if (res) {
                navigate('..')
            }
        }
    }
    const mySwalAlertDelete = (projectId: string) => {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            text: 'Are you sure you want to delete this project?',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
            confirmButtonText: 'Delete',
        }).then((res) => {
            if (res.isConfirmed) {
                deleteTheProject(projectId);
            }
        })
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }} >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1, color: 'rgb(160, 160, 160)' }} >
                    <Home sx={{ fontSize: '20px' }} />
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <Typography variant='h4' sx={{ fontWeight: 400, color: 'rgb(122, 122, 122)', fontSize: '12px' }}>
                            Dashboard
                        </Typography>
                    </Link>
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Link to={'..'} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <Typography variant='h4' sx={{ fontWeight: 400, color: 'rgb(122, 122, 122)', fontSize: '12px' }}>
                            All Projects
                        </Typography>
                    </Link>
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Typography variant='h4' sx={{ fontWeight: 500, color: 'rgb(44, 110, 233)', fontSize: '14px' }}>
                        Project
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1'
                        sx={{ color: 'rgb(129, 129, 129)', fontSize: '14px', fontWeight: 400, mb: 1, mt: 2 }}
                    >The Project</Typography>
                    <Divider />
                </Box>

                {
                    projectLoading ? (
                        <CircularProgress size={30} color='primary' sx={{ mx: 'auto', my: 5 }} />
                    ) : (
                        <Container maxWidth='lg' sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }} >

                            <Stack direction={'row'} spacing={2}
                                sx={{ justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.5)' : 'rgb(219, 219, 219)'}`, padding: 2, borderRadius: 2 }} >
                                <Stack>
                                    <Typography variant='body1' sx={{ textDecoration: 'underline', color: 'rgb(85, 85, 85)', mb: 1, fontSize: 14 }} >Author</Typography>
                                    <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }} >
                                        <Avatar
                                            src={theProject?.creator?.image}
                                            sx={{ width: 37, height: 37 }}
                                        />
                                        <Stack>
                                            <Typography variant="body1" fontWeight={500} fontSize={14} >
                                                {theProject?.creator?.firstName + " " + theProject?.creator?.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="gray" fontSize={12} >
                                                {theProject?.creator && theProject?.creator?.email.length > 20 ? theProject?.creator?.email.substring(0, 20) + "..." : theProject?.creator?.email.substring(0, 50)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                {
                                    theProject?.creator?._id === user?._id && (
                                        <Stack direction={'row'} spacing={2}>
                                            <Button startIcon={<Edit />} onClick={() => navigate(`/projects/updateProject/${theProject?._id}`)} sx={{
                                                color: darkMode ? 'rgb(184, 184, 184)' : 'rgb(54, 54, 54)',
                                                textTransform: 'none',
                                                px: 1,
                                                borderRadius: 2,
                                                fontWeight: 500,
                                                fontSize: 14,
                                                "&:hover": { bgcolor: 'rgba(66, 66, 66, 0.1)' }
                                            }} ><p>Edit</p></Button>

                                            <Button startIcon={<Delete />}
                                                onClick={() => { if (theProject) mySwalAlertDelete(theProject?._id) }}
                                                sx={{
                                                    color: 'rgb(218, 61, 61)',
                                                    textTransform: 'none',
                                                    px: 1,
                                                    borderRadius: 2,
                                                    fontWeight: 500,
                                                    fontSize: 14,
                                                    "&:hover": { bgcolor: 'rgba(230, 48, 48, 0.1)' }
                                                }} ><p>Delete</p></Button>
                                        </Stack>
                                    )
                                }
                            </Stack>

                            <Stack direction={'column'} spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Typography variant='h3' sx={{ fontSize: { xs: 20, md: 25 }, fontWeight: 500 }} >{theProject?.projectName}</Typography>
                                {
                                    theProject?.projectDesc ?
                                        <Typography variant='body1' sx={{ color: 'rgb(128, 128, 128)', fontSize: { xs: 12, md: 15 } }}>
                                            {theProject?.projectDesc}
                                        </Typography>
                                        : <Typography variant='body1' sx={{ color: 'rgb(90, 90, 90)', textAlign: 'center', py: 3, fontSize: { xs: 12, md: 14 } }}>
                                            This project does not have a description
                                        </Typography>
                                }
                            </Stack>


                            <Card
                                sx={{
                                    boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.5)' : 'rgb(219, 219, 219)'}`,
                                    borderRadius: '5px', width: '100%', mx: 'auto', bgcolor: darkMode ? 'rgb(8, 8, 8)' :
                                        'rgba(223, 238, 252, 0.1)', mb: 3, padding: '10px 20px'
                                }}
                            >

                                <Stack direction={'column'} spacing={2} sx={{ mt: 2 }} >
                                    <Box component={'div'} >
                                        <Stack spacing={2} >
                                            <Typography variant='body1' sx={{ fontSize: { xs: 12, md: 14 } }} >
                                                The project was created on <strong style={{ color: 'rgb(110, 110, 110)' }} >{dayjs(theProject?.createdAt).format('DD/MM/YYYY - HH:mm')}</strong>
                                            </Typography>
                                            <Divider />

                                            {theProject &&
                                                theProject?.members?.length > 1 && (
                                                    <Stack direction={'column'} spacing={2} >
                                                        <Typography variant='body1' sx={{ textDecoration: 'underline', color: 'rgb(85, 85, 85)', mb: 1, fontSize: 14 }} >
                                                            Project Members
                                                        </Typography>
                                                        <Grid container spacing={3} >
                                                            {
                                                                theProject?.members?.slice(1).map((member, index: number) => (
                                                                    <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }} sx={{ display: 'flex', gap: 1, alignItems: 'center' }} >
                                                                        <Avatar
                                                                            src={member?.image}
                                                                            sx={{ width: 30, height: 30 }}
                                                                        />
                                                                        <Stack>
                                                                            <Typography variant="body1" fontWeight={400} fontSize={14} >
                                                                                {member?.firstName + " " + member?.lastName}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="gray" fontSize={12} >
                                                                                {member && member?.email.length > 20 ? member?.email.substring(0, 20) + "..." : member?.email.substring(0, 50)}
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                        <Divider />
                                                    </Stack>
                                                )
                                            }

                                        </Stack>
                                    </Box>

                                    <Box>
                                        <Typography variant='body1' sx={{ textDecoration: 'underline', color: 'rgb(85, 85, 85)', mb: 1, fontSize: 14 }} >All Tasks</Typography>
                                        {
                                            tasks?.length > 0 ? (
                                                tasks?.map((task: any, index: number) => (
                                                    <Typography key={index} variant='body1' sx={{ fontSize: { xs: 12, md: 14 }, mb: 1 }} >
                                                        <Link to={`/tasks/theTask/${task._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                                                            {task.taskName.length > 100 ? task.taskName.slice(0, 100) + '...' : task.taskName}
                                                            <span style={task.status === 'Completed' ? { color: 'rgb(5, 139, 218)' }
                                                                : task.status === 'To do' ? { color: 'rgb(85, 85, 85)' } : { color: 'rgb(231, 152, 5)' }} > - {task.status}</span>
                                                        </Link>

                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography variant='body1' sx={{ color: 'rgb(90, 90, 90)', textAlign: 'center', py: 3, fontSize: { xs: 12, md: 14 } }}>
                                                    This project does not have any tasks yet
                                                </Typography>
                                            )

                                        }
                                    </Box>
                                </Stack>
                            </Card>
                        </Container>
                    )
                }
            </Box>
        </Box>
    )
}

export default TheProject
