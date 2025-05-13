import { AutoAwesome, CheckCircleRounded } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Chip, Divider, Typography } from '@mui/material'
import useThemeStore from '../../../data/Store/themeStore.ts';

type PricingCardProps = {
    type: string,//"Free" | "Professional" | "Enterprise",
    recommended: boolean,
    price: number
    description: string[],
    textBtn: string,
    buttonVariant: string //'outlined' | 'contained',
}

const PricingCard = ({ type, recommended, price, description, textBtn, buttonVariant }: PricingCardProps) => {

    const { darkMode } = useThemeStore();

    return (
        <Card
            sx={[ //cette syntaxe avec sx={[]} permet de faire des styles conditionnels
                { p: 2, display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 5 },
                type === 'Professional' ?
                    ((theme) => ({
                        border: 'none',
                        background: 'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                        boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                        ...theme.applyStyles('dark', {
                            background:
                                'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                            boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                        }),
                    })) : ({ backgroundColor: (darkMode ? 'hsl(218, 23.40%, 9.20%)' : '#F2F2F2') })
            ]}
        >
            <CardContent>
                <Box
                    sx={[
                        {
                            mb: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 5,
                        },
                        type === 'Professional'
                            ? { color: 'grey.100' }
                            : { color: '' },
                    ]}
                >
                    <Typography component="h3" variant="h6">
                        {type}
                    </Typography>
                    {recommended === true && (<Chip icon={<AutoAwesome sx={{ color: '#081E65 !important', fontSize: '19px' }} />} label={'recommanded'}
                        sx={{ bgcolor: 'white', color: '#081E65', fontSize: '12px', fontWeight: 'semibold' }} />)}
                </Box>
                <Box
                    sx={[
                        {
                            display: 'flex',
                            alignItems: 'baseline',
                        },
                        type === 'Professional'
                            ? { color: 'grey.50' }
                            : { color: null },
                    ]}
                >
                    <Typography component="h3" variant="h3">
                        ${price}
                    </Typography>
                    <Typography component="h3" variant="h6">
                        &nbsp; per month
                    </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {description.map((line) => (
                    <Box
                        key={line}
                        sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                    >
                        <CheckCircleRounded
                            sx={[
                                {
                                    width: 20,
                                },
                                type === 'Professional'
                                    ? { color: 'primary.light' }
                                    : { color: 'primary.main' },
                            ]}
                        />
                        <Typography
                            variant="subtitle2"
                            component={'span'}
                            sx={[
                                type === 'Professional'
                                    ? { color: 'grey.50' }
                                    : { color: null },
                            ]}
                        >
                            {line}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant={buttonVariant as 'outlined' | 'contained'}
                    sx={[{ borderRadius: 2 },
                    type === 'Professional' ? {
                        bgcolor: 'primary'
                    } : { bgcolor: 'tranparent', border: '1px solid #B5B5B5', color: (darkMode ? 'hsl(219, 91.10%, 64.70%)' : '#000') },
                    ]}
                >
                    {textBtn}
                </Button>
            </CardActions>
        </Card >
    )
}

export default PricingCard
