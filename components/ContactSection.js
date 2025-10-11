import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const titleAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: 'easeOut' } 
    }
};

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: 'easeOut' } 
    }
};

export default function ContactSection({ language }) {
    const translations = {
        en: {
            title: "CONTACT",
            subtitle: "Get in touch with us",
            email: "Email",
            phone: "Phone",
            address: "Address",
            social: "Social Media",
            contactUs: "Contact Us"
        },
        es: {
            title: "CONTACTO",
            subtitle: "Ponte en contacto con nosotros",
            email: "Correo",
            phone: "Teléfono",
            address: "Dirección",
            social: "Redes Sociales",
            contactUs: "Contáctanos"
        }
    };

    const t = translations[language] || translations.en;

    const contactInfo = [
        {
            icon: "📧",
            title: t.email,
            content: "info@mts.com",
            link: "mailto:info@mts.com"
        },
        {
            icon: "📱",
            title: t.phone,
            content: "+34 123 456 789",
            link: "tel:+34123456789"
        },
        {
            icon: "📍",
            title: t.address,
            content: "Madrid, Spain",
            link: "https://maps.google.com"
        },
        {
            icon: "🌐",
            title: t.social,
            content: "@mts_official",
            link: "https://instagram.com/mts_official"
        }
    ];

    return (
        <Box
            id="contact-section"
            sx={{
                width: '100%',
                padding: { xl: '5rem', xs: '2rem' },
                backgroundColor: 'black.main',
                color: 'white.main'
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={titleAnimation}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '1rem',
                            fontSize: { xl: '3rem', md: '2.5rem', xs: '2rem' },
                            color: 'gold.main',
                            fontFamily: 'Garamond'
                        }}
                    >
                        {t.title}
                    </Typography>
                    
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '3rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontFamily: 'Garamond'
                        }}
                    >
                        {t.subtitle}
                    </Typography>
                </motion.div>

                <Grid container spacing={4}>
                    {contactInfo.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={cardAnimation}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '15px',
                                        padding: '2rem',
                                        textAlign: 'center',
                                        height: '100%',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 20px 40px rgba(152, 130, 84, 0.3)',
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontSize: '3rem',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        {item.icon}
                                    </Typography>
                                    
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginBottom: '1rem',
                                            color: 'gold.main',
                                            fontFamily: 'Garamond'
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    
                                    <Button
                                        href={item.link}
                                        target={item.link.startsWith('http') ? '_blank' : undefined}
                                        variant="text"
                                        sx={{
                                            color: 'white.main',
                                            textDecoration: 'none',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                color: 'gold.main'
                                            }
                                        }}
                                    >
                                        {item.content}
                                    </Button>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardAnimation}
                    style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                    <Button
                        href="/contact"
                        variant="outlined"
                        sx={{
                            borderColor: 'gold.main',
                            color: 'gold.main',
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            fontFamily: 'Garamond',
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: 'gold.main',
                                backgroundColor: 'rgba(152, 130, 84, 0.1)'
                            }
                        }}
                    >
                        {t.contactUs}
                    </Button>
                </motion.div>
            </Box>
        </Box>
    );
}