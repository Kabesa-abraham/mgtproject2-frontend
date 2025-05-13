import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import { featuresData1, featuresData2 } from "./PresentationData.js"
import FeatureCard1 from "./FeaturesCard/FeatureCard1.tsx"
import FeatureCard2 from "./FeaturesCard/FeatureCard2.tsx"

const Features = () => {
    return (
        <Box id='features' sx={{ width: '100%', padding: '70px 0px', backgroundColor: 'hsl(220, 35%, 3%)', color: '#fff', borderBottom: '1px solid hsla(219, 25.50%, 80.00%, 0.24)', borderTop: '1px solid hsla(219, 25.50%, 80.00%, 0.25)' }} >
            <Container maxWidth='lg' >
                <Stack spacing={5} sx={{ alignItems: 'center' }} >
                    <Box sx={{ textAlign: 'center' }} >
                        <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 'light', marginBottom: '10px' }} >The key Features and Benefits</Typography>
                        <Typography sx={{ color: '#ACA5A5', fontWeight: 'light', fontSize: '16px' }} >Discover the powerful features that help you work smarter and achieve more.</Typography>
                    </Box>

                    <Box>
                        <Grid container spacing={3} >
                            {
                                featuresData1.map((feature, i) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i} >
                                        <FeatureCard1 icon={feature.icon}
                                            titleFeature={feature.titleFeature}
                                            descFeatures={feature.descFeatures} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>

                    <Box>
                        <Grid container spacing={{ xs: 6, md: 3 }} >
                            {
                                featuresData2.map((feature, i) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={i} >
                                        <FeatureCard2 icon={feature.icon}
                                            titleFeature={feature.titleFeature}
                                            descFeatures={feature.descFeatures}
                                            TheBorderR={i % 2 === 0 ? 'left' : 'rigth'} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Features
