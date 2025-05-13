import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "rgb(4, 30, 63)",
        },
        background: {
            default: "rgb(255, 255, 255)",
            paper: "#fff",
        },
        text: {
            primary: "#000",
            secondary: "#555",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "rgb(47, 107, 185)",
        },
        secondary: {
            main: "rgba(222, 232, 243, 0.73)",
        },
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            primary: "#fff",
            secondary: "#aaa",
        },
    },
});