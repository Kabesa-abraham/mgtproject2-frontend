import { Box, Card, CardContent, Typography, CardHeader, Avatar } from '@mui/material'

type FeatureCard1Props = {
    icon: {
        bg_color: string,
        icon_color: string,
        iconName: any
    },
    titleFeature: string,
    descFeatures: string
}

const FeatureCard1 = ({ icon, titleFeature, descFeatures }: FeatureCard1Props) => {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ bgcolor: 'transparent', color: '#fff', border: 'none' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{
                            bgcolor: icon.bg_color, color: icon.icon_color, outline: '3px solid rgba(255, 255, 255, 0.12)',
                            width: '60px', height: '60px'
                        }} >
                            <icon.iconName sx={{ fontSize: '25px', color: icon.icon_color }} />
                        </Avatar>
                    }
                />

                <CardContent>
                    <Typography variant='h4' sx={{ fontSize: '20px', fontWeight: 'semibold', mb: '10px' }} >
                        {titleFeature}
                    </Typography>
                    <Typography component={'span'} sx={{ fontSize: '13px', fontWeight: 'light', color: 'rgba(255, 255, 255, 0.63)' }} >
                        {descFeatures}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default FeatureCard1