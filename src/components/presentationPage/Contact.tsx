import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import useThemeStore from '../../data/Store/themeStore.js'

const styleTextField = {
    '& .MuiOutlinedInput-root': {
        padding: '2px 4px 2px 0px', fontSize: 14,
    },
}

const Contact = () => {

    const { darkMode } = useThemeStore();

    return (
        <Box
            id="contact"
            sx={{
                pb: { xs: 8, sm: 16 },
            }}
        >
            <Container maxWidth='sm'
                sx={{
                    bgcolor: (darkMode ? 'transparent' : 'transparent'), boxShadow: 'none', display: 'flex', flexDirection: 'column',
                    gap: 2, alignItems: 'center', pt: 4, pb: 4,
                }}
            >
                <Typography
                    component="h2"
                    variant="h4"
                    sx={{ color: 'text.primary' }}
                > Contact us </Typography>

                <Box component={'form'} sx={{ width: '100%' }}>
                    <Stack sx={{ width: '100%' }} spacing={2} >
                        <TextField size='small' type='text'
                            name='name' placeholder='Your name...'
                            fullWidth sx={{ ...styleTextField }}
                        />
                        <TextField size='small' type='email' name='email'
                            placeholder='Youremail@example.com' fullWidth sx={{ ...styleTextField }} />
                        <TextField size='small' type='text' name='subject'
                            placeholder='subject' fullWidth sx={{ ...styleTextField }} />
                        <TextField size='small' multiline rows={5} sx={{ '& .MuiOutlinedInput-root': { fontSize: 14 } }} />

                        <Button type='submit' onClick={(e) => e.preventDefault()} variant='contained'
                            sx={{ textTransform: 'none', borderRadius: 2, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} >
                            Send
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default Contact
