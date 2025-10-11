import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const titleAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: 'easeOut' } 
    }
};

const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1, ease: 'easeOut' } 
    }
};

const imageAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 1, ease: 'easeOut' } 
    }
};

export default function QuienesSomosSection({ language }) {
    const translations = {
        en: {
            title: "ABOUT US",
            description: "We are a creative team dedicated to music production and artist management. Our passion for music drives us to create exceptional experiences and support talented artists in their artistic journey.",
            learnMore: "LEARN MORE"
        },
        es: {
            title: "QUIÉNES SOMOS",
            description: "Somos un equipo creativo dedicado a la producción musical y gestión de artistas. Nuestra pasión por la música nos impulsa a crear experiencias excepcionales y apoyar a artistas talentosos en su trayectoria artística.",
            learnMore: "CONOCE MÁS"
        }
    };

    const t = translations[language] || translations.en;

    return (
        <Box
            id="about-section"
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
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: { xl: 'row', xs: 'column' },
                    gap: '3rem',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
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
                                fontSize: { xl: '3rem', md: '2.5rem', xs: '2rem' },
                                color: 'gold.main',
                                fontFamily: 'Garamond',
                                marginBottom: '1rem'
                            }}
                        >
                            {t.title}
                        </Typography>
                        <Box
                            sx={{
                                height: '3px',
                                backgroundColor: 'gold.main',
                                width: '100px'
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={textAnimation}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                color: 'white.main',
                                fontFamily: 'Garamond',
                                '&::first-letter': {
                                    float: 'left',
                                    fontSize: '4rem',
                                    lineHeight: '0.8',
                                    marginRight: '0.1em',
                                    marginTop: '0',
                                    color: 'gold.main'
                                }
                            }}
                        >
                            {t.description}
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={textAnimation}
                    >
                        <Button
                            href="/profile"
                            variant="outlined"
                            sx={{
                                borderColor: 'gold.main',
                                color: 'gold.main',
                                padding: '0.8rem 2rem',
                                fontSize: '1rem',
                                fontFamily: 'Garamond',
                                textTransform: 'none',
                                alignSelf: 'flex-start',
                                '&:hover': {
                                    borderColor: 'gold.main',
                                    backgroundColor: 'rgba(152, 130, 84, 0.1)'
                                }
                            }}
                        >
                            {t.learnMore}
                        </Button>
                    </motion.div>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageAnimation}
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            position: 'relative'
                        }}
                    >
                        <Image
                            src="/images/jan_pp.png"
                            alt="About Us"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '15px'
                            }}
                        />
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
}