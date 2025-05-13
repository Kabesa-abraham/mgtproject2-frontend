import { ArrowLeft, Home } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress, Container, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useProjectStore } from '../../../data/Store/useProjectStore.js'
import { useState } from 'react'

const gridItemStyle = { display: 'flex', flexDirection: 'column', gap: 3 }

const AddProject = () => {

    const { createProject, loading, error, setError } = useProjectStore();
    const [formData, setFormData] = useState({ projectName: "", projectDesc: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.projectName) setError("project name is required!")
        await createProject(formData)
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
                            All Projects
                        </Typography>
                    </Link>
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Typography variant='h4' sx={{ fontWeight: 500, color: 'rgb(44, 110, 233)', fontSize: '14px' }}>
                        New project
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1'
                        sx={{ color: 'rgb(129, 129, 129)', fontSize: '14px', fontWeight: 400, mb: 1, mt: 2 }}
                    >Bring your ideas to life – Create your project now!</Typography>
                    <Divider />
                </Box>

                <Container maxWidth='sm' sx={{}} >
                    <form onSubmit={handleCreateProject} >
                        <Grid container spacing={1}>
                            {/* Project Name */}
                            <Grid size={12} sx={{ ...gridItemStyle }} >
                                <InputLabel size='small' sx={{ fontSize: 14 }} >Project Name</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder='project name...'
                                    fullWidth
                                    size='small'
                                    name='projectName'
                                    value={formData.projectName}
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
                                    name="projectDesc"
                                    value={formData.projectDesc}
                                    onChange={handleChange}
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            fontSize: "0.875rem",
                                        },
                                    }}
                                />
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
                                    disabled={loading}
                                >
                                    {
                                        loading ? <CircularProgress size={24}
                                            sx={{
                                                color: 'rgb(18, 120, 236)',
                                            }} /> : "Create Project"
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2, fontSize: 12, mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Container>
            </Box>
        </Box>
    )
}

export default AddProject
