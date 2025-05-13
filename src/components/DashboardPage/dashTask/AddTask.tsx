import { ArrowLeft, Home, UnfoldMore } from '@mui/icons-material'
import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, Autocomplete, CircularProgress, Alert } from '@mui/material'
import useThemeStore from '../../../data/Store/themeStore.js'
import { Link } from 'react-router-dom'
import { useTaskStore } from '../../../data/Store/useTaskStore.js'
import ProjectSelect from './AutoCompleteProject.js'
import { useState } from 'react'

const gridItemStyle = { display: 'flex', flexDirection: 'column', gap: 3 }

const AddTask = () => {

    const { darkMode } = useThemeStore();

    const { error, isAddTask, createTask, setError } = useTaskStore();
    const [formData, setFormData] = useState({
        taskName: "",
        taskDesc: "",
        status: "To do",
        projectId: "",
        deadline: Date.now().toString(),
    })
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.taskName) {
            setError("task name is required!");
        }
        if (!formData.projectId) {
            setError("Assigned a project is required!")
        }
        await createTask(formData);
    }

    console.log(formData.deadline, 'la date deadline')

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
                        New Task
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1'
                        sx={{ color: 'rgb(129, 129, 129)', fontSize: '14px', fontWeight: 400, mb: 1, mt: 2 }}
                    >Create a Task and Keep Your Project on Track</Typography>
                    <Divider />
                </Box>

                <Container maxWidth='sm' sx={{}} >
                    <form onSubmit={handleSubmit} >
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
                                    onChange={handleOnchange}
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
                                    onChange={handleOnchange}
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            fontSize: "0.875rem", // Taille de texte plus petite (exemple)
                                        },
                                    }}
                                />
                            </Grid>

                            {/* search project */}
                            <ProjectSelect selectedProjectId={formData.projectId} onSelect={projectId => setFormData({ ...formData, projectId })} />

                            <Grid size={12} sx={{ ...gridItemStyle }} >
                                <Stack direction="row" spacing={2}>
                                    <Grid size={12} sx={{ ...gridItemStyle }} >
                                        <InputLabel size='small' sx={{ fontSize: 14 }} >Status</InputLabel>
                                        <FormControl sx={{}} size='small' >
                                            <Select sx={{ fontSize: 13, color: darkMode ? '#fff' : 'rgb(75, 75, 75)', py: '3px' }}
                                                value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} IconComponent={UnfoldMore}
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
                                            value={formData.deadline}
                                            onChange={handleOnchange}
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
                                        '&:hover': { boxShadow: 'none' }
                                    }}
                                    disabled={isAddTask === true}
                                >
                                    {
                                        isAddTask ? <CircularProgress size={24}
                                            sx={{
                                                color: 'rgb(18, 120, 236)',
                                            }} /> : "Create Task"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    {error && <Alert severity="error" sx={{ mt: 2 }} >{error}</Alert>}
                </Container>
            </Box>
        </Box>
    )
}

export default AddTask
