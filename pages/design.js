"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import HomeSection from '../components/HomeSection';
import PortfolioCarousel from '../components/PortfolioCarousel';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { getPressItems } from '../controllers/prensa';
import { getPortfolioItems } from '../controllers/portfolio';
import AnimatedText from '../components/AnimatedText';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import ContactForm from '../components/ContactForm';

// Translations object for English and Spanish with updated texts
const translations = {
    en: {
        heading: "DESIGN \nPHILOSOPHY",
        paragraph1: "Jan strongly believes that a golf course should be enjoyable, challenging and playable for all levels of golfers, from top professionals to the average amateur. After all, this last group are the ones who plays the golf course most of the time.",
        paragraph2: "He also believes that a round of golf should be a complete experience, enjoying the natural beauty of a golf course in perfect harmony with nature. Its no coincidence that some of the best golf courses are also the most beautiful. Jan’s concept is that the golf course, once completed, should look like it was always there, forming part of the nature that surrounds it.",
        paragraph3: "His design philosophy is classic, based on strategy. The golf course should offer different ways to play, depending on the players level. Rewarding those who sees and understands the options on each hole, playing them according to their capacity. Hazards should be there for a reason, telling players where to go or not, offering a risk and reward challenge for those who can take them on. Every hole should also have a safer option for lesser skilled players who can’t.",
        boxedText: "This design philosophy results in golf courses that not only challenge players but also inspire them by their serene and natural beauty.",
        boxedText2: '\n—\nA true symbiosis of sport and landscape.',
        caption: "San Eliseo",
        paragraph4: "Jan sees the design of the greens and surrounds as the most important part of the strategic golf design. The angle and undulations of the greens, mounds, hollows and bunkers defines the shots into and around the greens. Regarding bunkers he believes less is more, preferring to create areas that gives players different short game options. He prefers greens large enough to allow many different pin positions in defined areas.",
        animatedText: "The routing of the golf course should allow for an interesting round of golf with a mix of holes of different lengths and difficulties, in different directions, taking into account the prevailing winds of the area.",
        paragraph6: "With large experience in course management, Jan understands the importance of maintenance when designing and constructing golf courses. This includes well planned drainage and irrigation, playing areas that are easy to cut and maintain and choosing grasses that are suitable for the area and climate of the chosen site.",
        paragraph7: "Every site suitable for a golf course is different and every golf course is unique. That is what makes our game so enjoyable and rewarding. Jan’s passion is to create golf courses that stands the test of time, providing pleasure and enjoyment for generations to come."
    },
    es: {
        heading: "LA FILOSOFÍA DE DISEÑO",
        paragraph1: "Jan cree firmemente que un campo de golf debe ser divertido, desafiante y jugable para todos los niveles de golfistas, desde los mejores profesionales hasta el aficionado medio. Después de todo, este último grupo es el que juega en el campo de golf la mayor parte del tiempo.",
        paragraph2: "Jan también cree que una vuelta de golf debe ser una experiencia completa, disfrutando de la belleza natural de un campo de golf en perfecta armonía con la naturaleza. No es casualidad que algunos de los mejores campos de golf sean también los más bellos. El concepto de Jan es que el campo de golf, una vez terminado, debe parecer que siempre estuvo allí, formando parte de la naturaleza que lo rodea.",
        paragraph3: "Su filosofía de diseño es clásica, basada en la estrategia. El campo de golf debe ofrecer diferentes formas de jugar, dependiendo del nivel de los jugadores. Premiar a quienes ven y entienden las opciones de cada hoyo, jugándolos según su capacidad. Los obstáculos deben estar ahí por una razón, indicando a los jugadores dónde ir o no, ofreciendo un desafío de riesgo y recompensa para aquellos que pueden afrontarlos. Cada hoyo también debe tener una opción más segura para los jugadores menos hábiles que no pueden.",
        boxedText: "Esta filosofía de diseño resulta en campos de golf que no solo desafían a los jugadores sino que también los inspiran por su serena y natural belleza.",
        boxedText2: 'Una verdadera simbiosis entre deporte y paisaje.',
        caption: "San Eliseo",
        paragraph4: "Jan considera que el diseño de los greens y los alrededores es la parte más importante del diseño estratégico del golf. El ángulo y las ondulaciones de los greens, las lomas, los desniveles y los bunkers definen los tiros hacia los greens y alrededor de ellos. En cuanto a los bunkers, cree que menos es más y prefiere crear áreas que ofrezcan a los jugadores diferentes opciones de juego corto. Prefiere greens lo suficientemente grandes como para permitir muchas posiciones de banderas diferentes en áreas definidas.",
        animatedText: "El trazado del campo de golf debe permitir una ronda interesante con una mezcla de hoyos de diferentes longitudes y dificultades, en diferentes direcciones, teniendo en cuenta los vientos dominantes de la zona.",
        paragraph6: "Con una amplia experiencia en la gestión de campos de golf, Jan entiende la importancia del mantenimiento a la hora de diseñar y construir campos de golf. Esto incluye un drenaje y un riego bien planificados, áreas de juego que sean fáciles de cortar y mantener y la elección de céspedes adecuados para la zona y el clima del sitio elegido.",
        paragraph7: "Cada lugar apto para un campo de golf es diferente y cada campo de golf es único. Eso es lo que hace que nuestro juego sea tan divertido y gratificante. La pasión de Jan es crear campos de golf que resistan el paso del tiempo y brinden placer y diversión a las generaciones futuras."
    }
};

