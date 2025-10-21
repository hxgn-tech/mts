import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#ffffff' },
        background: {
            default: '#101014',
            paper: '#101014'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff'
        },
    },
    typography: {
        fontFamily: [
            'Roboto Flex',
            'sans-serif'
        ].join(','),
        h1: {
            color: '#ffffff',
            fontSize: '8rem', // 128px
            fontWeight: 'bold',
            '@media (max-width:1200px)': { fontSize: '6rem' }, // 96px
            '@media (max-width:600px)': { fontSize: '4rem' }, // 64px
        },
        h2: {
            color: '#ffffff',
            fontSize: '7rem', // 112px
            fontWeight: 'bold',
            '@media (max-width:1200px)': { fontSize: '5rem' }, // 80px
            '@media (max-width:600px)': { fontSize: '3rem' }, // 48px
        },
        body1: {
            color: '#ffffff',
            fontSize: '1.25rem', // 20px
            '@media (max-width:900px)': { fontSize: '1.125rem' }, // 18px
            '@media (max-width:600px)': { fontSize: '1rem' }, // 16px
        },
        p: {
            color: '#ffffff',
            fontSize: '1.25rem', // 20px
            fontWeight: 100,
            textAlign: 'justify',
            '@media (max-width:1200px)': { fontSize: '1.5rem' }, // 24px
            '@media (max-width:600px)': { fontSize: '1.25rem', lineHeight: '1.875rem' }, // 20px with 30px line height
        }
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto Flex, sans-serif !important',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'Roboto Flex, sans-serif',
                    backgroundColor: '#101014',
                    color: '#ffffff'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;
