import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface toastType {
    message: any,
    position?: any
    autoclose?: number
}

export const ToastSuccess = ({ message, position, autoclose }: toastType) => {
    toast.success(message, {
        position: position || 'top-center',
        autoClose: autoclose || 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem('myTheme') === 'false' ? 'light' : 'dark'
    });
}

export const ToastError = ({ message, position, autoclose }: toastType) => {
    toast.error(message, {
        position: position || 'top-center',
        autoClose: autoclose || 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem('myTheme') === 'false' ? 'light' : 'dark'
    });
}