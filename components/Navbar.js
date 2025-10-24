"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Drawer, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';

// Helper to get cookie by name
function getCookie(name) {
    if (typeof document === 'undefined') {
        Debug.LogError("document is undefined");
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Helper to set cookie
function setCookie(name, value, days) {
    if (typeof document === 'undefined') {
        Debug.LogError("document is undefined");
        return;
    }
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Navigation translations for English and Spanish
const navTranslations = {
    en: {
        venues: "VENUES",
        management: "MANAGEMENT",
        producciones: "PRODUCTIONS",
        about: "ABOUT US",
        contact: "CONTACT",
        languageToggle: "| ESP |"
    },
    es: {
        venues: "VENUES",
        management: "MANAGEMENT",
        producciones: "PRODUCCIONES",
        about: "QUIÉNES SOMOS",
        contact: "CONTACTO",
        languageToggle: "| ENG |"
    }
};

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);  // Track loading state
    const [language, setLanguage] = useState('en');  // Language state

    // Media query to determine if the screen is mobile
    const isMobileQuery = useMediaQuery('(max-width:800px)');

    // Read language from cookie on mount
    useEffect(() => {
        setIsMobile(isMobileQuery);
        const cookieLang = getCookie('lang');
        if (cookieLang && (cookieLang === 'es' || cookieLang === 'en')) {
            setLanguage(cookieLang);
        }
        setLoading(false);
    }, [isMobileQuery]);

    // Toggle language and update cookie
    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'es' : 'en';
        setLanguage(newLang);
        setCookie('lang', newLang, 7); // Cookie expires in 7 days
        window.location.reload();
    };

    // Select navigation texts based on language
    const nav = navTranslations[language] || navTranslations.en;

    return (
        <Box
            sx={{
                width: '100%',
                height: '6vh',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: 'rgba(230, 230, 230, 1)',
            }}
        >
            {/* Logo - Always visible */}
            <Box sx={{ ml: '2vw' }}>
                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/'}>
                    <img 
                        src="/images/logo.png" 
                        alt="logo" 
                        style={{ 
                            height: '4vh', 
                            filter: 'invert(1)',
                            minWidth: '60px'
                        }} 
                    />
                </Button>
            </Box>

            {/* Right side content */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: '2vw' }}>
                {!loading && (
                    isMobile ? (
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => setDrawerOpen(true)}
                            sx={{ filter: 'invert(1)' }}
                        >
                            <MenuIcon sx={{ fill: 'white' }} />
                        </IconButton>
                    ) : (
                        <>
                            {/* Desktop navigation items */}
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <Button 
                                    sx={{ 
                                        color: 'white',
                                        filter: 'invert(1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationColor: 'white',
                                            textDecorationThickness: '1px'
                                        }
                                    }} 
                                    onClick={() => {
                                        const element = document.getElementById('venues-section');
                                        if (element) {
                                            const elementPosition = element.offsetTop;
                                            const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                >
                                    <Typography variant="p" sx={{ color: 'white' }}>{nav.venues}</Typography>
                                </Button>
                                <Button 
                                    sx={{ 
                                        color: 'white',
                                        filter: 'invert(1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationColor: 'white',
                                            textDecorationThickness: '1px'
                                        }
                                    }} 
                                    onClick={() => {
                                        const element = document.getElementById('management-section');
                                        if (element) {
                                            const elementPosition = element.offsetTop;
                                            const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                >
                                    <Typography variant="p" sx={{ color: 'white' }}>{nav.management}</Typography>
                                </Button>
                                <Button 
                                    sx={{ 
                                        color: 'white',
                                        filter: 'invert(1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationColor: 'white',
                                            textDecorationThickness: '1px'
                                        }
                                    }} 
                                    onClick={() => {
                                        const element = document.getElementById('producciones-section');
                                        if (element) {
                                            const elementPosition = element.offsetTop;
                                            const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                >
                                    <Typography variant="p" sx={{ color: 'white' }}>{nav.producciones}</Typography>
                                </Button>
                                <Button 
                                    sx={{ 
                                        color: 'white',
                                        filter: 'invert(1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationColor: 'white',
                                            textDecorationThickness: '1px'
                                        }
                                    }} 
                                    onClick={() => {
                                        const element = document.getElementById('about-section');
                                        if (element) {
                                            const elementPosition = element.offsetTop;
                                            const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                >
                                    <Typography variant="p" sx={{ color: 'white' }}>{nav.about}</Typography>
                                </Button>
                                <Button 
                                    sx={{ 
                                        color: 'white',
                                        filter: 'invert(1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationColor: 'white',
                                            textDecorationThickness: '1px'
                                        }
                                    }} 
                                    onClick={() => {
                                        const element = document.getElementById('contact-section');
                                        if (element) {
                                            const elementPosition = element.offsetTop;
                                            const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                >
                                    <Typography variant="p" sx={{ color: 'white' }}>{nav.contact}</Typography>
                                </Button>
                                {/* Language toggle button */}
                                <Button 
                                    sx={{ 
                                        color: 'white',
                                        filter: 'invert(1)',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationColor: 'white',
                                            textDecorationThickness: '1px'
                                        }
                                    }} 
                                    onClick={toggleLanguage}
                                >
                                    <Typography variant="p" sx={{ color: 'white' }}>{nav.languageToggle}</Typography>
                                </Button>
                            </Box>
                        </>
                    )
                )}
            </Box>

            {/* Mobile drawer with white borders */}
            <Drawer 
                anchor="right"
                open={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '200px',
                        height: 'auto',
                        background: "white",
                        backgroundColor: 'white',
                        color: 'white',
                        marginTop: '6vh'
                    }
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    alignItems: 'left',
                    width: '100%',
                    textAlign: 'left',
                    justifyContent: 'left'
                }}>
                    <Button 
                        sx={{ 
                            textAlign: 'left', 
                            justifyContent: 'left', 
                            marginLeft: '1.25rem',
                            color: 'white',
                            filter: 'invert(1)'
                        }} 
                        onClick={() => {
                            const element = document.getElementById('venues-section');
                            if (element) {
                                const elementPosition = element.offsetTop;
                                const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                            setDrawerOpen(false);
                        }}
                    >
                        <Typography variant="p" sx={{ color: 'white' }}>{nav.venues}</Typography>
                    </Button>
                    <Button 
                        sx={{ 
                            textAlign: 'left', 
                            justifyContent: 'left', 
                            marginLeft: '1.25rem',
                            color: 'white',
                            filter: 'invert(1)'
                        }} 
                        onClick={() => {
                            const element = document.getElementById('management-section');
                            if (element) {
                                const elementPosition = element.offsetTop;
                                const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                            setDrawerOpen(false);
                        }}
                    >
                        <Typography variant="p" sx={{ color: 'white' }}>{nav.management}</Typography>
                    </Button>
                    <Button 
                        sx={{ 
                            textAlign: 'left', 
                            justifyContent: 'left', 
                            marginLeft: '1.25rem',
                            color: 'white',
                            filter: 'invert(1)'
                        }} 
                        onClick={() => {
                            const element = document.getElementById('producciones-section');
                            if (element) {
                                const elementPosition = element.offsetTop;
                                const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                            setDrawerOpen(false);
                        }}
                    >
                        <Typography variant="p" sx={{ color: 'white' }}>{nav.producciones}</Typography>
                    </Button>
                    <Button 
                        sx={{ 
                            textAlign: 'left', 
                            justifyContent: 'left', 
                            marginLeft: '1.25rem',
                            color: 'white',
                            filter: 'invert(1)'
                        }} 
                        onClick={() => {
                            const element = document.getElementById('about-section');
                            if (element) {
                                const elementPosition = element.offsetTop;
                                const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                            setDrawerOpen(false);
                        }}
                    >
                        <Typography variant="p" sx={{ color: 'white' }}>{nav.about}</Typography>
                    </Button>
                    <Button 
                        sx={{ 
                            textAlign: 'left', 
                            justifyContent: 'left', 
                            marginLeft: '1.25rem',
                            color: 'white',
                            filter: 'invert(1)'
                        }} 
                        onClick={() => {
                            const element = document.getElementById('contact-section');
                            if (element) {
                                const elementPosition = element.offsetTop;
                                const offsetPosition = elementPosition - window.innerHeight * 0.06; // 6vh offset
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }
                            setDrawerOpen(false);
                        }}
                    >
                        <Typography variant="p" sx={{ color: 'white' }}>{nav.contact}</Typography>
                    </Button>
                    {/* Mobile language toggle */}
                    <Button 
                        sx={{ 
                            textAlign: 'left', 
                            justifyContent: 'left', 
                            marginLeft: '1.25rem',
                            color: 'white',
                            filter: 'invert(1)'
                        }} 
                        onClick={toggleLanguage}
                    >
                        <Typography variant="p" sx={{ color: 'white' }}>{language === 'en' ? '🇪🇸 ES' : '🇬🇧 EN'}</Typography>
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
}

// Debug object to log errors
const Debug = {
    LogError: (msg) => {
        console.error(msg);
    }
};
