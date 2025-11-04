import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: 'easeOut' } 
    },
};

const titleAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: 'easeOut' } 
    }
};

const finalTranslations = {
    es: {
        title: "QUIÉNES SOMOS",
        description1: "Con casi 30 años de trayectoria en la industria del entretenimiento, MTS Agency se consolida como una de las productoras y agencias de management más relevantes de Argentina. Fundada en 1998, impulsa artistas, contenidos y producciones de impacto nacional e internacional, combinando experiencia, creatividad e innovación en cada proyecto.",
        description2: "Desde sus inicios, MTS ha sido protagonista en la creación, gestión y desarrollo de algunas de las salas más emblemáticas del país: The Roxy (todas sus sedes), Teatro Colegiales (hoy Teatro Vorterix), Mandarine Park, Estadio Hípico Argentino, Madero Boardwalk, Teatro Flores, Riders Buenos Aires, Superclub y La Reina. En 2012, la agencia participó activamente en el lanzamiento de Vorterix, junto al reconocido Mario Pergolini, colaborando en la creación de la primera plataforma de streaming en Sudamérica con sala propia. Desde entonces, MTS Agency está a cargo de la dirección y producción general del Teatro Vorterix en Bs.As. y Mar del Plata, espacio pionero en espectáculos integrales, transmisiones por streaming y generación de contenidos digitales e interactivos.",
        productionTitle: "Qué Ofrecemos",
        productionPoints: [
            {
                label: "Producción y Festivales",
                detail: "Más de **600 shows anuales** en salas propias y venues asociados. Dirección y colaboración en festivales destacados: Monsters of Rock Argentina (dos ediciones), Gesell Rock, Maximus Buenos Aires (primera edición), VTX Reggae Fest, VTX Metal, Alerta Rock!, entre otros."
            },
            {
                label: "Management Exclusivo",
                detail: "Catupecu Machu – Daniela Milagros – Gustavo Cordera – Beats Modernos (ex músicos de Charly García celebrando su obra)."
            },
            {
                label: "Booking Internacional",
                detail: "Ratones Paranoicos – Juanse - Mentes Expertas (España) solo para Argentina."
            }
        ],
        alliancesTitle: "Participación en la Industria",
        alliancesPoints: [
            "Alianzas estratégicas con las principales productoras de la región: DF Entertainment / Live Nation, Pop Art Music, Dale Play y Move Concerts.",
            "Miembro activo de ACMMA y cofundador de IDEAR. Colaboración permanente en iniciativas destinadas a profesionalizar y fortalecer la industria del entretenimiento en Argentina y Latinoamérica."
        ],
        artistsTitle: "ARTISTAS QUE CONFIARON EN MTS",
        artistsList: [
            "Airbag",
            "Los Fabulosos Cadillacs",
            "Slash",
            "Ozzy Osbourne",
            "Megadeth",
            "No Te Va Gustar",
            "Ratones Paranoicos"
        ],
        artistsFooter: "y muchos otros grandes del rock nacional e internacional..."
    },
    en: {
        title: "ABOUT US",
        description1: "With nearly 30 years of experience in the entertainment industry, MTS Agency has established itself as one of Argentina's most prominent production and management agencies. Founded in 1998, it drives artists, content, and productions with national and international impact, combining experience, creativity, and innovation in every project.",
        description2: "Since its inception, MTS has played a leading role in the creation, management, and development of some of the country's most iconic venues: The Roxy (all its locations), Teatro Colegiales (now Teatro Vorterix), Mandarine Park, Estadio Hípico Argentino, Madero Boardwalk, Teatro Flores, Riders Buenos Aires, Superclub, and La Reina. In 2012, the agency actively participated in the launch of Vorterix, alongside renowned Mario Pergolini, collaborating in the creation of the first streaming platform in South America with its own venue. Since then, MTS Agency has been responsible for the direction and general production of Teatro Vorterix in Buenos Aires and Mar del Plata, a pioneering space for comprehensive shows, streaming broadcasts, and the generation of digital and interactive content.",
        productionTitle: "What We Offer",
        productionPoints: [
            {
                label: "Production and Festivals",
                detail: "Over **600 shows per year** in own venues and associated venues. Direction and collaboration in notable festivals: Monsters of Rock Argentina (two editions), Gesell Rock, Maximus Buenos Aires (first edition), VTX Reggae Fest, VTX Metal, Alerta Rock!, among others."
            },
            {
                label: "Exclusive Management",
                detail: "Catupecu Machu – Daniela Milagros – Gustavo Cordera – Beats Modernos (former musicians of Charly García celebrating his work)."
            },
            {
                label: "International Booking",
                detail: "Ratones Paranoicos – Juanse - Mentes Expertas (Spain) for Argentina only."
            }
        ],
        alliancesTitle: "Industry Participation",
        alliancesPoints: [
            "Strategic partnerships with the region's main promoters: DF Entertainment / Live Nation, Pop Art Music, Dale Play and Move Concerts.",
            "Active member of ACMMA and co-founder of IDEAR. MTS Agency permanently collaborates on initiatives aimed at professionalizing and strengthening the entertainment industry in Argentina and Latin America."
        ],
        artistsTitle: "ARTISTS WHO TRUSTED MTS",
        artistsList: [
            "Airbag",
            "Los Fabulosos Cadillacs",
            "Slash",
            "Ozzy Osbourne",
            "Megadeth",
            "No Te Va Gustar",
            "Ratones Paranoicos"
        ],
        artistsFooter: "and many other great names in national and international rock..."
    }
};


