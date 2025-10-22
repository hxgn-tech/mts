import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#101014' },
        background: {
            default: '#ffffff',
            paper: '#ffffff'
        },
        text: {
            primary: '#101014',
            secondary: '#101014'
        },
    },
    typography: {
        fontFamily: [
            'Roboto Flex',
            'sans-serif'
        ].join(','),
        h1: {
            color: '#101014',
            fontSize: '8rem', // 128px
            fontWeight: 'bold',
            '@media (max-width:1200px)': { fontSize: '6rem' }, // 96px
            '@media (max-width:600px)': { fontSize: '4rem' }, // 64px
        },
        h2: {
            color: '#101014',
            fontSize: '2.5rem', // 112px
            lineHeight: '1',
            fontWeight: '100',
            textTransform: 'uppercase',
            '@media (max-width:1200px)': { fontSize: '5rem' }, // 80px
            '@media (max-width:600px)': { fontSize: '3rem' }, // 48px
        },
        body1: {
            color: '#101014',
            fontSize: '1.25rem', // 20px
            '@media (max-width:900px)': { fontSize: '1.125rem' }, // 18px
            '@media (max-width:600px)': { fontSize: '1rem' }, // 16px
        },
        p: {
            color: '#101014',
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
                    backgroundColor: '#ffffff',
                    color: '#101014'
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
