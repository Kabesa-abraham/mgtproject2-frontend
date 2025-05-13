import { Avatar, Box, Card, CircularProgress, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useThemeStore from '../../../../data/Store/themeStore.js'
import { useProjectStore } from '../../../../data/Store/useProjectStore.js'
import { useParams } from 'react-router-dom'
import { PersonRemove } from '@mui/icons-material'
import Swal from 'sweetalert2'

const AllMemberProjectCard = () => {

    const { darkMode } = useThemeStore();
    const { theProject, getTheProject, projectLoading, deleteMember, } = useProjectStore();
    const { projectId } = useParams();

    useEffect(() => {
        if (projectId) {
            getTheProject(projectId);
        }
    }, [getTheProject, projectId]);

    const handleDeleteMember = async (userId: string) => {
        if (projectId && userId) {
            const res = await deleteMember(projectId, userId);
            if (res) getTheProject(projectId);
        }
    };
    const mySwalAlertDeleteMember = (userId: string) => {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            text: 'By clicking on Delete, you will remove this member from the project',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
            confirmButtonText: 'Delete',
        }).then((res) => {
            if (res.isConfirmed) {
                handleDeleteMember(userId);
            }
        })
    }

    if (projectLoading) {
        return (
            <CircularProgress size={30} color='primary' sx={{ margin: 'auto' }} />
        )
    }
    return (
        <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid rgba(151, 150, 150, 0.36)', borderRadius: '5px', bgcolor: darkMode ? "rgb(10, 10, 10)" : '', mb: 4 }} >
            <Stack direction={'column'} spacing={2} sx={{ width: '100%', justifyContent: 'center', padding: 0 }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} >
                    <Typography variant='h3' sx={{ fontSize: 15, color: darkMode ? 'white' : 'rgb(46, 46, 46)', fontWeight: 500 }} >All Members</Typography>
                    <Divider />
                </Box>

                <Grid container spacing={2} sx={{ width: '100%', padding: 0 }} >
                    {
                        theProject &&
                            theProject?.members.length > 1 ?
                            theProject?.members.slice(1).map((member, index) => (
                                <Grid key={index} size={{ xs: 12 }} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }} >
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} >
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
                                    </Box>

                                    <IconButton onClick={() => mySwalAlertDeleteMember(member._id)} ><PersonRemove /></IconButton>
                                </Grid>
                            )) :
                            <Grid size={{ xs: 12 }} sx={{ width: '100%' }} >
                                <Typography variant="body1" fontWeight={400} fontSize={14} sx={{ textAlign: 'center', color: darkMode ? 'rgb(163, 163, 163)' : 'rgb(107, 107, 107)' }} >
                                    No members yet
                                </Typography>
                            </Grid>
                    }
                </Grid>
            </Stack>
        </Card>
    )
}

export default AllMemberProjectCard
