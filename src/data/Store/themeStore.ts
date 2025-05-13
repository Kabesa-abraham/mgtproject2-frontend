import { create } from 'zustand';

interface ThemeState {
    darkMode: boolean;
    toggleTheme: () => void
}

const useThemeStore = create<ThemeState>((set) => ({
    darkMode: localStorage.getItem('myTheme') === 'true',
    toggleTheme: () => set((state) => {
        const newMode = !state.darkMode;
        localStorage.setItem('myTheme', newMode.toString());
        return { darkMode: newMode }
    })
}));

export default useThemeStore;