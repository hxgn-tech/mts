import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import theme from '../styles/theme.js';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar.js';
import { Doto } from 'next/font/google';

const doto = Doto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function Layout({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    return (
        <>
            <Toaster />
            <Head>
                <title>MTS Agency</title>
                <link rel="icon" href="/images/favicon.ico" />
                <style>{`   
                    body { 
                        margin: 0; 
                        padding: 0; 
                        background: ${theme.palette.background.default}; 
                        overflow-x: hidden;
                    }
                    html {
                        overflow-x: hidden;
                    }
                    * {
                        box-sizing: border-box;
                    }
                `}</style>
            </Head>
            <ThemeProvider theme={theme}>
                <Navbar />
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '100vh',
                        backgroundColor: 'blue.main',
                        mt: '6vh',
                        fontFamily: 'Mulish, Arial, sans-serif',
                        scrollBehavior: 'smooth',
                        overflowX: 'hidden',
                    }}
                >
                    {children ? children : null}
                </Box>
                {/* Floating WhatsApp button
                <Fab
                    color="primary"
                    aria-label="whatsapp"
                    href="https://wa.me/+34658928541"
                    target="_blank"
                    rel="noopener"
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 1000,
                    }}
                >
                    <WhatsAppIcon />
                </Fab> */}
            </ThemeProvider>
        </>
    );
}
