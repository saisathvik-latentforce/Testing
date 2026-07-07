import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#845218',
        },
        secondary: {
            main: '#164a25',
        }
    },
    typography: {
        fontFamily: 'Droid Sans, sans-serif',
        h1: { fontFamily: 'Eagle Lake, serif' },
        h2: { fontFamily: 'Eagle Lake, serif' },
        h3: { fontFamily: 'Eagle Lake, serif' },
        h4: { fontFamily: 'Eagle Lake, serif' },
        h5: { fontFamily: 'Eagle Lake, serif' },
        h6: { fontFamily: 'Eagle Lake, serif' },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            defaultProps: {
                elevation: 2,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;
