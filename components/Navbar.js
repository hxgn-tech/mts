"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Drawer } from "@mui/material";
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
        philosophy: "PHILOSOPHY",
        services: "SERVICES",
        portfolio: "PORTFOLIO",
        bio: "PROFILE",
        news: "NEWS",
        contact: "CONTACT",
        languageToggle: "| ESP |"
    },
    es: {
        philosophy: "FILOSOFÍA",
        services: "SERVICIOS",
        portfolio: "PORTAFOLIO",
        bio: "PERFIL",
        news: "NOTICIAS",
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
                width: '100vw',
                height: '6vh',
                backgroundColor: 'blue.main',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white',
                position: 'fixed',
                top: 0,
                zIndex: 1000,
                backdropFilter: 'blur(0px)',
                transition: 'backdrop-filter 0.3s ease',
            }}
        >
            {/* Logo - Always visible */}
            <Box sx={{ ml: '2vw' }}>
                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/'}>
                    <img 
                        src="/images/sonnevi_logo-w.svg" 
                        alt="logo" 
                        style={{ 
                            height: '4vh', 
                            // filter: 'brightness(15)',
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
                        >
                            <MenuIcon sx={{ fill: 'white' }} />
                        </IconButton>
                    ) : (
                        <>
                            {/* Desktop navigation items */}
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/profile'}>
                                    {nav.bio}
                                </Button>
                                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/design'}>
                                    {nav.philosophy}
                                </Button>
                                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/portfolio'}>
                                    {nav.portfolio}
                                </Button>
                                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/services'}>
                                    {nav.services}
                                </Button>
                                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/news'}>
                                    {nav.news}
                                </Button>
                                <Button sx={{ color: 'white' }} onClick={() => window.location.href = '/contact'}>
                                    {nav.contact}
                                </Button>
                                {/* Language toggle button */}
                                <Button sx={{ color: 'white' }} onClick={toggleLanguage}>
                                    {nav.languageToggle}
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
                        background: "transparent",
                        backgroundColor: 'blue.main',
                        color: 'white',
                        borderLeft: '1px solid white',
                        borderBottom: '1px solid white',
                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
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
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={() => window.location.href = '/profile'}>
                        {nav.bio}
                    </Button>
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={() => window.location.href = '/design'}>
                        {nav.philosophy}
                    </Button>
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={() => window.location.href = '/portfolio'}>
                        {nav.portfolio}
                    </Button>
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={() => window.location.href = '/services'}>
                        {nav.services}
                    </Button>
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={() => window.location.href = '/news'}>
                        {nav.news}
                    </Button>
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={() => window.location.href = '/contact'}>
                        {nav.contact}
                    </Button>
                    {/* Mobile language toggle */}
                    <Button sx={{ color: 'white', fontSize: '1.25rem', textAlign: 'left', justifyContent: 'left', marginLeft: '1.25rem' }} onClick={toggleLanguage}>
                    {language === 'en' ? '🇪🇸 ES' : '🇬🇧 EN'}
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
