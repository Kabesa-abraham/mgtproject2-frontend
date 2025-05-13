import { create } from 'zustand';
import { axiosInstance } from '../../lib/axios.js';
import { ToastSuccess, ToastError } from '../../lib/toastAlert.js';
import { project } from '../types/useProjectTypes.js';


interface projectState {
    projects: project[],
    theProject: project | null,
    loading: boolean,
    projectLoading: boolean,
    memberLoading: boolean,
    error: string | null,
    setError: (error: string) => void,
    createProject: (data: { projectName: string, projectDesc?: string }) => Promise<void>,
    editProject: (data: { projectName?: string, projectDesc?: string }, projectId: string) => Promise<void>,
    getProjects: (searchTerm: string) => Promise<void>,
    getProjectsParticipated: (searchTerm: string) => Promise<void>
    getTheProject: (projectId: string) => Promise<void>,
    addProjectMember: (projectId: string, userId: string) => Promise<Boolean>,
    deleteMember: (projectId: string, userId: string) => Promise<Boolean>,
    deleteProject: (projectId: string) => Promise<Boolean>,
}

export const useProjectStore = create<projectState>((set, get) => ({
    projects: [],
    theProject: null,
    loading: false,
    projectLoading: false,
    memberLoading: false,
    error: null,

    setError: (error) => {
        set({ error: error })
    },

    createProject: async (data) => {
        set({ error: null, loading: true });
        try {
            const res = await axiosInstance.post('/project/createProject', data);
            ToastSuccess({ message: res.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message, loading: false, });
        } finally {
            set({ loading: false });
        }
    },

    getProjects: async (searchTerm) => {
        set({ error: null, loading: true, projects: [] });
        try {
            const res = await axiosInstance.get(`/project/getAllProject?searchTerm=${searchTerm}`);
            set({ projects: res.data?.projectCreated, loading: false });
        } catch (error: any) {
            console.log(error.response?.data?.message)
            set({ loading: false })
        } finally {
            set({ loading: false });
        }
    },

    getProjectsParticipated: async (searchTerm) => {
        set({ error: null, loading: true, projects: [] });
        try {
            const res = await axiosInstance.get(`/project/getAllProject?searchTerm=${searchTerm}`);
            set({ projects: res.data?.projectParticipated, loading: false });
            console.log(res.data)
        } catch (error: any) {
            console.log(error.response?.data?.message)
            set({ loading: false })
        } finally {
            set({ loading: false });
        }
    },

    getTheProject: async (projectId) => {
        set({ projectLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/project/theProject/${projectId}`);
            set({ theProject: res.data, projectLoading: false })
        } catch (error: any) {
            console.log(error.response?.data?.message)
            set({ projectLoading: false })
        } finally {
            set({ projectLoading: false })
        }
    },

    editProject: async (data, projectId) => {
        set({ error: null, loading: true });
        try {
            const res = await axiosInstance.put(`/project/updateProject/${projectId}`, data);
            ToastSuccess({ message: res.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message, loading: false, });
        } finally {
            set({ loading: false });
        }
    },

    addProjectMember: async (projectId, userId) => {
        set({ error: null, memberLoading: true });
        try {
            const res = await axiosInstance.post(`/project/addMember/${projectId}`, { userId });
            ToastSuccess({ message: res.data });
            return true;
        }
        catch (error: any) {
            set({ error: error.response?.data?.message, memberLoading: false, });
            return false
        } finally {
            set({ memberLoading: false });
        }
    },

    deleteMember: async (projectId, userId) => {
        set({ error: null, memberLoading: true });
        try {
            const res = await axiosInstance.post(`/project/deleteMember/${projectId}/${userId}`);
            ToastSuccess({ message: res.data });
            return true;
        } catch (error: any) {
            ToastSuccess({ message: error.response?.data?.message });
            set({ memberLoading: false, });
            return false;
        } finally {
            set({ memberLoading: false });
        }
    },

    deleteProject: async (projectId) => {
        set({ error: null });
        try {
            const res = await axiosInstance.delete(`/project/deleteProject/${projectId}`);
            ToastSuccess({ message: res.data });
            return true;
        } catch (error: any) {
            ToastError({ message: error.response?.data?.message });
            return false;
        }
    }
}))