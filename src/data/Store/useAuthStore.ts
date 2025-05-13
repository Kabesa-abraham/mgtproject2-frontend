import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { axiosInstance } from '../../lib/axios.js';
import { ToastSuccess, ToastError } from '../../lib/toastAlert.js';

//const URL_BASIQUE = import.meta.env.MODE === "development" ? "http://localhost:4000/backend" : "/backend";

type user = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    image?: string
}
interface userState {
    user: user | null,
    timestamp: number | null, //will help me to specify the time for the expiration of user
    isSignup: boolean,
    isSignin: boolean,
    isloggedWithGoogle: boolean,
    isUpdateProfile: boolean,
    error: string | null,
    errorDeleteAccount: string | null,
    setError: (errMsg: string) => void,
    setErrorDeleteAccount: (errMsg: string) => void,
    handleSignup: (data: { firstName: string, lastName: string, email: string, password: string }) => Promise<boolean>,
    handleSignin: (data: { email: string, password: string }) => Promise<boolean>,
    updateUser: (userId: string, data: { firstName?: string, lastName?: string, email?: string, password?: string, image?: string }) => Promise<void>,
    logout: () => Promise<boolean>
    deleteUser: (userId: string, password: string) => Promise<Boolean>
    checkExpiration: () => void
    continueWithGoogle: (data: { firstName: string, lastName: string, email: string, image?: string }) => Promise<boolean>
}

export const useAuthStore = create<userState>()(
    persist((set, get) => ({
        user: null,
        timestamp: null,
        isSignup: false,
        isSignin: false,
        isloggedWithGoogle: false,
        isUpdateProfile: false,
        error: null,
        errorDeleteAccount: null,

        setError: (error) => {
            set({ error: error })
        },
        setErrorDeleteAccount: (errorDeleteAccount) => {
            set({ errorDeleteAccount: errorDeleteAccount })
        },
        handleSignup: async (data) => {
            set({ isSignup: true, error: null });
            try {
                const res = await axiosInstance.post('/auth/signup', data);
                set({ user: res.data, timestamp: Date.now() });
                return true
            } catch (error: any) {
                set({ error: error.response?.data?.message, isSignup: false })
                return false
            } finally {
                set({ isSignup: false })
            }
        },
        handleSignin: async (data) => {
            set({ isSignin: true, error: null });
            try {
                const res = await axiosInstance.post('/auth/signin', data);
                set({ user: res.data, timestamp: Date.now() });
                return true
            } catch (error: any) {
                set({ error: error.response?.data?.message, isSignin: false })
                return false
            } finally {
                set({ isSignin: false })
            }
        },
        updateUser: async (userId, data) => {
            set({ isUpdateProfile: true });
            try {
                const res = await axiosInstance.put(`/auth/updateUser/${userId}`, data);
                set({ user: res.data, isUpdateProfile: false });
                ToastSuccess({ message: "Profile updated successfully!" });
            } catch (error: any) {
                ToastError({ message: error.response?.data?.message });
                set({ isUpdateProfile: false });
            } finally {
                set({ isUpdateProfile: false });
            }
        },
        logout: async () => {
            await axiosInstance.post('/auth/logout');
            set({ user: null, timestamp: null });
            return true;
        },

        deleteUser: async (userId, password) => {
            try {
                await axiosInstance.delete(`/auth/deleteUser/${userId}`, { data: { password } });
                set({ user: null, timestamp: null });
                return true;
            } catch (error: any) {
                set({ errorDeleteAccount: error.response?.data?.message });
                return false;
            }
        },

        continueWithGoogle: async (data) => {
            set({ isloggedWithGoogle: true, error: null });
            try {
                const res = await axiosInstance.post('/auth/googleAuth', data);
                set({ user: res.data, timestamp: Date.now() });
                return true
            } catch (error: any) {
                set({ error: error.response?.data?.message, isloggedWithGoogle: false })
                return false
            } finally {
                set({ isloggedWithGoogle: false })
            }
        },

        checkExpiration: () => { //check the expiration of the user
            const timestamp = get().timestamp;
            if (timestamp) {
                const now = Date.now();
                const expired = now - timestamp > 1000 * 60 * 60 * 24; // 24h
                if (expired) {
                    set({ user: null, timestamp: null });
                    localStorage.removeItem('user-storage');
                }
            }
        },

    }),
        {
            name: 'user-storage',
            partialize: (state) => ({ user: state.user, timestamp: state.timestamp }),
        }
    )
)

