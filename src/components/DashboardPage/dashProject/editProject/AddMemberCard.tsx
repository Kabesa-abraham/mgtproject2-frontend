import { Alert, Box, Button, Card, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import useThemeStore from '../../../../data/Store/themeStore.js'
import AutoCompletUser from '../AutoCompletUser';
import { useProjectStore } from '../../../../data/Store/useProjectStore.js';
import { useParams } from 'react-router-dom';

const AddMemberCard = () => {

    const { darkMode } = useThemeStore();
    const [theUserId, setTheUserId] = useState('');
    const { projectId } = useParams();
    const { addProjectMember, getTheProject, memberLoading, error } = useProjectStore();

    const handleAddMember = async () => {
        if (theUserId && projectId) {
            const res = await addProjectMember(projectId, theUserId);
            if (res) await getTheProject(projectId);
        }
    }

    return (
        <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid rgba(151, 150, 150, 0.36)', borderRadius: '5px', bgcolor: darkMode ? "rgb(10, 10, 10)" : '' }} >
            <Stack component={'div'} spacing={3} >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} >
                    <Typography variant='h3' sx={{ fontSize: 17, color: darkMode ? 'white' : '"rgb(46, 46, 46)" ' }} >
                        Add Member
                    </Typography>

                    <Typography variant='body1' sx={{ fontSize: 14, color: "rgb(83, 83, 83)" }} >
                        Search user for putting her in your project
                    </Typography>
                </Box>
                <AutoCompletUser selectedUser={theUserId} onSelect={userId => setTheUserId(userId)} />
                <Button variant='contained' onClick={handleAddMember}
                    sx={{
                        textTransform: 'none', padding: '4px 0', borderRadius: 2.5, fontSize: 14, boxShadow: 'none', bgcolor: 'rgb(140, 21, 177)',
                        '&:hover': { boxShadow: 'none', bgcolor: 'rgb(113, 16, 143)' }
                    }} >
                    {
                        memberLoading ? <CircularProgress size={20} color='primary' /> :
                            "Add member"
                    }
                </Button>

                {
                    error && (
                        <Alert severity='error' sx={{ width: '100%', fontSize: 13 }} >
                            {error}
                        </Alert>
                    )
                }
            </Stack>

        </Card>
    )
}

export default AddMemberCard