// Helper to get cookie by name with a null check using Debug.LogError equivalent in browser console
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

// Helper to render multiline text by splitting on newline characters
const renderMultilineText = (text) => {
    return text.split('\n').map((line, index, arr) => (
        <React.Fragment key={index}>
            {line}
            {index < arr.length - 1 && <br />}
        </React.Fragment>
    ));
};

const borderAnimation = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } }
};

const textReveal = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
};

const imageReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } }
};

const titleReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export default function App() {
    const [pressItems, setPressItems] = useState([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [language, setLanguage] = useState('en'); // language state

    // Read language from cookie on mount and load items
    useEffect(() => {
        const cookieLang = getCookie('lang');
        if (cookieLang && (cookieLang === 'es' || cookieLang === 'en')) {
            setLanguage(cookieLang);
        } else {
            setLanguage('en');
        }
        getPressItems(setPressItems);
        getPortfolioItems(setPortfolioItems);
    }, []);

    // Select translations based on current language
    const t = translations[language] || translations.en;

    return (
        <Layout>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'white.main',
                    mt: '0',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <Image
                        src="/images/green 1.jpg"
                        alt="Background"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100vw',
                            height: '100vh',
                            objectFit: 'cover',
                            justifySelf: 'auto',
                            position: 'fixed',
                            right: '0',
                            bottom: '0rem',
                            pointerEvents: 'none',
                            zIndex: '-3'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        paddingTop: { xl: '5rem', xs: '1rem' },
                        backgroundColor: 'white.main',
                        display: 'flex',
                        flexDirection: { xl: 'row', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto',
                        marginTop: '5rem',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xl: '90%', sm: '90%' },
                            margin: "auto",
                            display: 'flex',
                            flexDirection: { xl: 'column', xs: 'column' },
                            gap: '3rem'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: { xl: 'fit-content', xs: '100%' },
                                gap: '2rem',
                                margin: 'auto',
                                paddingTop: { xl: '0', xs: '2rem' }
                            }}
                        >
                            <Box>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.8 }}
                                    style={{ display: 'inline-block', position: 'relative' }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            marginBottom: '0.5rem',
                                            fontSize: { xl: '5rem', md: '4.25rem', xs: '3.25rem' },
                                            textAlign: 'center'
                                        }}
                                        component={motion.h1}
                                        variants={textReveal}
                                    >
                                        {renderMultilineText(t.heading)}
                                    </Typography>
                                    <motion.div
                                        variants={borderAnimation}
                                        style={{
                                            height: '3px',
                                            backgroundColor: '#988254',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0
                                        }}
                                    />
                                </motion.div>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xl: '90%', xs: '90%' },
                        margin: 'auto',
                        maxWidth: '1200px',
                    }}
                >
                    <Box
                        component={motion.div}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={imageReveal}
                        sx={{
                            display: 'block',
                            float: 'right',
                            width: { xl: 'auto', md: '50%', xs: '100%' },
                            height: 'auto',
                            padding: '3rem',
                            paddingTop: '1rem',
                            paddingBottom: { xl: '2rem', md: '0', xs: '1.5rem' },
                            paddingRight: '0',
                            shapeOutside: 'inset(0px 0px 0px 0px)',
                            WebkitShapeOutside: 'inset(0px 0px 0px 0px)',
                            clipPath: 'inset(0px 0px 0px 0px)',
                        }}
                    >
                        <Image
                            src="/images/SONNEVI-GOLF2.jpg"
                            alt="Background"
                            placeholder="empty"
                            width={600}
                            height={800}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </Box>
                    <Typography
                        variant="p"
                        paragraph
                        sx={{
                            fontFamily: 'Garamond',
                            '&::first-letter': {
                                float: 'left',
                                fontSize: '5rem',
                                lineHeight: '0.8',
                                marginRight: '0.1em',
                                marginTop: '0',
                                fontFamily: 'Garamond'
                            },
                        }}
                        component={motion.p}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        {t.paragraph1}
                    </Typography>
                    <Typography
                        variant="p"
                        paragraph
                        sx={{ fontFamily: 'Garamond' }}
                        component={motion.p}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        {t.paragraph2}
                    </Typography>
                    <Typography
                        variant="p"
                        paragraph
                        sx={{ fontFamily: 'Garamond' }}
                        component={motion.p}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        {t.paragraph3}
                    </Typography>
                    <Box
                        sx={{
                            border: '2px solid',
                            borderColor: 'gold.main',
                            padding: '3rem',
                            backgroundColor: 'blue.main',
                            color: 'white.main',
                            marginTop: '3rem',
                            width: { xl: "100%", md: '90%', xs: 'auto' }
                        }}
                    >
                        <Typography sx={{ textAlign: "center" }} variant="h2" paragraph>
                            {t.boxedText}
                        </Typography>
                        <Typography sx={{ textAlign: "center", fontStyle: 'italic', fontSize: '4rem' }} variant="h1" paragraph>
                            {renderMultilineText(t.boxedText2)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xl: '90%', xs: '90%' },
                        margin: 'auto',
                        marginTop: '0'
                    }}
                >
                    <Image
                        src="/images/LP_aerial2.JPG"
                        alt="Background"
                        placeholder="empty"
                        width={0}
                        height={0}
                        sizes="100%"
                        style={{
                            width: '100%',
                            height: 'auto',
                            justifySelf: 'auto',
                            position: 'relative',
                            pointerEvents: 'none'
                        }}
                    />
                    <Typography sx={{ alignSelf: 'end' }} variant='p'>
                        La Providencia
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: { xl: '50%', md: 'row', xs: '90%' },
                        margin: 'auto',
                        marginTop: '4rem',
                        marginBottom: '4rem',
                        borderLeft: '2px solid',
                        borderColor: 'gold.main',
                        paddingLeft: '1rem',
                    }}
                >
                    <Typography
                        variant='p'
                        paragraph
                        sx={{
                            fontFamily: 'Garamond',
                            '&::first-letter': {
                                float: 'left',
                                fontSize: '6rem',
                                lineHeight: '0.8',
                                marginRight: '0.1em',
                                marginTop: '0',
                                fontFamily: 'Garamond'
                            },
                        }}
                    >
                        {t.paragraph4}
                    </Typography>
                    <Typography sx={{ fontFamily: "Garamond" }} variant='p'>
                        {t.animatedText}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ height: '50vh', backgroundColor: 'transparent' }}></Box>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    padding: { xl: '0rem', xs: '1rem' },
                    paddingTop: { xl: '5rem', md: '5rem', xs: '5rem' },
                    backgroundColor: 'white.main',
                    display: 'flex',
                    flexDirection: { xl: 'column', xs: 'column' },
                    boxSizing: 'border-box',
                    margin: 'auto',
                    color: 'black.main',
                    gap: '5rem',
                }}
            >
                <Box
                    sx={{
                        maxWidth: { xl: '50%', md: '90%' },
                        display: 'flex',
                        margin: 'auto',
                        marginTop: '0',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}
                >
                    <Typography
                        sx={{
                            '&::first-letter': {
                                float: 'left',
                                fontSize: '6.25rem',
                                lineHeight: '0.8',
                                marginRight: '0.1em',
                                marginTop: '0',
                                fontFamily: 'serif',
                            },
                        }}
                        variant='p'
                    >
                        {t.paragraph6}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: { xl: 'auto', xs: '100%' },
                        margin: 'auto',
                        marginLeft: { xl: 'auto', md: 'auto', xs: 'auto' }
                    }}
                >
                    <Image
                        src="/images/SONNEVI-GOLF2.jpg"
                        alt="Background"
                        placeholder="empty"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                            justifySelf: 'auto',
                            position: 'relative',
                            pointerEvents: 'none',
                            maxWidth: '875px'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        maxWidth: { xl: '50%', md: '90%' },
                        display: 'flex',
                        margin: 'auto',
                        marginTop: '0',
                        flexDirection: 'column',
                        gap: '2rem',
                    }}
                >
                    <Typography variant='p'>
                        {t.paragraph7}
                    </Typography>
                </Box>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: "80vh", md: "auto" }, // Makes it bigger on mobile
                            backgroundColor: "white.main",
                            display: "flex",
                            flexDirection: { xl: "row", xs: "column" },
                            boxSizing: "border-box",
                            margin: "auto",
                            paddingBottom: "0rem",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "100%",
                                margin: "auto",
                                marginTop: "0",
                                backgroundColor: "white.main",
                                position: "relative", // Needed for absolute positioning of button
                            }}
                        >
                            <Image
                                src="/images/LP_aerial.JPG"
                                alt="Background"
                                placeholder="empty"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '100%', 
                                        height: '100vh', 
                                        objectFit: 'cover',
                                    justifySelf: "auto",
                                    position: "relative",
                                    pointerEvents: "none",
                                }}
                            />
                            {/* Button in the middle of the image */}
                            <Button
                                href='/portfolio'
                                variant="text"
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textTransform: "none",
                                    fontWeight: "200",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    padding: "1rem 2rem",
                                    backgroundColor: "blue.main",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: 'white.main',
                                    fontSize: {xl:'5rem', md: '3rem', xs: '3rem'},
                                    fontFamily: 'Garamond',
                                    lineHeight: {xl:'5rem', md: '3rem', xs: '2rem'},
                                    "&::before": {
                                        color: 'white',
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "auto",
                                        height: "auto",
                                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                        transform: "skewX(-20deg)",
                                        transition: "left 0.5s ease",
                                    },
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        height: "2px",
                                        width: "0%",
                                        backgroundColor: "gold.main",
                                        transition: "width 0.4s ease",
                                    },
                                    "&:hover::before": {
                                        left: "100%",
                                    },
                                    "&:hover::after": {
                                        width: "100%",
                                    },
                                }}
                            >
                                PORTFOLIO
                            </Button>
                        </Box>
                    </Box>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    padding: { xl: '5rem', xs: '1rem' },
                    backgroundColor: 'blue.main',
                    display: 'flex',
                    boxSizing: 'border-box',
                }}
            >
                <ThemeProvider theme={theme}>
                    <ContactForm />
                </ThemeProvider>
            </Box>
        </Layout>
    );
}
