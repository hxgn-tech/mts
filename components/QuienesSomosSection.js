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
            description: "With nearly 30 years of experience in the entertainment industry, MTS Agency has established itself as one of Argentina's most prominent production and management agencies. Founded in 1998, it drives artists, content, and productions with national and international impact, combining experience, creativity, and innovation in every project.",
            secondDescription: "Since its inception, MTS has played a leading role in the creation, management, and development of some of the country's most iconic venues: The Roxy (all its locations), Teatro Colegiales (now Teatro Vorterix), Mandarine Park, Estadio Hípico Argentino, Madero Boardwalk, Teatro Flores, Riders Buenos Aires, Superclub, and La Reina. In 2012, the agency actively participated in the launch of Vorterix, alongside renowned Mario Pergolini, collaborating in the creation of the first streaming platform in South America with its own venue. Since then, MTS Agency has been responsible for the direction and general production of Teatro Vorterix in Buenos Aires and Mar del Plata, a pioneering space for comprehensive shows, streaming broadcasts, and the generation of digital and interactive content.",
            learnMore: "LEARN MORE",
            productionTitle: "Production and Festivals",
            productionPoints: [
                "Over 600 shows per year in own venues and associated venues.",
                "Strategic partnerships with the region's main promoters: DF Entertainment / Live Nation, Pop Art Music, Dale Play and Move Concerts.",
                "Direction and collaboration in notable festivals: Monsters of Rock Argentina (two editions), Gesell Rock, Maximus Buenos Aires (first edition), VTX Reggae Fest, VTX Metal, Alerta Rock!, among others."
            ],
            managementTitle: "Management and Booking",
            managementText: "Exclusive management of artists: Catupecu Machu – Daniela Milagros – Gustavo Cordera – Beats Modernos (former musicians of Charly García celebrating his work).",
            bookingText: "International booking: Ratones Paranoicos – Juanse - Mentes Expertas (Spain) for Argentina only.",
            artistsTitle: "Artists MTS has worked with",
            artistsText: "Airbag, Los Fabulosos Cadillacs, Slash, Ozzy Osbourne, Megadeth, No Te Va Gustar, Ratones Paranoicos, among many others.",
            participationTitle: "Industry Participation",
            participationText: "Active member of ACMMA and co-founder of IDEAR. MTS Agency permanently collaborates on initiatives aimed at professionalizing and strengthening the entertainment industry in Argentina and Latin America, contributing its experience, infrastructure and strategic vision."
        },
        es: {
            title: "QUIÉNES SOMOS",
            description: "Con casi 30 años de trayectoria en la industria del entretenimiento, MTS Agency se consolida como una de las productoras y agencias de management más relevantes de Argentina. Fundada en 1998, impulsa artistas, contenidos y producciones de impacto nacional e internacional, combinando experiencia, creatividad e innovación en cada proyecto.",
            secondDescription: "Desde sus inicios, MTS ha sido protagonista en la creación, gestión y desarrollo de algunas de las salas más emblemáticas del país: The Roxy (todas sus sedes), Teatro Colegiales (hoy Teatro Vorterix), Mandarine Park, Estadio Hípico Argentino, Madero Boardwalk, Teatro Flores, Riders Buenos Aires, Superclub y La Reina. En 2012, la agencia participó activamente en el lanzamiento de Vorterix, junto al reconocido Mario Pergolini, colaborando en la creación de la primera plataforma de streaming en Sudamérica con sala propia. Desde entonces, MTS Agency está a cargo de la dirección y producción general del Teatro Vorterix en Bs.As. y Mar del Plata, espacio pionero en espectáculos integrales, transmisiones por streaming y generación de contenidos digitales e interactivos.",
            learnMore: "CONOCE MÁS",
            productionTitle: "Producción y Festivales",
            productionPoints: [
                "Más de 600 shows anuales en salas propias y venues asociados.",
                "Alianzas estratégicas con las principales productoras de la región: DF Entertainment / Live Nation, Pop Art Music, Dale Play y Move Concerts.",
                "Dirección y colaboración en festivales destacados: Monsters of Rock Argentina (dos ediciones), Gesell Rock, Maximus Buenos Aires (primera edición), VTX Reggae Fest, VTX Metal, Alerta Rock!, entre otros."
            ],
            managementTitle: "Management y Booking",
            managementText: "Management exclusivo de artistas: Catupecu Machu – Daniela Milagros – Gustavo Cordera – Beats Modernos (ex músicos de Charly García celebrando su obra).",
            bookingText: "Booking internacional: Ratones Paranoicos – Juanse - Mentes Expertas (España) solo para Argentina.",
            artistsTitle: "Artistas con los que MTS ha trabajado",
            artistsText: "Airbag, Los Fabulosos Cadillacs, Slash, Ozzy Osbourne, Megadeth, No Te Va Gustar, Ratones Paranoicos, entre muchos otros.",
            participationTitle: "Participación en la Industria",
            participationText: "Miembro activo de ACMMA y cofundador de IDEAR. MTS Agency colabora de forma permanente en iniciativas destinadas a profesionalizar y fortalecer la industria del entretenimiento en Argentina y Latinoamérica, aportando su experiencia, infraestructura y visión estratégica."
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

                                {/* Additional structured information (Production, Management, Artists, Participation) */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                    {/* Production and Festivals */}
                                    <Typography variant="h3" sx={{ fontSize: '1.05rem', fontWeight: '700', color: 'black.main' }}>
                                        {t.productionTitle}
                                    </Typography>
                                    {t.productionPoints.map((p, i) => (
                                        <Typography key={i} variant="p" sx={{ fontSize: '1.0rem', lineHeight: 1.7, color: 'black.main' }}>
                                            {p}
                                        </Typography>
                                    ))}
                                    {/* Management and Booking */}
                                    <Typography variant="h3" sx={{ fontSize: '1.05rem', fontWeight: '700', marginTop: '1rem', color: 'black.main' }}>
                                        {t.managementTitle}
                                    </Typography>
                                    <Typography variant="p" sx={{ fontSize: '1.0rem', lineHeight: 1.7, color: 'black.main' }}>
                                        {t.managementText}
                                    </Typography>
                                    <Typography variant="p" sx={{ fontSize: '1.0rem', lineHeight: 1.7, color: 'black.main' }}>
                                        {t.bookingText}
                                    </Typography>
                                    {/* Artists MTS has worked with */}
                                    <Typography variant="h3" sx={{ fontSize: '1.05rem', fontWeight: '700', marginTop: '1rem', color: 'black.main' }}>
                                        {t.artistsTitle}
                                    </Typography>
                                    <Typography variant="p" sx={{ fontSize: '1.0rem', lineHeight: 1.7, color: 'black.main' }}>
                                        {t.artistsText}
                                    </Typography>
                                    {/* Industry Participation */}
                                    <Typography variant="h3" sx={{ fontSize: '1.05rem', fontWeight: '700', marginTop: '1rem', color: 'black.main' }}>
                                        {t.participationTitle}
                                    </Typography>
                                    <Typography variant="p" sx={{ fontSize: '1.0rem', lineHeight: 1.7, color: 'black.main' }}>
                                        {t.participationText}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
}