// Componente para mostrar los Puntos de Producción/Management
const ProductionPoint = ({ title, detail, delay }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardAnimation}
        transition={{ delay: delay * 0.1 }}
    >
        <Box 
            sx={{
                border: '1px solid black',
                padding: '1.5rem',
                backgroundColor: 'transparent',
                height: '100%',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    // Un color sutil de fondo para el hover (asumiendo que primary.main es un color de marca)
                    backgroundColor: 'rgba(0, 0, 0, 0.03)', 
                }
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: 'primary.main',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem'
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="p"
                dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
        </Box>
    </motion.div>
);


export default function QuienesSomosSection({ language }) {
    const t = finalTranslations[language] || finalTranslations.en;

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
                {/* Title Animation */}
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
                        flexDirection: 'column',
                        gap: '3rem',
                        marginTop: { xs: '1.5rem', md: '3rem' }
                    }}
                >
                    {/* Bloque 1 y 2: Descripciones Originales (Conservadas) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardAnimation}
                    >
                        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <Typography 
                                        variant="p"
                                        sx={{
                                            fontWeight: 400,
                                            lineHeight: 1.25
                                        }}
                                    >
                                        {t.description1}
                                    </Typography>
                                    <Typography variant="p">
                                        {t.description2}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: { xs: '300px', md: '400px' },
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Image
                                        src="/images/1.jpg"
                                        alt="MTS Agency"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </motion.div>

                    {/* Bloque 3: Producción, Management y Cifras Clave + Alianzas Estratégicas (Side by Side) */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: 'primary.main',
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                                    lineHeight: { xs: '1.2', sm: '1.3', md: '1.4' },
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {t.productionTitle}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {t.productionPoints.map((point, index) => (
                                    <ProductionPoint 
                                        title={point.label} 
                                        detail={point.detail} 
                                        delay={index}
                                        key={index}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Bloque 4: Alianzas Estratégicas y Participación en la Industria */}
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={cardAnimation}
                                transition={{ delay: 0.4 }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                                        lineHeight: { xs: '1.2', sm: '1.3', md: '1.4' },
                                        fontWeight: 'bold',
                                        marginBottom: '1.5rem',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {t.alliancesTitle}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {t.alliancesPoints.map((point, i) => (
                                        <Typography key={i} variant="p">
                                            {point}
                                        </Typography>
                                    ))}
                                </Box>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: { xs: '300px', md: '400px' },
                                        marginTop: '2rem',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Image
                                        src="/images/2.jpg"
                                        alt="Industry Participation"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>

                    {/* Bloque 5: Legado de Artistas (Con Mayor Peso Visual) */}
                    <Box>
                        <Box
                            sx={{
                                display: { xs: 'block', md: 'flex' },
                                gap: { xs: 0, md: '4rem' },
                                alignItems: 'flex-start'
                            }}
                        >
                            <Box
                                sx={{
                                    flex: { md: '0 0 33.333%' },
                                    marginBottom: { xs: '1rem', md: 0 }
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{ 
                                        color: 'primary.main', 
                                        fontWeight: 'bold', 
                                        fontSize: { xs: '3rem', sm: '4rem', md: '6rem', lg: '8rem' },
                                        lineHeight: { xs: '1', sm: '1.1', md: '1.2' },
                                        textAlign: { xs: 'center', md: 'left' }
                                    }}
                                >
                                    {t.artistsTitle}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    flex: { md: '1 1 66.666%' },
                                    minWidth: 0
                                }}
                            >
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={cardAnimation}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Card
                                        sx={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            borderRadius: 0,
                                            padding: { xs: 0, md: '1.5rem' },
                                            boxShadow: 'none'
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                component="ul"
                                                sx={{
                                                    listStyle: 'none',
                                                    paddingLeft: { xs: 0, md: '1rem' },
                                                    margin: 0,
                                                    marginBottom: '1rem',
                                                    marginLeft: { md: '2rem' },
                                                    display: 'grid',
                                                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '1fr' },
                                                    gap: '0.5rem',
                                                    borderLeft: { xs: 'none', md: '1px solid black' }
                                                }}
                                            >
                                                {t.artistsList.map((artist, index) => (
                                                    <Box
                                                        component="li"
                                                        key={index}
                                                        sx={{
                                                            fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
                                                            lineHeight: 1.2,
                                                            fontWeight: '900',
                                                            color: 'black.main',
                                                            textAlign: index % 2 === 0 ? 'left' : 'right',
                                                            textTransform: 'uppercase',
                                                            maxWidth: '300px',
                                                            marginLeft: index % 2 === 0 ? 0 : 'auto',
                                                            paddingBottom: { xs: 0, md: '0.5rem' },
                                                            marginBottom: '0.5rem'
                                                        }}
                                                    >
                                                        {artist}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Box>
                        </Box>
                        <Typography
                            variant="p"
                            sx={{
                                fontWeight: '300',
                                fontStyle: 'italic',
                                marginTop: '2rem',
                                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                textAlign: 'left'
                            }}
                        >
                            {t.artistsFooter}
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}