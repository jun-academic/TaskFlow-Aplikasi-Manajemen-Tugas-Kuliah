import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563EB",
        },
        secondary: {
            main: "#0F172A",
        },
        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
        },
        success: {
            main: "#16A34A",
        },
        warning: {
            main: "#F59E0B",
        },
        error: {
            main: "#DC2626",
        },
    },

    typography: {
        fontFamily: "Roboto, Arial, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 10,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 18px",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0px 2px 8px rgba(15, 23, 42, 0.06)",
                },
            },
        },
    },
});

export default theme;