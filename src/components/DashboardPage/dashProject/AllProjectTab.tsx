
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip,
    Typography, Stack, CircularProgress
} from '@mui/material';
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import useThemeStore from '../../../data/Store/themeStore.ts';
import { UserPreview } from '../../../data/types/useProjectTypes.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useProjectStore } from '../../../data/Store/useProjectStore.js';

const heightRow = { padding: '10px 16px' }
const titleTab = { color: 'rgb(49, 49, 49)' }

type AllProjectTabProps = {
    projectsDatas: {
        _id: string,
        projectName: string,
        projectDesc: string,
        creator?: UserPreview,
        members: UserPreview[]
    }[],
    loading: boolean,
    typeProject: string,
}

export default function AllProjectTab({ projectsDatas, loading, typeProject }: AllProjectTabProps) {

    const navigate = useNavigate();
    const { darkMode } = useThemeStore();
    const { deleteProject, getProjects } = useProjectStore();
    const headerTabBgColor = { backgroundColor: darkMode ? 'rgb(32, 32, 32)' : 'rgb(240, 244, 248)', color: darkMode ? '#fff' : '' };

    const deleteTheProject = async (projectId: string) => {
        if (projectId) {
            const res = await deleteProject(projectId);
            if (res) {
                await getProjects(""); //in the parameter i put the searchTerm but i don't need it for now because i don't have any search term
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
    }


    return (
        <TableContainer component={Paper} sx={{
            borderRadius: '5px', boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgb(216, 225, 231)'}`, maxHeight: 750,
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
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Project name</TableCell>
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Description</TableCell>
                        {typeProject === 'participated' && <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Creator</TableCell>}
                        <TableCell sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Members</TableCell>
                        <TableCell align="center" sx={{ ...heightRow, ...titleTab, ...headerTabBgColor }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectsDatas.map((project, index) => (
                        <TableRow key={index} sx={{
                            bgcolor: darkMode ? '#121212' : '', cursor: 'pointer',
                            '&:hover': { bgcolor: darkMode ? 'rgb(32, 32, 32)' : 'rgba(225, 233, 238, 0.45)' }
                        }}
                        >
                            <TableCell sx={{ ...heightRow, minWidth: '250px' }} onClick={() => navigate(`/projects/theProject/${project._id}`)}>
                                {project.projectName.length > 60 ? project.projectName.slice(0, 60) + '...' : project.projectName}
                            </TableCell>

                            <TableCell sx={{ ...heightRow, minWidth: '250px' }} onClick={() => navigate(`/projects/theProject/${project._id}`)}>
                                {project.projectDesc.length > 100 ? project.projectDesc.slice(0, 100) + '...' : project.projectDesc}
                            </TableCell>

                            {typeProject === 'participated' &&
                                <TableCell sx={{ ...heightRow, minWidth: '250px' }} onClick={() => navigate(`/projects/theProject/${project._id}`)}>
                                    {project.creator?.firstName}
                                </TableCell>
                            }

                            <TableCell sx={{ ...heightRow, minWidth: '250px' }} onClick={() => navigate(`/projects/theProject/${project._id}`)}>
                                {project.members.map((member, index) => (
                                    <Chip key={index} label={member.firstName + ', '} size="small" sx={{ marginRight: '5px', bgcolor: 'transparent' }} />
                                ))}
                            </TableCell >

                            <TableCell align="center" sx={{ ...heightRow }}>
                                <Stack direction={'row'} spacing={2} sx={{ alignItems: 'start' }} >

                                    <RemoveRedEye sx={{ fontSize: { xs: 14, md: 16 } }} onClick={() => navigate(`/projects/theProject/${project._id}`)} color='primary' />

                                    {
                                        typeProject !== 'participated' &&
                                        <Edit sx={{ fontSize: { xs: 14, md: 16 } }} color='success' onClick={() => navigate(`/projects/updateProject/${project._id}`)} />
                                    }

                                    {
                                        typeProject !== 'participated' &&
                                        <Delete color='error' sx={{ fontSize: { xs: 14, md: 16 } }} onClick={() => mySwalAlertDelete(project._id)} />
                                    }
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}

                    {projectsDatas.length === 0 && !loading && (
                        <TableRow >
                            <TableCell colSpan={typeProject === 'participated' ? 5 : 4} align='center' >
                                <Typography variant='body1' sx={{ fontSize: { xs: 12, md: 14 } }} >No project found</Typography>
                            </TableCell>
                        </TableRow>
                    )
                    }

                    {loading === true && (
                        <TableRow >
                            <TableCell colSpan={4} align='center' >
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
