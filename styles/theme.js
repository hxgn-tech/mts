import { createTheme } from '@mui/material/styles';
import { color } from 'd3';

const theme = createTheme({
    palette: {
        mode: 'dark',
        black: { main: "#202020" },
        green: { main: "#607C60" },
        gold: { main: "#988254" },
        white: { main: "#E1E1E1" },
        blue: { main: "#111e45" },
        primary: { main: '#E1E1E1' },
        secondary: { main: '#f48fb1' },
        background: {
            default: '#E1E1E1',
            paper: "#E1E1E1"
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
            fontFamily: 'Garamond'
        },
    },
    typography: {
        fontFamily: [
            'Garamond',
            'serif' // Fallback font
        ].join(','),
        h1: {
            fontSize: '4rem',
            fontWeight: 400,
            '@media (max-width:1200px)': { fontSize: '3rem' }, // Tablet
            '@media (max-width:600px)': { fontSize: '2.75rem' }, // Mobile
        },
        fontFamily: 'Garamond',
        h2: {
            fontSize: '3rem',
            fontWeight: 400,
            '@media (max-width:1200px)': { fontSize: '2rem' },
            '@media (max-width:600px)': { fontSize: '1.55rem' },
        },
        fontFamily: 'Garamond',
        body1: {
            fontSize: '1rem',
            '@media (max-width:900px)': { fontSize: '0.9rem' },
            '@media (max-width:600px)': { fontSize: '0.85rem' },
        },
        fontFamily: 'Garamond',
        p: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: '2.5rem',
            textAlign: 'justify',
            '@media (max-width:1200px)': { fontSize: '1.8rem' },
            '@media (max-width:600px)': { fontSize: '1.5rem', lineHeight: '2.25rem' },
        }
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        color: 'gold.main',
                        fontSize: '2rem', // Reduced from 2.5rem for better proportions
                        transform: 'translate(14px, 20px) scale(1)', // Initial position
                        '&.Mui-focused, &.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.9)', // Adjusted position when shrunk
                            color: 'gold.main',
                        },
                    },
                    '& .MuiOutlinedInput-root': {
                        color: 'black.main',
                        backgroundColor: 'white.main', // Solid background to prevent gaps
                        '& fieldset': {
                            borderColor: 'gold.main',
                            borderRadius: '0',
                            borderWidth: '2px' // Consistent border width
                        },
                        '&:hover fieldset': {
                            borderColor: 'gold.main',
                            boxShadow: '0 0 8px gold.main', // Gold glow effect
                            borderWidth: '2px'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'gold.main',
                            boxShadow: '0 0 12px gold.main', // Stronger glow when focused
                            borderWidth: '2px'
                        }
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    fontFamily: 'Garamond, serif',
                    fontSize: '1.5rem', // More reasonable size
                    padding: '1.2rem', // Proper padding
                    '&::placeholder': {
                        color: 'gold.main',
                        opacity: 0.7
                    }
                },
                notchedOutline: {
                    borderWidth: '0px' // Ensure consistent border width
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.2s cubic-bezier(0.0, 0, 0.2, 1) 0ms', // Smoother transition
                    '&.Mui-focused': {
                        color: 'gold.main !important',
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Garamond, serif !important',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'Garamond, serif'
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    fontFamily: 'Garamond'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: 'Garamond, serif',
                    transformOrigin: 'top left',
                    '&.Mui-focused': {
                        color: 'gold.main'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    fontFamily: 'Garamond, serif',
                    fontSize: '2rem',
                    minWidth: '20px',
                    background: '#E1E1E1',
                    color: 'black'
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': { borderBottom: '2px solid gold.main' },
                    '&:after': { borderBottom: '2px solid gold.main' }, // Gold instead of blue
                    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
                        borderBottom: '2px solid gold.main',
                    },
                },
            },
        },
    },
});

export default theme;
