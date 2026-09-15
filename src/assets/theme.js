import { alpha, createTheme } from '@mui/material/styles';

const light = {
  primary: '#6f3f23',
  secondary: '#1f5b4f',
  background: '#f7f3ed',
  paper: '#fffdf9',
  text: '#211b17',
};

const dark = {
  primary: '#e3a76f',
  secondary: '#75c5ad',
  background: '#15120f',
  paper: '#201b17',
  text: '#f8f1e8',
};

const buildTheme = (mode, tokens) =>
  createTheme({
    palette: {
      mode,
      primary: { main: tokens.primary },
      secondary: { main: tokens.secondary },
      background: { default: tokens.background, paper: tokens.paper },
      text: { primary: tokens.text },
      success: { main: mode === 'light' ? '#2f6b50' : '#75c5ad' },
    },
    shape: { borderRadius: 18 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontWeight: 500,
        letterSpacing: '-0.045em',
        lineHeight: 0.98,
      },
      h2: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontWeight: 500,
        letterSpacing: '-0.035em',
        lineHeight: 1.05,
      },
      h3: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontWeight: 500,
        letterSpacing: '-0.025em',
      },
      h4: { fontWeight: 700, letterSpacing: '-0.025em' },
      h5: { fontWeight: 700, letterSpacing: '-0.02em' },
      h6: { fontWeight: 700, letterSpacing: '-0.015em' },
      button: { fontWeight: 700, letterSpacing: '-0.01em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: {
            backgroundColor: tokens.background,
            backgroundImage:
              mode === 'light'
                ? 'radial-gradient(circle at 10% 0%, rgba(196, 157, 112, .13), transparent 28%)'
                : 'radial-gradient(circle at 10% 0%, rgba(227, 167, 111, .08), transparent 28%)',
          },
          '::selection': { backgroundColor: alpha(tokens.primary, 0.24) },
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              scrollBehavior: 'auto !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: alpha(tokens.paper, 0.88),
            color: tokens.text,
            borderBottom: `1px solid ${alpha(tokens.text, 0.08)}`,
            backdropFilter: 'blur(18px)',
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${alpha(tokens.text, 0.08)}`,
            boxShadow: `0 18px 50px -34px ${alpha(tokens.text, 0.42)}`,
          },
        },
      },
      MuiPaper: { defaultProps: { elevation: 0 } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { minHeight: 44, borderRadius: 999, paddingInline: 20, textTransform: 'none' },
          containedPrimary: {
            boxShadow: `0 10px 24px -14px ${alpha(tokens.primary, 0.9)}`,
          },
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 650 } } },
      MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 14 } } },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${alpha(tokens.text, 0.1)}`,
            borderRadius: '16px !important',
            marginBottom: 12,
            overflow: 'hidden',
            '&::before': { display: 'none' },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: `3px solid ${alpha(tokens.secondary, 0.7)}`,
              outlineOffset: 2,
            },
          },
        },
      },
    },
  });

export const lightTheme = buildTheme('light', light);
export const darkTheme = buildTheme('dark', dark);

export default lightTheme;
