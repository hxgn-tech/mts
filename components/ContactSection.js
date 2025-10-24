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
            emailContact: "Informacion",
            emailMgmt: "Management & Booking",
            emailPrensa: "Press & Accreditations",
            emailVorterix: "Teatro Vorterix",
            emailRoxyLive: "The Roxy Live!",
            emailRoxyBar: "The Roxy Bar & Grill",
            phone: "Phone",
            address: "Address",
            social: "Social Media",
            contactUs: "Contact Us"
        },
        es: {
            title: "CONTACTO",
            subtitle: "Ponte en contacto con nosotros",
            emailContact: "Información",
            emailMgmt: "Management y Booking",
            emailPrensa: "Prensa y Acreditaciones",
            emailVorterix: "Teatro Vorterix",
            emailRoxyLive: "The Roxy Live!",
            emailRoxyBar: "The Roxy Bar & Grill",
            phone: "Teléfono",
            address: "Dirección",
            social: "Redes Sociales",
            contactUs: "Contáctanos"
        }
    };

    const t = translations[language] || translations.en;

    const contactInfo = [
        {
            title: t.emailContact,
            content: "info@mtsagencyar.com",
            link: "mailto:info@mtsagencyar.com"
        },
        {
            title: t.emailMgmt,
            content: "management@mtsagencyar.com",
            link: "mailto:management@mtsagencyar.com",
        },
        {
            title: t.emailPrensa,
            content: "acreditaciones@mtsagencyar.com",
            link: "mailto:acreditaciones@mtsagencyar.com",
        },
        {
            title: t.emailVorterix,
            content: "teatrovorterix@mtsagencyar.com",
            link: "mailto:teatrovorterix@mtsagencyar.com",
        },
        {
            title: t.emailRoxyLive,
            content: "roxylive@mtsagencyar.com",
            link: "mailto:roxylive@mtsagencyar.com"
        },
        {
            title: t.emailRoxyBar,
            content: "roxybar@mtsagencyar.com",
            link: "mailto:roxybar@mtsagencyar.com"
        },
        // {
        //     title: t.phone,
        //     content: "+34 123 456 789",
        //     link: "tel:+34123456789"
        // }
    ];

    const socialMediaLinks = [
         {
            name: "Instagram", 
            link: "https://www.instagram.com/mtsagencyar/"
        },
        {
            name: "Linkedin",
            link: "https://www.linkedin.com/company/mts-agency"
        },
        // {
        //     name: "Twitter",
        //     link: "https://twitter.com/mts_official"
        // },
        // {
        //     name: "Spotify",
        //     link: "https://open.spotify.com/user/mts_official"
        // }
    ];

    return (
        <Box
            id="contact-section"
            sx={{
                width: '100%',
                padding: { xl: '5rem', xs: '2rem' },
                backgroundColor: 'white.main',
                color: 'black.main'
            }}
        >
            <Box
                sx={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    borderRight: '1px solid black',
                    paddingLeft: { xs: '1rem', lg: '2rem' },
                    paddingRight: { xs: '1rem', lg: '2rem' }
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={titleAnimation}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            textAlign: 'right',
                            color: 'primary.main',
                            fontSize: { xs: '3rem', sm: '4rem', md: '6rem', lg: '8rem' },
                            lineHeight: { xs: '1', sm: '1.1', md: '1.2' }
                        }}
                    >
                        {t.title}
                    </Typography>
                </motion.div>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        marginTop: '2rem',
                        gap: { xs: '2rem', lg: '0' }
                    }}
                >
                    {/* Contact Info Column */}
                    <Box
                        sx={{
                            width: { xs: '100%', lg: '33%' },
                            display: 'flex',
                            flexDirection: 'column',
                            padding: { xs: '0', lg: '2rem' },
                            order: { xs: 1, lg: 1 }
                        }}
                    >
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={cardAnimation}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Box
                                    sx={{
                                        marginBottom: '2rem',
                                        borderBottom: { xs: '1px solid black', lg: 'none' },
                                        paddingBottom: { xs: '1rem', lg: '0' }
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginBottom: '0.5rem',
                                            color: 'primary.main',
                                            fontFamily: 'Garamond',
                                            textTransform: 'uppercase',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    
                                    <Button
                                        href={item.link}
                                        target={item.link.startsWith('http') ? '_blank' : undefined}
                                        variant="text"
                                        sx={{
                                            color: 'black.main',
                                            textDecoration: 'none',
                                            fontSize: '1rem',
                                            padding: '0',
                                            textTransform: 'none',
                                            justifyContent: 'flex-start',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        {item.content}
                                    </Button>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>

                    {/* White Border Divider */}
                    <Box
                        sx={{
                            width: { xs: '0', lg: '1px' },
                            height: { xs: '0', lg: 'auto' },
                            backgroundColor: 'black',
                            margin: { xs: '0', lg: '1rem 0' },
                            display: { xs: 'none', lg: 'block' }
                        }}
                    />

                    {/* Social Media Column */}
                    <Box
                        sx={{
                            width: { xs: '100%', lg: '33%' },
                            borderLeft: { xs: 'none', lg: '1px solid black' },
                            borderBottom: { xs: '1px solid black', lg: 'none' },
                            paddingLeft: { xs: '0', lg: '2rem' },
                            paddingBottom: { xs: '2rem', lg: '0' },
                            order: { xs: 2, lg: 2 }
                        }}
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardAnimation}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    marginBottom: '1.5rem',
                                    color: 'primary.main',
                                    fontFamily: 'Garamond',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {t.social}
                            </Typography>
                            
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                            >
                                {socialMediaLinks.map((social, index) => (
                                    <Typography
                                        key={index}
                                        component="a"
                                        href={social.link}
                                        target="_blank"
                                        variant="p"
                                        sx={{
                                            color: 'black.main',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase',
                                            fontSize: '0.9rem',
                                            '&:hover': {
                                                color: 'primary.main',
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        {social.name}
                                    </Typography>
                                ))}
                            </Box>
                        </motion.div>
                    </Box>

                    {/* White Border Divider */}
                    <Box
                        sx={{
                            width: { xs: '0', lg: '1px' },
                            height: { xs: '0', lg: 'auto' },
                            backgroundColor: 'black',
                            margin: { xs: '0', lg: '1rem 0' },
                            display: { xs: 'none', lg: 'block' }
                        }}
                    />

                    {/* Address and Map Column */}
                    <Box
                        sx={{
                            width: { xs: '100%', lg: '34%' },
                            borderLeft: { xs: 'none', lg: '1px solid black' },
                            borderBottom: { xs: '1px solid black', lg: 'none' },
                            paddingLeft: { xs: '0', lg: '2rem' },
                            paddingBottom: { xs: '2rem', lg: '0' },
                            order: { xs: 3, lg: 3 }
                        }}
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardAnimation}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    marginBottom: '1rem',
                                    color: 'primary.main',
                                    fontFamily: 'Garamond',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {t.address}
                            </Typography>
                            
                            <Typography
                                variant="p"
                                sx={{
                                    color: 'black.main',
                                    fontSize: '0.9rem',
                                    marginBottom: '1.5rem',
                                    lineHeight: 1.6
                                }}
                            >
                                Av. Álvarez Thomas 1131, C1426 CABA, Argentina
                            </Typography>
                            
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '200px',
                                    border: '1px solid black'
                                }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.024607634242!2d-58.4578275!3d-34.57824389999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5de0d2ac919%3A0xda161beff807276d!2sMTS%20AGENCY!5e0!3m2!1sen!2sar!4v1761231120527!5m2!1sen!2sar"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </Box>
                        </motion.div>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}