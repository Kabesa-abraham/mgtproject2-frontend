import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Typography, Stack, CircularProgress } from '@mui/material';
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import useThemeStore from '../../../data/Store/themeStore.js';
import { userPreview, projectPreview } from '../../../data/types/useTaskTypes.js';
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { useTaskStore } from '../../../data/Store/useTaskStore.js';
import { useNavigate } from 'react-router-dom';

const heightRow = { padding: '10px 16px' }
const titleTab = { color: 'rgb(49, 49, 49)' }

type AllTaskTabProps = {
    tasksDatas: {
        _id: string,
        taskName: string,
        taskDesc: string,
        status: string
        assignedTo: userPreview,
        projectId: projectPreview,
        deadline: string,
        createdAt: string;
        updatedAt: string;
    }[],
    loading: boolean
}

const AllTaskTab = ({ tasksDatas, loading }: AllTaskTabProps) => {
    const { darkMode } = useThemeStore();
    const headerTabBgColor = { backgroundColor: darkMode ? 'rgb(32, 32, 32)' : 'rgb(240, 244, 248)', color: darkMode ? '#fff' : '' }

    const { deleteTask, getAllTasks } = useTaskStore();
    const deleteTheTask = async (taskId: string) => { //remove the task
        if (taskId) {
            const res = await deleteTask(taskId);
            if (res) {
                await getAllTasks("", "", "");
            }
        }
    }
    const swalAlertDelete = (taskId: string) => {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            text: 'Are you sure you want to delete this task?',
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


    const navigate = useNavigate();
    const handleClick = (taskId: string) => { //to navigate to the task page
        navigate(`/tasks/theTask/${taskId}`);
    }

    console.log(tasksDatas)

    return (
        <TableContainer component={Paper} sx={{
            borderRadius: '5px', boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgb(216, 225, 231)'}`, maxHeight: 740,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: { xs: '3px', md: '6px' },
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555',
            },
        }}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Task name</TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>AssignedProject </TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Status</TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>End task</TableCell>
                        <TableCell align="center" sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {tasksDatas.map((task, index) => (
                        <TableRow key={index} sx={{
                            bgcolor: darkMode ? '#121212' : '',
                            '&:hover': { bgcolor: darkMode ? 'rgb(32, 32, 32)' : 'rgba(225, 233, 238, 0.45)' }
                        }} >

                            <TableCell sx={{ ...heightRow, minWidth: '200px' }} onClick={() => handleClick(task._id)}>
                                {task.taskName && task.taskName.length > 60 ? task.taskName.slice(0, 60) + '...' : task.taskName}
                            </TableCell>

                            <TableCell sx={{ ...heightRow, minWidth: '200px' }} onClick={() => handleClick(task._id)}>
                                {task.projectId === null ? <p style={{ color: 'red' }} > Error: no project assigned</p> :
                                    task.projectId.projectName.length > 100 ? task.projectId.projectName.slice(0, 100) + '...' :
                                        task.projectId.projectName
                                }
                            </TableCell>

                            <TableCell sx={{ ...heightRow }} onClick={() => handleClick(task._id)}>
                                <Chip label={task.status} size="small"
                                    sx={{
                                        bgcolor: task.status === 'Completed' ? 'rgb(198, 252, 190)' : task.status === 'In progress' ? 'rgba(219, 219, 219, 0.45)' : 'rgb(166, 219, 255)',
                                        color: task.status === 'Completed' ? 'rgb(24, 110, 15)' : task.status === 'In progress' ? 'rgba(68, 68, 68, 0.86)' : 'rgb(3, 76, 124)',
                                        fontWeight: 600, border: '.5px solid rgba(129, 129, 129, 0.16)'
                                    }}

                                />
                            </TableCell>

                            <TableCell sx={{ ...heightRow, minWidth: '50px' }} onClick={() => handleClick(task._id)}>
                                {dayjs(task.deadline).format('DD/MM/YYYY')}
                            </TableCell>

                            <TableCell align="center" sx={{ ...heightRow }}>
                                <Stack direction={'row'} spacing={2} sx={{ alignItems: 'start' }} >
                                    {/* <Link href={`/tasks/theTask/${task._id}`} underline='hover' color='primary' sx={{ fontSize: 12 }} > */}
                                    <RemoveRedEye sx={{ fontSize: { xs: 14, md: 16 } }} color='primary' onClick={() => handleClick(task._id)} />
                                    {/* </Link> */}

                                    <Edit sx={{ fontSize: { xs: 14, md: 16 } }} color='success'
                                        onClick={() => navigate(`/tasks/updateTask/${task._id}`)}
                                    />

                                    <Delete color='error' sx={{ fontSize: { xs: 15, md: 17 } }} onClick={() => swalAlertDelete(task._id)} />

                                </Stack>
                            </TableCell>

                        </TableRow>
                    ))}

                    {
                        tasksDatas.length === 0 && !loading && (
                            <TableRow >
                                <TableCell colSpan={5} align='center' >
                                    <Typography variant='body1' sx={{ fontSize: { xs: 12, md: 14 } }} >No task found</Typography>
                                </TableCell>
                            </TableRow>
                        )
                    }

                    {
                        loading === true && (
                            <TableRow >
                                <TableCell colSpan={5} align='center' >
                                    <CircularProgress size={25} />
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default AllTaskTab
