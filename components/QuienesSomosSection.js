import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const cardAnimation = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.6, ease: 'easeOut' } 
    },
    exit: {
        opacity: 0,
        x: -100,
        transition: { duration: 0.3, ease: 'easeIn' }
    }
};

const titleAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: 'easeOut' } 
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
            description: "MTS PRODUCCIONES Se ubica entre las productoras de espectáculos más prestigiosas del país y de América Latina. Desde 1993 y ya con más de 20 años de trayectoria, MTS con base e historia dentro de la industria del entretenimiento en Argentina, transforma y proyecta año tras año diferentes objetivos para lograr estilos y conceptos diferenciados en el contenido para las producciones nacionales e internacionales.",
            secondDescription: "Hoy la empresa cuenta con el management exclusivo de los venues mas destacados e importantes del país como lo son El Teatro Vorterix, The Roxy Live, Teatro Vorterix Rosario y las diferentes producciones Nacionales e internacionales que año a año superan en cantidad y calidad como asi también la productora oficial de eventos de renombre internacional como lo es la franquicia internacional \"Monster of Rock\".",
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
                backgroundImage: 'url("/images/crowd backgrounbd.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',
                color: 'black.main',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 0.7) 100%)',
                    zIndex: 1
                }
            }}
        >
            <Box
                sx={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    borderLeft: '1px solid black',
                    paddingLeft: '2rem',
                    position: 'relative',
                    zIndex: 2
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
                            textAlign: 'left',
                            color: 'black.main',
                        }}
                    >
                        {t.title}
                    </Typography>
                </motion.div>

                {/* Content Card Display */}
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        touchAction: 'pan-y'
                    }}
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardAnimation}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem'
                            }}
                        >
                            {/* Text Content - Stacked Vertically */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2rem',
                                    maxWidth: '800px'
                                }}
                            >
                                {/* First Description */}
                                <Typography variant="p"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        color: 'black.main'
                                    }}
                                >
                                    {t.description}
                                </Typography>

                                {/* Second Description */}
                                <Typography variant="p"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        color: 'black.main'
                                    }}
                                >
                                    {t.secondDescription}
                                </Typography>
                            </Box>

                            {/* Team Members Section */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2rem',
                                    marginTop: '3rem'
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: 'black.main',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    {language === 'es' ? 'NUESTRO EQUIPO' : 'OUR TEAM'}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                                        gap: '2rem',
                                        maxWidth: '1000px',
                                        margin: '0 auto'
                                    }}
                                >
                                    {/* Team Member 1 */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            padding: '1.5rem',
                                            border: '1px solid black',
                                            backgroundColor: 'transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '120px',
                                                height: '120px',
                                                position: 'relative',
                                                marginBottom: '1rem',
                                                borderRadius: '50%',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Image
                                                src="/images/jan_pp.png"
                                                alt="Team Member"
                                                fill
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            {/* {language === 'es' ? 'Juan Pérez' : 'John Smith'} */}
                                            Chino
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                marginBottom: '1rem',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {language === 'es' ? 'Director General' : 'General Director'}
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.85rem',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {language === 'es' 
                                                ? 'Experto en producción musical con más de 15 años de experiencia en la industria.' 
                                                : 'Music production expert with over 15 years of experience in the industry.'
                                            }
                                        </Typography>
                                    </Box>

                                    {/* Team Member 2 */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            padding: '1.5rem',
                                            border: '1px solid black',
                                            backgroundColor: 'transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '120px',
                                                height: '120px',
                                                position: 'relative',
                                                marginBottom: '1rem',
                                                borderRadius: '50%',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <Image
                                                src="/images/jan_young.png"
                                                alt="Team Member"
                                                fill
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            {/* {language === 'es' ? 'María García' : 'Maria Garcia'} */}
                                            Diego
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                marginBottom: '1rem',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {language === 'es' ? 'Productor Ejecutivo' : 'Executive Producer'}
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.85rem',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {language === 'es' 
                                                ? 'Especialista en gestión de artistas y coordinación de eventos internacionales.' 
                                                : 'Artist management specialist and international event coordinator.'
                                            }
                                        </Typography>
                                    </Box>

                                    {/* Team Member 3 */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            padding: '1.5rem',
                                            border: '1px solid black',
                                            backgroundColor: 'transparent',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '120px',
                                                height: '120px',
                                                position: 'relative',
                                                marginBottom: '1rem',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'black.main',
                                                    fontSize: '2rem',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                +
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            {language === 'es' ? 'Más Miembros' : 'More Members'}
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                marginBottom: '1rem',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {language === 'es' ? 'Equipo Completo' : 'Full Team'}
                                        </Typography>
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.85rem',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {language === 'es' 
                                                ? 'Un equipo completo de profesionales dedicados a cada aspecto de la producción.' 
                                                : 'A complete team of professionals dedicated to every aspect of production.'
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
}