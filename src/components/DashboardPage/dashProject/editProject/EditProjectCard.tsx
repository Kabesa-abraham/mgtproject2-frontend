import { Button, Card, CircularProgress, Grid, InputLabel, List, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useThemeStore from '../../../../data/Store/themeStore.js'
import { darkTheme } from '../../../../data/theme/theme.js'
import { useProjectStore } from '../../../../data/Store/useProjectStore.js'
import { useParams } from 'react-router-dom'

const gridItemStyle = { display: 'flex', flexDirection: 'column', gap: 3 }

const EditProjectCard = () => {

    const { darkMode } = useThemeStore();
    const { getTheProject, theProject, editProject, loading, error } = useProjectStore();
    const { projectId } = useParams(); //return _id of project
    useEffect(() => { //for getting the project details
        if (projectId) {
            getTheProject(projectId)
        }
    }, [getTheProject, projectId])

    const [formData, setFormData] = useState({ //projectName: '', projectDesc: '' });
        projectName: theProject?.projectName || '',
        projectDesc: theProject?.projectDesc || '',
    });
    useEffect(() => { //this useEffect is for setting the form data when theProject changes
        if (theProject) {
            setFormData({
                projectName: theProject.projectName || '',
                projectDesc: theProject.projectDesc || '',
            });
        }
    }, [theProject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //this function is for setting the form data when the input changes
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const getUpdateFields = () => {
        const updateFields: Partial<typeof formData> = {};

        if (formData.projectName !== theProject?.projectName) updateFields.projectName = formData.projectName;
        if (formData.projectDesc !== theProject?.projectDesc) updateFields.projectDesc = formData.projectDesc;

        return updateFields;
    }

    const handleEditProject = (e: React.FormEvent<HTMLFormElement>) => { //this function is for handling the form submit
        e.preventDefault();
        const updateFields = getUpdateFields();

        if (projectId) {
            editProject(updateFields, projectId)
        }
    }
    return (
        <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid rgba(151, 150, 150, 0.36)', borderRadius: '5px', bgcolor: darkMode ? "rgb(10, 10, 10)" : '' }} >
            <form onSubmit={handleEditProject} >
                <Grid container spacing={1}>
                    {/* Project Name */}
                    <Grid size={12} sx={{ ...gridItemStyle }} >
                        <InputLabel size='small' sx={{ fontSize: 14 }} >Project Name</InputLabel>
                        <TextField
                            variant="outlined"
                            placeholder='project name...'
                            fullWidth
                            size='small'
                            id='projectName'
                            name='projectName'
                            defaultValue={theProject?.projectName}
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
                            id="projectDesc"
                            name='projectDesc'
                            defaultValue={theProject?.projectDesc}
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
                        // disabled={loading}
                        >
                            {
                                loading ? <CircularProgress size={20} color='primary' /> : 'Save changes'
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default EditProjectCard
