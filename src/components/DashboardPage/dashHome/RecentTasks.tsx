import {
    Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import useThemeStore from '../../../data/Store/themeStore.js';
import { task } from '../../../data/types/useTaskTypes.js';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

type RecentTasksProps = {
    RecentTaskes: task[];
}

const heightRow = { padding: '10px 16px' }


const RecentTasks = ({ RecentTaskes }: RecentTasksProps) => {

    const { darkMode } = useThemeStore()
    const titleTab = { color: darkMode ? '#fff' : 'rgb(49, 49, 49)' }
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}
            sx={{
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
            <Table>
                <TableHead sx={{ backgroundColor: darkMode ? 'rgb(32, 32, 32)' : 'rgb(240, 244, 248)', color: darkMode ? '#fff' : '' }}>
                    <TableRow>
                        <TableCell sx={{ ...heightRow, ...titleTab }}>Task name</TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab }}>Date created</TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab }}>Statut</TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab }}>Assigned project</TableCell>
                        <TableCell align="center" sx={{ ...heightRow, ...titleTab }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {RecentTaskes.map((task) => (
                        <TableRow key={task._id} sx={{
                            bgcolor: darkMode ? '#121212' : '',
                            '&:hover': { bgcolor: darkMode ? 'rgb(32, 32, 32)' : 'rgba(225, 233, 238, 0.45)' }
                        }} >
                            <TableCell sx={{ ...heightRow, minWidth: '150px' }}>
                                {task.taskName.length > 55 ? task.taskName.slice(0, 55) + '...' : task.taskName}
                            </TableCell>
                            <TableCell sx={{ ...heightRow, minWidth: '115px' }}>{dayjs(task.createdAt).format('DD/MM/YYYY')}</TableCell>
                            <TableCell sx={{ ...heightRow }}>
                                <Chip label={task.status} size="small"
                                    sx={{
                                        bgcolor: task.status === 'Completed' ? 'rgb(198, 252, 190)' : task.status === 'In progress' ? 'rgba(219, 219, 219, 0.45)' : 'rgb(166, 219, 255)',
                                        color: task.status === 'Completed' ? 'rgb(24, 110, 15)' : task.status === 'In progress' ? 'rgba(68, 68, 68, 0.86)' : 'rgb(3, 76, 124)',
                                        fontWeight: 600, border: '.5px solid rgba(129, 129, 129, 0.16)'
                                    }}

                                />
                            </TableCell>
                            <TableCell sx={{ ...heightRow, minWidth: '130px' }}>
                                {task.projectId.projectName.length > 55 ? task.projectId.projectName.slice(0, 55) + '...' : task.projectId.projectName}
                            </TableCell >

                            <TableCell align="center" sx={{ ...heightRow }}>

                                <RemoveRedEye sx={{ fontSize: 15 }} color='primary' onClick={() => navigate(`/tasks/theTask/${task._id}`)} />

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}


export default RecentTasks
