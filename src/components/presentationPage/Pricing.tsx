import { Box, Container, Grid, Typography } from '@mui/material'
import PricingCard from './PriceCard/PricingCard'
import { pricingData } from './PresentationData.js'

const Pricing = () => {
    return (
        <Box sx={{ width: '100%' }} >
            <Container maxWidth='lg' id='pricing'
                sx={{
                    pt: { xs: 4, sm: 12 },
                    pb: { xs: 8, sm: 16 },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }} >

                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h4"
                        gutterBottom
                        sx={{ color: 'text.primary' }}
                    >
                        Pricing
                    </Typography>
                    <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ color: 'text.secondary' }}
                    >
                        Transparent pricing, no hidden fees – get the best value for your budget.
                    </Typography>
                </Box>

                <Grid container spacing={{ xs: 3, md: 2 }} sx={{ width: '100%', alignItems: 'center' }} >
                    {
                        pricingData.map((pricing, i) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i} >
                                <PricingCard type={pricing.type}
                                    recommended={pricing.recommended}
                                    price={pricing.price}
                                    description={pricing.description}
                                    textBtn={pricing.textBtn}
                                    buttonVariant={pricing.buttonVariant}
                                />
                            </Grid>
                        ))
                    }
                </Grid>

            </Container>
        </Box>
    )
}

export default Pricing
