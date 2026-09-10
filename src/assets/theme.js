import { createTheme, alpha } from '@mui/material';

const baseTokens = {
  primary: '#7a4a10', // passes WCAG AA 4.5:1 on white
  secondary: '#164a25',
};

const typography = {
  fontFamily: 'Droid Sans, sans-serif',
  h1: { fontFamily: 'Eagle Lake, serif', fontWeight: 500, letterSpacing: 0.5 },
  h2: { fontFamily: 'Eagle Lake, serif', fontWeight: 500 },
  h3: { fontFamily: 'Eagle Lake, serif', fontWeight: 500 },
  h4: { fontFamily: 'Eagle Lake, serif', fontWeight: 500 },
  h5: { fontFamily: 'Eagle Lake, serif', fontWeight: 500, letterSpacing: 0.3 },
  h6: { fontFamily: 'Eagle Lake, serif', fontWeight: 500, letterSpacing: 0.2 },
  button: { fontWeight: 600, letterSpacing: 0.3 },
};

const shape = { borderRadius: 14 };

// Shared component overrides, parameterized by a mode-specific accent used for
// soft colored shadows (keeps the same tested palette, just richer depth).
const buildComponents = ({ primary, secondary, scrollbarTrack, scrollbarThumb, cardShadow }) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: `${scrollbarThumb} ${scrollbarTrack}`,
      },
      '::selection': {
        backgroundColor: alpha(primary, 0.35),
      },
      '*::-webkit-scrollbar': { width: 10, height: 10 },
      '*::-webkit-scrollbar-track': { background: scrollbarTrack },
      '*::-webkit-scrollbar-thumb': {
        background: scrollbarThumb,
        borderRadius: 8,
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: primary,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: `linear-gradient(90deg, ${primary} 0%, ${alpha(primary, 0.92)} 100%)`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 4px 20px -4px ${alpha(primary, 0.5)}`,
      },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        border: `1px solid ${alpha(primary, 0.08)}`,
        boxShadow: cardShadow,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: { borderRadius: shape.borderRadius },
      elevation1: { boxShadow: cardShadow },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': { transform: 'translateY(-1px)' },
      },
      containedPrimary: {
        backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${alpha(primary, 0.8)} 100%)`,
        boxShadow: `0 6px 16px -4px ${alpha(primary, 0.55)}`,
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: `0 10px 22px -4px ${alpha(primary, 0.6)}`,
        },
      },
      containedSecondary: {
        backgroundImage: `linear-gradient(135deg, ${secondary} 0%, ${alpha(secondary, 0.8)} 100%)`,
        boxShadow: `0 6px 16px -4px ${alpha(secondary, 0.55)}`,
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: `0 10px 22px -4px ${alpha(secondary, 0.6)}`,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: { root: { fontWeight: 600, borderRadius: 8 } },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },
  MuiOutlinedInput: {
    styleOverrides: { root: { borderRadius: 10 } },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: `0 8px 20px -4px ${alpha(primary, 0.6)}`,
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        border: `1px solid ${alpha(primary, 0.1)}`,
        '&:before': { display: 'none' },
        '&.Mui-expanded': { boxShadow: cardShadow },
        overflow: 'hidden',
        marginBottom: 8,
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&.Mui-focusVisible': {
          outline: `3px solid ${secondary}`,
          outlineOffset: 2,
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: baseTokens.primary },
    secondary: { main: baseTokens.secondary },
    background: { default: '#faf7f2', paper: '#ffffff' },
  },
  typography,
  shape,
  components: buildComponents({
    primary: baseTokens.primary,
    secondary: baseTokens.secondary,
    scrollbarTrack: '#f0e9df',
    scrollbarThumb: alpha(baseTokens.primary, 0.45),
    cardShadow: `0 10px 30px -12px ${alpha(baseTokens.primary, 0.28)}`,
  }),
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c68b3e' },
    secondary: { main: '#4caf77' },
    background: { default: '#150f09', paper: '#221609' },
  },
  typography,
  shape,
  components: buildComponents({
    primary: '#c68b3e',
    secondary: '#4caf77',
    scrollbarTrack: '#1f150a',
    scrollbarThumb: alpha('#c68b3e', 0.4),
    cardShadow: '0 10px 30px -12px rgba(0,0,0,0.6)',
  }),
});

export default lightTheme;
