import { Box, Container, Stack, Typography, styled } from '@mui/material';
import dashboardImg from '../../assets/AppDashbord.png'
import { lightTheme, darkTheme } from '../../data/theme/theme';
import useThemeStore from '../../data/Store/themeStore.js';


const StyledBox = styled('div')(() => ({
    alignSelf: 'center',
    width: '100%',
    height: 600,
    marginTop: 30,
    borderRadius: 5,
    outline: '6px solid',
    outlineColor: 'hsla(220, 25%, 80%, 0.2)',
    border: '1px solid',
    borderColor: 'grey',
    boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
    backgroundImage: `url(${dashboardImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));


const Home = () => {

    const { darkMode } = useThemeStore();

    return (
        <Box
            id="home"
            sx={() => ({
                width: '100%', pt: 2,
                backgroundRepeat: 'no-repeat',
                backgroundImage: (darkMode ? 'radial-gradient(ellipse 80% 50% at 50% -8%,rgb(20, 48, 94), transparent)' : 'radial-gradient(ellipse 80% 50% at 50% -8%,rgb(158, 194, 248), transparent)'),
            })}
        >
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: { xs: 19, lg: 25 }, pb: { xs: 8, sm: 12 }, }}>
                <Stack spacing={2} useFlexGap sx={{ alignItems: 'center', width: { xs: '100%', md: '80%', lg: '70%' } }} >

                    <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem', lg: '3.3rem' }, fontWeight: '500', textAlign: 'center', }} >
                        Managing your projects has never been easier than with Oragon<span style={{ color: '#1F73F4' }}>2.0</span>
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            width: { sm: '100%', md: '80%' },
                        }}
                    >
                        An intuitive platform to organize your tasks and track the progress of your projects with ease, helping you optimize productivity
                        and ensure the success of your goals
                    </Typography>

                </Stack>

                <StyledBox id="image" />
            </Container>
        </Box>
    );
}

export default Home
