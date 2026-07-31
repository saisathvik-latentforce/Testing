import { createTheme } from '@mui/material';

const baseTokens = {
  primary: '#7a4a10', // passes WCAG AA 4.5:1 on white
  secondary: '#164a25',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: baseTokens.primary },
    secondary: { main: baseTokens.secondary },
    background: { default: '#fafaf8', paper: '#ffffff' },
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
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { defaultProps: { elevation: 2 } },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `3px solid ${baseTokens.secondary}`,
            outlineOffset: 2,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c68b3e' },
    secondary: { main: '#4caf77' },
    background: { default: '#1a120b', paper: '#2c1f13' },
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
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { defaultProps: { elevation: 2 } },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '3px solid #4caf77',
            outlineOffset: 2,
          },
        },
      },
    },
  },
});

export default lightTheme;
