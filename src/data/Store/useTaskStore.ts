import { create } from 'zustand';
import { axiosInstance } from '../../lib/axios.js';
import { task } from '../types/useTaskTypes.js';
import { ToastSuccess } from '../../lib/toastAlert.js';

interface taskState {
    tasks: task[],
    theTask: task | null,
    loading: boolean,
    theTaskLoading: boolean,
    isAddTask: boolean,
    error: string | null,
    setError: (error: string) => void,
    createTask: (data: { taskName: string, taskDesc?: string, status: string, projectId: string, deadline?: string }) => Promise<void>
    deleteTask: (taskId: string) => Promise<Boolean>
    getAllTasks: (searchTerm?: string, status?: string, theProjectId?: string) => Promise<void>
    getTheTask: (taskId: string) => Promise<void>
    updateTask: (taskId: string, data: { taskName?: string, taskDesc?: string, status?: string, projectId?: string, deadline?: string }) => Promise<void>
}

export const useTaskStore = create<taskState>((set) => ({
    tasks: [],
    theTask: null,
    loading: false,
    theTaskLoading: false,
    isAddTask: false,
    error: null,

    setError: (error) => set({ error: error }),

    createTask: async (data) => {
        set({ error: null, isAddTask: true });
        try {
            const res = await axiosInstance.post('/task/createTask', data);
            ToastSuccess({ message: res.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message, isAddTask: false })
        } finally {
            set({ isAddTask: false });
        }
    },

    deleteTask: async (taskId) => {
        set({ error: null });
        try {
            const res = await axiosInstance.delete(`/task/deleteTask/${taskId}`);
            ToastSuccess({ message: res.data });
            return true;
        } catch (error: any) {
            ToastSuccess({ message: error.response?.data?.message });
            return false;
        }
    },

    getAllTasks: async (searchTerm, status, theProjectId) => {
        set({ error: null, loading: true, tasks: [] });
        try {
            const res = await axiosInstance.get(`/task/getAllTask?searchTerm=${searchTerm}&status=${status}&projectId=${theProjectId}`);
            set({ tasks: res.data?.task, loading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message, loading: false })
        } finally {
            set({ loading: false })
        }
    },
    getTheTask: async (taskId) => {
        set({ error: null, theTaskLoading: true });
        try {
            const res = await axiosInstance.get(`/task/getTheTask/${taskId}`);
            set({ theTask: res.data, theTaskLoading: false });
        }
        catch (error: any) {
            set({ error: error.response?.data?.message, theTaskLoading: false })
        } finally {
            set({ theTaskLoading: false })
        }
    },
    updateTask: async (taskId, data) => {
        set({ error: null, loading: true });
        try {
            const res = await axiosInstance.put(`/task/updateTask/${taskId}`, data);
            ToastSuccess({ message: res.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message, loading: false })
        } finally {
            set({ loading: false })
        }
    }
}));