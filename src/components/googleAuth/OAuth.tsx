import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import { GoogleIcon } from '../customIcons/GoogleIcon.js'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../../firebase.js';
import { useAuthStore } from '../../data/Store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

type OAuthProps = {
    buttonName?: string;
}
const OAuth = ({ buttonName = "Continue with Google" }: OAuthProps) => {
    const { isloggedWithGoogle, continueWithGoogle } = useAuthStore();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultsFromGoogle: any = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle.user.photoURL);
            if (resultsFromGoogle.user) {
                const [firstName, lastName] = resultsFromGoogle.user.displayName.split(' ');
                const res = await continueWithGoogle({
                    firstName: firstName,
                    lastName: lastName,
                    email: resultsFromGoogle.user.email,
                    image: resultsFromGoogle.user.photoURL
                });
                if (res === true) {
                    navigate('/');
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleClick}
        >
            {
                isloggedWithGoogle === true ?
                    <CircularProgress size={24} color='primary' />
                    : buttonName
            }
        </Button>
    )
}

export default OAuth
