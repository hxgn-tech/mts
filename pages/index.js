"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { getVenues } from '../controllers/venues';
import { getManagementItems } from '../controllers/management';
import { getProducciones } from '../controllers/producciones';
import VenuesSection from '../components/VenuesSection';
import ManagementSection from '../components/ManagementSection';
import ProduccionesSection from '../components/ProduccionesSection';
import QuienesSomosSection from '../components/QuienesSomosSection';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';

// Helper to get cookie by name
function getCookie(name) {
    if (typeof document === 'undefined') {
        console.error("document is undefined");
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const logoAnimation = {
    hidden: { 
        opacity: 0, 
        filter: 'blur(10px)', 
        scale: 0.95 
    },
    visible: { 
        opacity: 1, 
        filter: 'blur(0px)', 
        scale: 1,
        transition: { 
            duration: 0.5, 
            ease: 'easeOut' 
        }
    }
};

export default function App() {
    const [venues, setVenues] = useState([]);
    const [managementItems, setManagementItems] = useState([]);
    const [producciones, setProducciones] = useState([]);
    const [language, setLanguage] = useState('en');

    // Read language from cookie on mount and load items
    useEffect(() => {
        const cookieLang = getCookie('lang');
        if (cookieLang && (cookieLang === 'en' || cookieLang === 'es')) {
            setLanguage(cookieLang);
        } else {
            setLanguage('en');
        }
        getVenues(setVenues);
        getManagementItems(setManagementItems);
        getProducciones(setProducciones);
    }, []);

    return (
        <Layout>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'black.main',
                    minHeight: '100vh'
                }}
            >
                {/* Banner Section */}
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <Image
                        src="/images/banner.jpeg"
                        alt="Background"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1
                        }}
                    />
                    
                    {/* Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 2
                        }}
                    />
                    
                    {/* Logo */}
                    <Box
                        component={motion.div}
                        initial="hidden"
                        animate="visible"
                        variants={logoAnimation}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 3,
                            flexDirection: 'column'
                        }}
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Main Logo"
                            placeholder="empty"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxHeight: '16rem',
                                filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))'
                            }}
                        />
                        
                        <Typography
                            variant="h2"
                            sx={{
                                color: 'white !important',
                                fontFamily: 'Garamond',
                                fontSize: { xl: '2rem', md: '1.5rem', xs: '1.2rem' },
                                textAlign: 'center',
                                marginTop: '2rem',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                            }}
                        >
                            Music Production & Artist Management
                        </Typography>
                    </Box>
                </Box>
                
                {/* Venues Section */}
                <VenuesSection venues={venues} language={language} />
                
                {/* Management Section */}
                <ManagementSection managementItems={managementItems} language={language} />
                
                {/* Producciones Section */}
                <ProduccionesSection producciones={producciones} language={language} />
                
                {/* Quienes Somos Section */}
                <QuienesSomosSection language={language} />
                
                {/* Contact Section */}
                <ContactSection language={language} />
            </Box>
        </Layout>
    );
}