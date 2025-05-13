import { ArrowLeft, Home, UnfoldMore } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTaskStore } from '../../../data/Store/useTaskStore.js'
import useThemeStore from '../../../data/Store/themeStore.js'

const gridItemStyle = { display: 'flex', flexDirection: 'column', gap: 3 };

const EditTask = () => {

    //you have to know that in the fonctionnality of edit task, the projectId is not changable, but in the backend, it is possible to change it.
    //so in the frontend, we will not change it, but in the backend, we can change it if we want to. it's depending on the use case.

    const { getTheTask, theTask, updateTask, loading, error } = useTaskStore();
    const { darkMode } = useThemeStore();
    const { taskId } = useParams(); //return _id of task
    useEffect(() => {
        if (taskId) {
            getTheTask(taskId);
        }
    }, [getTheTask, taskId]);

    const [formData, setFormData] = useState({
        taskName: theTask?.taskName || '',
        taskDesc: theTask?.taskDesc || '',
        status: theTask?.status || 'To do',
        deadline: theTask?.deadline || Date.now().toString(),
    });
    useEffect(() => {
        if (theTask) {
            setFormData({
                taskName: theTask?.taskName || '',
                taskDesc: theTask?.taskDesc || '',
                status: theTask?.status,
                deadline: theTask?.deadline,
            });
        }
    }, [theTask]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const getUpdatedFields = () => {
        const updateFields: Partial<typeof formData> = {};

        if (formData.taskName !== theTask?.taskName) updateFields.taskName = formData.taskName;
        if (formData.taskDesc !== theTask?.taskDesc) updateFields.taskDesc = formData.taskDesc;
        if (formData.status !== theTask?.status) updateFields.status = formData.status;
        if (formData.deadline !== theTask?.deadline) updateFields.deadline = formData.deadline;

        return updateFields;
    }

    const updateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updateDatas = getUpdatedFields();
        if (taskId) {
            updateTask(taskId, updateDatas);
        }
    }

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack spacing={2} sx={{ width: '100%' }} >
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
                        Edit task
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1'
                        sx={{ color: 'rgb(129, 129, 129)', fontSize: '14px', fontWeight: 400, mb: 1, mt: 2 }}
                    >Edit task details.</Typography>
                    <Divider />
                </Box>
            </Stack>


            <Container maxWidth='md' sx={{
                padding: '0 0 25px 0', display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, width: '100%',
                justifyContent: 'center', border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgb(216, 225, 231)'}`, borderRadius: '5px',
            }} >
                <form onSubmit={updateSubmit} >
                    <Grid container spacing={1}>
                        {/* Project Name */}
                        <Grid size={12} sx={{ ...gridItemStyle }} >
                            <InputLabel size='small' sx={{ fontSize: 14 }} >Task Name</InputLabel>
                            <TextField
                                variant="outlined"
                                placeholder='task name...'
                                fullWidth
                                size='small'
                                name="taskName"
                                value={formData.taskName}
                                onChange={handleChange}
                                sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        padding: '2px 4px 2px 0px', fontSize: 14,
                                    },
                                    '& input::placeholder': {
                                        fontSize: '0.9rem',
                                    },
                                }}
                            />
                        </Grid>

                        {/* Description */}
                        <Grid size={12} sx={{ ...gridItemStyle }} >
                            <InputLabel size='small' sx={{ fontSize: 14 }} >Description</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                name="taskDesc"
                                value={formData.taskDesc}
                                onChange={handleChange}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontSize: "0.875rem", // Taille de texte plus petite (exemple)
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={12} sx={{ ...gridItemStyle }} >
                            <Stack direction="row" spacing={2}>
                                <Grid size={12} sx={{ ...gridItemStyle }} >
                                    <InputLabel size='small' sx={{ fontSize: 14 }} >Status</InputLabel>
                                    <FormControl sx={{}} size='small' >
                                        <Select sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)', py: '3px' }}
                                            IconComponent={UnfoldMore} name='status'
                                            value={formData.status && formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <MenuItem value="To do" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}>To do</MenuItem>
                                            <MenuItem value="In progress" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }} >Processing</MenuItem>
                                            <MenuItem value="Completed" sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)' }}>Finished</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={12} sx={{ ...gridItemStyle }} >
                                    <InputLabel size='small' sx={{ fontSize: 14 }} >Due Date</InputLabel>
                                    <TextField
                                        variant="outlined"
                                        type='date'
                                        fullWidth
                                        size='small'
                                        name="deadline"
                                        value={formData.deadline?.slice(0, 10)}
                                        onChange={handleChange}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                padding: '2px 4px 2px 0px', fontSize: 14,
                                            },
                                        }}
                                    />
                                </Grid>

                            </Stack>
                        </Grid>

                        {/* Submit Button */}
                        <Grid size={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                sx={{
                                    padding: ".3rem", fontSize: 14, marginTop: 2, textTransform: 'none', boxShadow: 'none', borderRadius: 2,
                                    '&:hover': { boxShadow: 'none' }, bgcolor: 'rgb(218, 182, 66)',
                                }}
                                disabled={loading === true}
                            >
                                {
                                    loading ? <CircularProgress size={24}
                                        sx={{
                                            color: 'rgb(68, 59, 6)',
                                        }} /> : "Save changes"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {error && <Alert severity="error" sx={{ mt: 2 }} >{error}</Alert>}
            </Container>

        </Box>
    )
}

export default EditTask
