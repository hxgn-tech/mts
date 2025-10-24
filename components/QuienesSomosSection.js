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
            description: "MTS Agency, with over 30 years of experience, is among the most prestigious entertainment agencies in Argentina and Latin America. Through its various departments (Venues, National and International Productions, and Management & Booking), it has established itself with a pioneering spirit, from the inception of TEATRO VORTERIX (the first multimedia venue in South America) to forming alliances with various agencies and producers (DF Entertainment - Live Nation, Move Concerts Arg, Pop Art Music Arg, and Dale Play, to name a few). It also brings to life the historic and iconic venue THE ROXY BS AS, home to many of Argentina's most renowned artists and a must-visit for international artists.",
            secondDescription: "Regarding its own productions, notable festivals include the 2 editions of MONSTERS OF ROCK ARG, MAXIMUS FEST ARG, all editions of GESELL ROCK, VORTERIX REGGAE FEST, VORTERIX METAL FEST, and currently developing ALERTA ROCK!, which combines emerging bands with established acts from the new Argentine rock scene. In terms of the Management & Booking Department, MTS Agency supports the strategy and development of artists such as CATUPECU MACHU, BEATS MODERNOS (the former musicians of Charly Garcia performing a journey through his work), GUSTAVO CORDERA, and DANIELA MILAGROS. Additionally, the agency's booking includes JUANSE, RATONES PARANOICOS, and MENTES EXPERTAS (Spain) for Argentina.",
            learnMore: "LEARN MORE"
        },
        es: {
            title: "QUIÉNES SOMOS",
            description: "MTS Agency, con más de 30 años de trayectoria, se ubica entre las agencias de espectáculos más prestigiosas de Argentina y de América Latina. A través de sus distintos departamentos (Venues, Producciones nacionales e internacionales y Management & Booking) se ha consolidado con un espíritu vanguardista, que va desde el inicio del TEATRO VORTERIX (el 1er Venue multimedia de Sudamérica) hasta la generación de alianzas con distintas agencias y productoras (DF Entertainment - Live Nation, Move Concerts Arg, Pop Art Music Arg y Dale Play, por citar algunas). También dando vida a la histórica e icónica sala THE ROXY BS AS, cuna de muchos de los artistas más renombrados de la música argentina y lugar de paso obligado de los artistas internacionales.",
            secondDescription: "En cuanto a las producciones propias, se destacan festivales como las 2 ediciones del MONSTERS OF ROCK ARG, MAXIMUS FEST ARG, todas las ediciones del GESELL ROCK, el VORTERIX REGGAE FEST, el VORTERIX METAL FEST y actualmente desarrollando el ALERTA ROCK! que mezcla a las bandas ascendentes junto a bandas consagradas de la escena del nuevo rock argentino. Respecto al Depto de Management & Booking, MTS Agency acompaña la estrategia y el desarrollo de artistas como CATUPECU MACHU, BEATS MODERNOS (los ex músicos de Charly Garcia haciendo un recorrido por toda su obra), GUSTAVO CORDERA y DANIELA MILAGROS. Y al Booking de los artistas de la Agencia se le suma el de JUANSE, RATONES PARANOICOS y MENTES EXPERTAS (España) para la Argentina.",
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