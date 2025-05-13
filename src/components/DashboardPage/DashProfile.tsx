import { ArrowLeft, Edit, Home, MoreVert, Close } from '@mui/icons-material'
import { Alert, Avatar, Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material'
import useThemeStore from '../../data/Store/themeStore.js'
import React, { useEffect, useRef, useState } from 'react'
import { darkTheme } from '../../data/theme/theme.js'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../data/Store/useAuthStore.js'
import { ToastError } from '../../lib/toastAlert.js'
import Swal from 'sweetalert2'

const URL_BASIQUE = "https://mgtprojects2-backend.onrender.com/backend";

const DashProfile = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation(); // Empêche les conflits de clics
        setAnchorEl(null);
    };

    const [openImg, setOpenImg] = useState(false);

    const handleOpenImg = () => setOpenImg(true);
    const handleCloseImg = () => setOpenImg(false);

    const navigate = useNavigate();
    const { darkMode } = useThemeStore();

    const { user, isUpdateProfile, updateUser, logout, deleteUser, errorDeleteAccount, setErrorDeleteAccount } = useAuthStore(); //for getting the user data from the store
    const [formData, setFormData] = useState({ //for setting the form data
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        image: user?.image || '',
        password: ''
    })
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => { //for setting the form data when the input changes
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const getUpdatedFields = () => { //for getting the updated fields from the form data
        const updateFields: Partial<typeof formData> = {};
        // we check if the form data is different from the user data in the store
        if (formData.firstName !== user?.firstName) updateFields.firstName = formData.firstName;
        if (formData.lastName !== user?.lastName) updateFields.lastName = formData.lastName;
        if (formData.email !== user?.email) updateFields.email = formData.email;
        if (formData.image !== user?.image) updateFields.image = formData.image;
        // if the password is not empty, we add it to the update fields
        if (formData.password) updateFields.password = formData.password;

        return updateFields;  // And we return the updated fields
    };

    const [isFormChanged, setIsFormChanged] = useState(false); //for checking if the form is changed or not
    useEffect(() => {
        const updates = getUpdatedFields();
        setIsFormChanged(Object.keys(updates).length > 0);
    }, [formData]);

    const hasEmptyUpdatedFields = (): boolean => { //for checking if the updated fields are empty and if it is so we return true
        const updates = getUpdatedFields();
        return (
            (updates.firstName !== undefined && updates.firstName.trim() === '') ||
            (updates.lastName !== undefined && updates.lastName.trim() === '') ||
            (updates.email !== undefined && updates.email.trim() === '') ||
            (updates.image !== undefined && updates.image.trim() === '')
        );
    };

    const handleCancel = () => { //for resetting the formdata useState and put it in her default state
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            image: user?.image || '',
            password: ''
        })
    }

    const handleUpdateUser = async () => {
        const updatedFields = getUpdatedFields(); // we get the updated fields from the form data

        if (hasEmptyUpdatedFields()) {
            ToastError({ message: "Fields can't be empty!" });
            return;
        }
        if (user?._id) {
            await updateUser(user?._id, updatedFields);
        }
    }

    //for uploading the profile image
    const profileImgRef = useRef<HTMLInputElement | null>(null); //for getting the profile image from the input
    const [uploadProfileImage, setUploadProfileImage] = useState<File | null>(null);
    const [imageProfileUrl, setImageProfileUrl] = useState<string | null>(null); //for setting the image profile url to the file url

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => { //for setting the profile image when the input changes
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setUploadProfileImage(file);
            setImageProfileUrl(URL.createObjectURL(file)); //for setting the image profile url to the file url
        }
    };

    const uploadImage = async () => { //function for uploading the image to the server
        if (!uploadProfileImage) {
            console.warn("No image selected for upload.");
            return;
        }

        const formdataImg = new FormData(); //FormData is used to send the file to the server
        formdataImg.append('image', uploadProfileImage);
        try {
            const res = await fetch(`${URL_BASIQUE}/upload/upload_image`, {
                method: "POST",
                headers: { Accept: 'application/json' },
                body: formdataImg
            })
            const data = await res.json();
            if (!res.ok) { console.log(data.message) }
            if (res.ok) {
                setFormData({ ...formData, image: data?.image_url });
                console.log('url', data?.image_url)
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        if (uploadProfileImage) {
            uploadImage()
        }
    }, [imageProfileUrl]);

    //for handling the logouts
    const handleLogout = async () => {
        const res = await logout();
        if (res === true) {
            navigate('/website');
        }
    }
    const logoutAlertWithSwal = () => { //for showing the logout alert with sweetalert2
        Swal.fire({
            icon: 'warning',
            position: 'center',
            text: 'Are you sure you want to logout?',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
            confirmButtonText: 'Logout',
        }).then((res) => {
            if (res.isConfirmed) {
                handleLogout();
            }
        })
    };

    //for handling the delete account
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [passwordForCorfirm, setPasswordForCorfirm] = useState<string>(''); //for setting the password to confirm the delete account
    const handleDeleteAlert = () => {  //it will show when user click on the delete account button
        Swal.fire({
            title: 'Delete Account 🔥 ?',
            text: 'This action is irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
        }).then((result) => {
            if (result.isConfirmed) {
                setShowDeleteModal(true); // Affiche ton modal de confirmation de mot de passe
            }
        });
    };
    const handleDeleteAccount = async () => {
        if (user?._id) { //for checking if the user is logged in
            if (!passwordForCorfirm || passwordForCorfirm.trim() === '') {
                setErrorDeleteAccount('Fill the password field to confirm that it\'is your account');
                return;
            }
            const res = await deleteUser(user?._id, passwordForCorfirm); //for deleting the user account
            if (res === true) {
                setShowDeleteModal(false); // Hide the modal after successful deletion
                navigate('/website'); // Redirect to the website page after deletion
            }
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }} >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1, color: 'rgb(160, 160, 160)' }} >
                    <Home sx={{ fontSize: '20px' }} />
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <Typography variant='h4' sx={{ fontWeight: 400, color: 'rgb(122, 122, 122)', fontSize: '12px' }}>
                            Dashboard
                        </Typography>
                    </Link>
                    <ArrowLeft sx={{ fontSize: '20px' }} />
                    <Typography variant='h4' sx={{ fontWeight: 500, color: 'rgb(44, 110, 233)', fontSize: '14px' }}>
                        My Profile
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='h4' component={'h4'} sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'rgb(26, 26, 26)', fontSize: { xs: '15px', md: '18px' }, mb: 1 }} >
                        My Profile
                    </Typography>
                    <Divider />
                </Box>

                <Card sx={{
                    boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(85, 85, 85, 0.5)' : 'rgb(219, 219, 219)'}`,
                    borderRadius: '5px', maxWidth: 690, mx: 'auto', bgcolor: darkMode ? darkTheme.palette.background.default : '', mb: 3
                }}>
                    <Stack spacing={1} sx={{ p: 2 }} >
                        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: { xs: 15, md: 17 } }} >Personal info</Typography>
                        <Typography variant="body2" sx={{ color: 'rgb(117, 116, 116)', fontSize: { xs: 12, md: 15 } }} >
                            Customize how your profile information will appear to this application.
                        </Typography>
                    </Stack>
                    <Divider />

                    <Grid container spacing={3} sx={{ p: 2 }}>
                        {/* Avatar + Edit */}
                        <Grid size={{ xs: 12, sm: 3 }}>
                            <Box position="relative" width="120px" height="120px" mx="auto">
                                <input type="file" ref={profileImgRef} onChange={handleChangeImg} hidden />
                                <Avatar
                                    src={imageProfileUrl || user?.image}
                                    sx={{ width: 120, height: 120 }}
                                    onClick={handleOpenImg}
                                />
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        '&:hover': { bgcolor: 'white' }
                                    }}
                                    onClick={() => { profileImgRef.current && profileImgRef.current.click() }}
                                >
                                    <Edit fontSize="small" sx={{ color: darkMode ? '#000' : '' }} />
                                </IconButton>
                            </Box>
                        </Grid>

                        {/* Form Inputs */}
                        <Grid size={{ xs: 12, sm: 9 }} container spacing={2}>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    placeholder='first name...'
                                    name='firstName'
                                    value={formData?.firstName}
                                    onChange={handleOnchange}
                                    size='small'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            padding: '2px 4px 2px 0px', fontSize: 14
                                        },
                                        '& input::placeholder': {
                                            fontSize: '0.9rem',
                                        },

                                    }}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    placeholder='last name...'
                                    name='lastName'
                                    value={formData?.lastName}
                                    onChange={handleOnchange}
                                    size='small'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            padding: '2px 4px 2px 0px', fontSize: 14
                                        },
                                        '& input::placeholder': {
                                            fontSize: '0.9rem',
                                        },

                                    }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    placeholder='exampleEmail@exemple.com...'
                                    type="email"
                                    name='email'
                                    value={formData?.email}
                                    onChange={handleOnchange}
                                    size='small'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            padding: '2px 4px 2px 0px', fontSize: 14
                                        },
                                        '& input::placeholder': {
                                            fontSize: '0.9rem',
                                        },

                                    }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    placeholder='************'
                                    type="password"
                                    name='password'
                                    value={formData?.password}
                                    onChange={handleOnchange}
                                    size='small'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            padding: '2px 4px 2px 0px', fontSize: 14
                                        },
                                        '& input::placeholder': {
                                            fontSize: '0.9rem',
                                        },

                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid size={12} p={0}><Divider /></Grid>

                        {/* Buttons */}
                        <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
                            {
                                isFormChanged &&
                                <Button variant="outlined"
                                    size='small' sx={{ color: darkMode ? 'white' : 'rgb(15, 15, 15)', borderColor: 'rgb(117, 116, 116)', textTransform: 'none' }}
                                    onClick={handleCancel}
                                >Cancel
                                </Button>
                            }


                            <Button variant="contained" size='small'
                                sx={{ textTransform: 'none', boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
                                disabled={!isFormChanged} onClick={handleUpdateUser}
                            >
                                {
                                    isUpdateProfile ? <CircularProgress size={24} color='secondary' />
                                        : "Update Info"
                                }
                            </Button>



                            <IconButton onClick={handleClick} >
                                <MoreVert />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            padding: '4px 0px',
                                            width: 120,
                                            boxShadow: 'none',
                                            border: `1px solid ${darkMode ? 'rgb(100, 100, 100)' : '#e5e7eb'}`,
                                            borderRadius: 2,
                                            bgcolor: 'white',
                                        },
                                    },
                                }}
                            >
                                <MenuItem onClick={handleDeleteAlert}>
                                    <Typography variant='body1' sx={{ color: 'rgb(168, 26, 26)', fontSize: 13 }} >Delete Account</Typography>
                                </MenuItem>
                                <MenuItem onClick={logoutAlertWithSwal} /*{handleClose}*/>
                                    <Typography variant='body1' sx={{ color: 'rgb(56, 19, 19)', fontSize: 13 }} >Logout</Typography>
                                </MenuItem>

                            </Menu>
                        </Grid>
                    </Grid>
                </Card>
            </Box>


            {/* Delete Modal confirmation */}
            <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}
                sx={{ padding: { xs: 2, sm: 3 }, }}>
                <DialogTitle>Confirm the password </DialogTitle>
                <DialogContent>
                    <TextField
                        type="password"
                        placeholder='************'
                        fullWidth
                        sx={{ width: { xs: 250, sm: 300, md: 400 } }}
                        value={passwordForCorfirm}
                        size='small'
                        required
                        onChange={(e) => setPasswordForCorfirm(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowDeleteModal(false);
                        setPasswordForCorfirm('');
                        setErrorDeleteAccount('');
                    }}
                        sx={{ textTransform: 'none', color: darkMode ? 'white' : 'rgb(139, 31, 31)' }}
                    >Annuler</Button>
                    <Button onClick={handleDeleteAccount} variant="contained" color="error"
                        sx={{ textTransform: 'none', boxShadow: 'none', '&:hover': { boxShadow: 'none' }, borderRadius: 3 }}
                    >
                        Supprimer
                    </Button>
                </DialogActions>

                {errorDeleteAccount && <Alert severity='error' >{errorDeleteAccount}</Alert>}
            </Dialog>


            <Dialog open={openImg} onClose={handleCloseImg} fullWidth maxWidth="sm">
                <DialogContent sx={{ position: 'relative', p: 0 }}>
                    <IconButton
                        onClick={handleCloseImg}
                        sx={{ position: 'absolute', top: -2, right: 8, zIndex: 1 }}
                    >
                        <Close sx={{ color: darkMode ? '#fff' : '#000' }} />
                    </IconButton>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                        <img
                            src={user?.image}
                            alt="profile large"
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box >
    )
}

export default DashProfile
