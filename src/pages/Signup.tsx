import { Box, Button, Divider, FormControl, Link, TextField, Typography, FormLabel, Stack, Card as MuiCard, styled, Alert, CircularProgress } from '@mui/material'
import { useState } from 'react';
import { useAuthStore } from '../data/Store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/googleAuth/OAuth.js';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn() {

    const { handleSignup, isSignup, error, setError } = useAuthStore()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError("You must fill in all fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.")
        }

        const success = await handleSignup(formData);
        if (success) { navigate('/') }
    }

    return (
        <SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign up
                </Typography>
                <Box

                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                        <FormControl>
                            <FormLabel htmlFor="firstname" sx={{ fontSize: 13 }}>Firstname</FormLabel>
                            <TextField
                                id="firstname"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                size='small'
                                placeholder="your firstname..."
                                autoComplete="firstname"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="lastname" sx={{ fontSize: 13 }}>Lastname</FormLabel>
                            <TextField
                                id="lastname"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                size='small'
                                placeholder="your lastname..."
                                autoComplete="lastname"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                    </Stack>

                    <FormControl>
                        <FormLabel htmlFor="email" sx={{ fontSize: 13 }}>Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            size='small'
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password" sx={{ fontSize: 13 }}>Password</FormLabel>
                        <TextField
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••"
                            type="password"
                            id="password"
                            size='small'
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSignup}
                    >
                        {isSignup ? <CircularProgress
                            size={24}
                            sx={{
                                color: 'rgb(18, 120, 236)',
                            }}
                        /> : "Sign up"}
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <OAuth buttonName='Sign up with Google' />
                    <Typography sx={{ textAlign: 'center', fontSize: 14 }}>
                        Do you have an account?{' '}
                        <Link
                            href="/login"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign in here
                        </Link>
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, fontSize: 12 }}>
                        {error}
                    </Alert>
                )}


            </Card>

        </SignUpContainer>

    );
}