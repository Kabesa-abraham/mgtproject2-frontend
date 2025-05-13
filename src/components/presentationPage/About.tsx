import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import workSpace from "../../assets/peopleWorkSpace.jpg"
import { darkTheme } from "../../data/theme/theme.js"
import useThemeStore from "../../data/Store/themeStore.js"

const About = () => {

    const { darkMode } = useThemeStore();

    return (
        <Box
            id="about"
            sx={{ width: '100%' }}
        >
            <Container sx={{ pb: { xs: 8, sm: 12 }, }} >
                <Stack spacing={5} sx={{}} >
                    <Box>
                        <Typography variant="h4" sx={{ fontSize: { xs: '24px', md: '32px' } }} >About us</Typography>
                        <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, color: '#787575' }} > One vision, one mission: to simplify your daily organization. </Typography>
                    </Box>

                    <Grid container spacing={5} >
                        <Grid size={{ xs: 12, md: 6 }} >
                            <Box
                                component={"img"}
                                src={workSpace}
                                alt="About Us"
                                sx={{
                                    width: { xs: '100%', md: '100%' },
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            ></Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} >
                            <Box>
                                <Stack spacing={2}>
                                    <Typography component={'p'} sx={{ fontSize: { xs: '14px', md: '16px' }, color: (darkMode ? 'rgb(141, 141, 141)' : '#292929') }} >
                                        Oragon 2.0 is an enhanced version of Oragon, the project management application designed
                                        for teams and freelancers. With an intuitive interface and powerful features,
                                        it helps you organize your tasks and track your progress with ease.
                                    </Typography>
                                    <Typography component={'p'} sx={{ fontSize: { xs: '14px', md: '16px' }, color: (darkMode ? 'rgb(187, 187, 187)' : '#484747') }}>
                                        Designed to meet the needs of modern professionals, Oragon2.0 offers a seamless and optimized
                                        experience, fostering collaboration and productivity. Whether you're a startup, a growing business,
                                        or a freelancer, our solution allows you to structure your projects, assign responsibilities, and
                                        maintain a clear view of your goals' progress. With its advanced, intelligent management tools, Oragon2.0
                                        transforms project management into an efficient and enjoyable experience. Join us and discover a new way of
                                        working—one that's simpler and more efficient.
                                    </Typography>
                                    <Button sx={{ backgroundColor: '#438AF4', textTransform: 'none', color: '#fff', fontWeight: 'light', borderRadius: '10px' }} fullWidth >
                                        Read more...
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    )
}

export default About
