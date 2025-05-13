import { ArrowLeft, Home } from '@mui/icons-material'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import AddMemberCard from './editProject/AddMemberCard'
import EditProjectCard from './editProject/EditProjectCard'
import AllMemberProjectCard from './editProject/AllMemberProjectCard'

const EditProject = () => {
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
                            All Projects
                        </Typography>
                    </Link>
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Typography variant='h4' sx={{ fontWeight: 500, color: 'rgb(44, 110, 233)', fontSize: '14px' }}>
                        Edit project
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='body1'
                        sx={{ color: 'rgb(129, 129, 129)', fontSize: '14px', fontWeight: 400, mb: 1, mt: 2 }}
                    >Edit project details and invite new collaborators.</Typography>
                    <Divider />
                </Box>
            </Stack>


            <Container maxWidth='md' sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, width: '100%', justifyContent: 'center' }} >
                <EditProjectCard />
                <AddMemberCard />
                <AllMemberProjectCard />
            </Container>

        </Box>
    )
}

export default EditProject
