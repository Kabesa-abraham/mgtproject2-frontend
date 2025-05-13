import { Box, Button, Container, IconButton, InputLabel, Stack, TextField, Typography, Link } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'
function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="text.secondary" href="https://kabesa.vercel.app" target="_blank" rel="noopener noreferrer" >
                kabesa
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

const logo = { fontSize: { xs: '.7rem', sm: '1rem', md: '1.2rem' }, fontWeight: 'bold' }

export default function Footer() {
    return (
        <Container
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 4, sm: 8 }, py: { xs: 8, sm: 10 }, textAlign: { sm: 'center', md: 'left' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: { xs: '100%', sm: '60%' },
                    }} >
                    <Box sx={{ width: { xs: '100%', sm: '60%' }, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <Typography component={'h3'} variant="h3" sx={logo} >
                            Oragon<span style={{ color: '#1F73F4' }}>2.0</span>
                        </Typography>

                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                            Join the newsletter
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, textAlign: 'start' }}>
                            Subscribe for weekly updates and you will be notified
                        </Typography>
                        <InputLabel htmlFor="email-newsletter">Email</InputLabel>
                        <Stack direction="row" spacing={1} useFlexGap>
                            <TextField
                                id="email-newsletter"
                                hiddenLabel
                                size="small"
                                variant="outlined"
                                fullWidth
                                aria-label="Enter your email address"
                                placeholder="Your email address"
                                slotProps={{
                                    htmlInput: {
                                        autoComplete: 'off',
                                        'aria-label': 'Enter your email address',
                                    },
                                }}
                                sx={{ width: '250px' }}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ flexShrink: 0, bgcolor: '#000', textTransform: 'none' }}
                            >
                                Subscribe
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Links
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="#home">
                        Home
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#about">
                        About us
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#features">
                        Features
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#pricing">
                        Pricing
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#contact">
                        Contact us
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#faq">
                        FAQs
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Company
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="#">
                        About us
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#">
                        Careers
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Legal
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="#">
                        Terms
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#">
                        Privacy
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#">
                        Contact
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: { xs: 4, sm: 8 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Typography variant='body2' color='text.secondary' >
                        Designed and Developed by <Typography component={'span'} color='text.secondary' sx={{ fontWeight: 800 }} >Kabesa Yebula</Typography>
                    </Typography>
                    <Copyright />
                </div>
                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ justifyContent: 'left', color: 'text.secondary' }}
                >
                    <IconButton
                        color="inherit"
                        size="small"
                        href="https://github.com/Kabesa-abraham"
                        aria-label="GitHub"
                        sx={{ alignSelf: 'center' }}
                    >
                        <GitHub />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="small"
                        href="https://www.linkedin.com/in/abraham-yebula-7035902b1"
                        aria-label="X"
                        sx={{ alignSelf: 'center' }}
                    >
                        <LinkedIn />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}