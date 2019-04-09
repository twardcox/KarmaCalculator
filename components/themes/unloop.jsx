import { createMuiTheme } from "@material-ui/core/styles";

// this theme created using https://in-your-saas.github.io/material-ui-theme-editor/
const theme = createMuiTheme({
    palette: {
        common: {
            black: "#3a3a3a",
            white: "#fff"
        },
        background: {
            paper: "#fff",
            default: "#f5f5f5"
        },
        primary: {
            light: "rgba(11, 186, 203, 1)",
            main: "rgba(5, 159, 174, 1)",
            dark: "rgba(5, 120, 132, 1)",
            contrastText: "rgba(255, 255, 255, 1)"
        },
        secondary: {
            light: "rgba(231, 124, 112, 1)",
            main: "rgba(182, 80, 68, 1)",
            dark: "rgba(233, 78, 61, 1)",
            contrastText: "rgba(255, 255, 255, 1)"
        },
        error: {
            light: "#fdf0f0",
            main: "#f44336",
            dark: "#c63131",
            contrastText: "#fff"
        },
        text: {
            primary: "#3a3a3a",
            secondary: "#3a3a3a",
            disabled: "#3a3a3a",
            hint: "#3a3a3a"
        },
        accent: {
            background: "#eaeaea"
        }
    },
    typography: {
        fontFamily: ["Calibri"].join(","),
        fontSize: 12,
        useNextVariants: true
    }
});

export default theme;
