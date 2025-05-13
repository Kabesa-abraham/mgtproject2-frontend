import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'

type FeatureCard2Props = {
    icon: {
        icon_color: string,
        iconName: any
    },
    titleFeature: string,
    descFeatures: string,
    TheBorderR: 'left' | 'rigth'
}


const Thecard = {
    bgcolor: 'rgba(46, 46, 46, 0.12)', color: '#fff', border: '1px solid rgba(75, 75, 75, 0.39)', padding: '15px',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', height: '100%'
}
const FeatureCard2 = ({ icon, titleFeature, descFeatures, TheBorderR }: FeatureCard2Props) => {
    return (
        <Box sx={{ maxHeight: '165px', height: '100%' }} >
            <Card variant="outlined" sx={{ ...Thecard, borderRadius: TheBorderR === 'left' ? '10px 0px 0px 10px' : '0px 10px 10px 0px' }} >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'transparent', mb: '-20px' }} >
                            <icon.iconName sx={{ fontSize: '30px', color: icon.icon_color }} />
                        </Avatar>
                    }
                />

                <CardContent>
                    <Typography variant='h4' sx={{ fontSize: '20px', fontWeight: 'bold', mb: '10px' }} >
                        {titleFeature}
                    </Typography>
                    <Typography component={'span'} sx={{ fontSize: '13px', fontWeight: 'light', color: 'rgba(255, 255, 255, 0.63)' }} >
                        {descFeatures}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default FeatureCard2
