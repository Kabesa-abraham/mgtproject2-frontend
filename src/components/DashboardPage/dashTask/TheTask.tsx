import { ArrowLeft, DateRangeOutlined, Delete, Edit, Home } from '@mui/icons-material'
import { Avatar, Box, Button, Chip, CircularProgress, Container, Divider, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTaskStore } from '../../../data/Store/useTaskStore.js'
import useThemeStore from '../../../data/Store/themeStore.js'
import { useAuthStore } from '../../../data/Store/useAuthStore.js'
import TaskprogressBar from './TaskprogressBar.js'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

const TheTask = () => {

    const navigate = useNavigate();
    const { darkMode } = useThemeStore();
    const { taskId } = useParams();
    const { getTheTask, theTask, theTaskLoading, deleteTask } = useTaskStore();
    const { user } = useAuthStore();
    useEffect(() => {
        if (taskId) {
            getTheTask(taskId);
        }
    }, [getTheTask, taskId])


    const deleteTheTask = async (taskId: string) => { //remove the task
        if (taskId) {
            const res = await deleteTask(taskId);
            if (res) {
                navigate('..')
            }
        }
    }
    const swalAlertDelete = (taskId: string) => {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            text: 'By clicking Delete, this task will be removed from your project and you will not be able to recover it.',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
            confirmButtonText: 'Delete',
        }).then((res) => {
            if (res.isConfirmed) {
                deleteTheTask(taskId);
            }
        })
    }



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
                            All Tasks
                        </Typography>
                    </Link>
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Typography variant='h4' sx={{ fontWeight: 500, color: 'rgb(44, 110, 233)', fontSize: '14px' }}>
                        Task
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1'
                        sx={{ color: 'rgb(129, 129, 129)', fontSize: '14px', fontWeight: 400, mb: 1, mt: 2 }}
                    >The Task</Typography>
                    <Divider />
                </Box>

                {
                    theTaskLoading ? (
                        <CircularProgress size={30} color='primary' sx={{ mx: 'auto', my: 5 }} />
                    ) : (
                        <Container maxWidth='lg' sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }} >
                            <Stack direction={'row'} spacing={2}
                                sx={{
                                    justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.5)' : 'rgb(219, 219, 219)'}`,
                                    padding: 2, borderRadius: 2
                                }} >
                                <Stack>
                                    <Typography variant='body1' sx={{ textDecoration: 'underline', color: 'rgb(85, 85, 85)', mb: 1, fontSize: 14 }} >Author</Typography>
                                    <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }} >
                                        <Avatar
                                            src={theTask?.assignedTo?.image}
                                            sx={{ width: 37, height: 37 }}
                                        />
                                        <Stack>
                                            <Typography variant="body1" fontWeight={500} fontSize={14} >
                                                {theTask?.assignedTo?.firstName + " " + theTask?.assignedTo?.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="gray" fontSize={12} >
                                                {theTask?.assignedTo && theTask?.assignedTo?.email.length > 20 ? theTask?.assignedTo?.email.substring(0, 20) + "..." : theTask?.assignedTo?.email.substring(0, 50)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                {
                                    theTask?.assignedTo?._id === user?._id && (
                                        <Stack direction={'row'} spacing={2}>
                                            <Button startIcon={<Edit />} onClick={() => navigate(`/tasks/updateTask/${theTask?._id}`)} sx={{
                                                color: darkMode ? 'rgb(184, 184, 184)' : 'rgb(54, 54, 54)',
                                                textTransform: 'none',
                                                px: 1,
                                                borderRadius: 2,
                                                fontWeight: 500,
                                                fontSize: 14,
                                                "&:hover": { bgcolor: 'rgba(66, 66, 66, 0.1)' }
                                            }} ><p>Edit</p></Button>

                                            <Button startIcon={<Delete />}
                                                onClick={() => { if (theTask) swalAlertDelete(theTask?._id) }}
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
                                <Typography variant='h3' sx={{ fontSize: { xs: 20, md: 25 }, fontWeight: 500 }} >{theTask?.taskName}</Typography>
                                {
                                    theTask?.taskDesc ?
                                        <Typography variant='body1' sx={{ color: 'rgb(128, 128, 128)', fontSize: { xs: 12, md: 15 } }}>
                                            {theTask?.taskDesc}
                                        </Typography>
                                        : <Typography variant='body1' sx={{ color: 'rgb(90, 90, 90)', textAlign: 'center', py: 3, fontSize: { xs: 12, md: 14 } }}>
                                            This task does not have a description
                                        </Typography>
                                }
                            </Stack>

                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}
                                sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 2, borderRadius: 2, border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.5)' : 'rgb(219, 219, 219)'}` }} >
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }} >
                                    <Typography variant='body1' sx={{ color: 'rgb(85, 85, 85)', mb: 1, fontSize: 14 }} >Status</Typography>
                                    <Chip label={theTask?.status} size="small"
                                        sx={{
                                            bgcolor: theTask?.status === 'Completed' ? 'rgb(198, 252, 190)' : theTask?.status === 'In progress' ? 'rgba(219, 219, 219, 0.45)' : 'rgb(166, 219, 255)',
                                            color: theTask?.status === 'Completed' ? 'rgb(24, 110, 15)' : theTask?.status === 'In progress' ? 'rgba(68, 68, 68, 0.86)' : 'rgb(3, 76, 124)',
                                            fontWeight: 600, border: '.5px solid rgba(129, 129, 129, 0.16)'
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', borderTop: { xs: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.5)' : 'rgb(219, 219, 219)'}`, md: 'none' } }} >
                                    <Typography variant='body1' sx={{ paddingTop: { xs: 1, md: 0 }, color: 'rgb(85, 85, 85)', mb: 1, fontSize: 14 }} >Project</Typography>

                                    <Link to={`/projects/theProject/${theTask?.projectId?._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                                        <Typography variant='body1' sx={{ color: 'rgb(44, 110, 233)', fontSize: { xs: 12, md: 14 }, textTransform: 'uppercase' }} >
                                            {theTask?.projectId &&
                                                theTask?.projectId?.projectName.length > 150 ?
                                                theTask?.projectId?.projectName.substring(0, 150) + "..."
                                                :
                                                theTask?.projectId?.projectName
                                            }
                                        </Typography>
                                    </Link>

                                </Box>
                            </Stack>

                            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }} >
                                <Typography variant="body2" sx={{ color: 'rgb(101, 128, 155)', mb: 1, fontSize: 16, fontWeight: 700 }} >
                                    Time progression
                                </Typography>
                                {
                                    theTask && <TaskprogressBar task={theTask} />
                                }
                            </Box>

                            {/*date creation and deadLine */}
                            <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'space-between' }} >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }} >
                                    <DateRangeOutlined color='primary' />
                                    <Typography variant='body1' sx={{ color: 'rgb(134, 134, 134)', fontSize: 14 }} >Created at :</Typography>
                                    <Typography variant='body1' sx={{ color: 'rgb(134, 134, 134)', fontSize: { xs: 12, md: 14 } }} >
                                        {theTask?.createdAt && dayjs(theTask?.createdAt).format('DD/MM/YYYY')}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                                    <DateRangeOutlined color='error' />
                                    <Typography variant='body1' sx={{ color: 'rgb(134, 134, 134)', fontSize: 14 }} >DeadLine :</Typography>
                                    <Typography variant='body1' sx={{ color: 'rgb(134, 134, 134)', fontSize: { xs: 12, md: 14 } }} >
                                        {theTask?.deadline ? dayjs(theTask?.deadline).format('DD/MM/YYYY') : 'not defined'}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Container>
                    )
                }
            </Box>
        </Box>
    )
}

export default TheTask
