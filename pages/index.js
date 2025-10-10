"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { getPressItems } from '../controllers/prensa';
import { getPortfolioItems } from '../controllers/portfolio';
import NewsSection from '../components/NewsSection';
import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ContactForm from '../components/ContactForm';

// JSON translations object with texts in English and Spanish
const translations = {
    en: {
        designPhilosophyTitle: "DESIGN \nPHILOSOPHY",
        designPhilosophyDescription: "Jan strongly believes that a golf course should be enjoyable, challenging and playable for all levels of golfers, from top professionals to the average amateur. After all, this last group are the ones who plays the golf course most of the time.",
        learnMore: "LEARN MORE",
        janSonnevi: "JAN SONNEVI",
        animatedText: "Swedish professional golfer, golf course designer and consultant in all areas of golf course management.",
        profileParagraph: "Born in Stockholm, Sweden, he was a pioneer in the first wave of Swedish golfers that made their mark on the international professional tours. Jan competed mainly on the Scandinavian and European Tours but also in North and South America, Asia and Africa.",
        continueReading: "CONTINUE READING",
        golfCourseDesign: "GOLF COURSE\nDESIGN &\nRENOVATIONS",
        golfCourseDescription: "The first step of any project, be it the design of a new golf course or renovating an existing course, is to meet up with the clients to listen and understand the needs, wishes and objectives of the project. Once this is established several visits follows to analyze the site, determine the feasibility of the project and review the options available.",
        consulting: "GOLF CLUB MANAGEMENT & CONSULTING",
        consultingDescription: "Jan’s consulting projects are based on his large experience of having managed some of Europe’s finest golf clubs, both in Sweden and Spain. The first step is meeting with the clients in order to understand their needs and objectives.",
    },
    es: {
        designPhilosophyTitle: "FILOSOFÍA\nDE DISEÑO",
        designPhilosophyDescription: "Jan cree firmemente que un campo de golf debe ser agradable, desafiante y jugable para todos los niveles, desde los profesionales de élite hasta el aficionado promedio. Después de todo, este último grupo es el que más utiliza el campo.",
        learnMore: "CONOCE MÁS",
        janSonnevi: "JAN SONNEVI",
        animatedText: "Golfista profesional sueco, diseñador de campos de golf y consultor en todas las áreas de gestión de campos de golf.",
        profileParagraph: "Nacido en Estocolmo, Suecia, fue un pionero de la primera oleada de golfistas suecos que dejaron su huella en los circuitos profesionales internacionales. Jan compitió principalmente en los circuitos escandinavos y europeos, pero también en América del Norte y del Sur, Asia y África.",
        continueReading: "CONTINUAR LEYENDO",
        golfCourseDesign: "DISEÑO DE\n CAMPOS DE GOLF\nY RENOVACIONES",
        golfCourseDescription: "El primer paso de cualquier proyecto, ya sea el diseño de un nuevo campo de golf o la renovación de uno existente, es reunirse con los clientes para escuchar y comprender sus necesidades, deseos y objetivos. Una vez establecido esto, se realizan varias visitas para analizar el sitio, determinar la viabilidad del proyecto y revisar las opciones disponibles.",
        consulting: "GESTIÓN Y\nCONSULTORÍA\nDE GOLF CLUBS",
        consultingDescription: "Los proyectos de consultoría de Jan se basan en su amplia experiencia gestionando algunos de los clubes de golf más prestigiosos de Europa, tanto en Suecia como en España. El primer paso es reunirse con los clientes para entender sus necesidades y objetivos"
    }
};

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
    const [pressItems, setPressItems] = useState([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [language, setLanguage] = useState('en'); // language state

    // Read language from cookie on mount and load items
    useEffect(() => {
        const cookieLang = getCookie('lang');
        // Use cookie value if exists and is valid, otherwise default to 'en'
        if (cookieLang && translations[cookieLang]) {
            setLanguage(cookieLang);
        } else {
            setLanguage('en');
        }
        getPressItems(setPressItems);
        getPortfolioItems(setPortfolioItems);
    }, []);

    // Use fallback in case language is undefined
    const t = translations[language] || translations.en;

    // Render text with line breaks for newline characters
    const renderMultilineText = (text) => {
        return text.split('\n').map((line, index, arr) => (
            <React.Fragment key={index}>
                {line}
                {index < arr.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    
    return (
        <Layout>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    background: 'transparent',
                    mt: '0',
                    color: 'white'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '4rem 0',
                    }}
                >
                    <Image
                        src="/images/background.jpg"
                        alt="Background"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: '100vh',
                            justifySelf: 'auto',
                            position: 'fixed',
                            right: '0',
                            bottom: '0rem',
                            pointerEvents: 'none'
                        }}
                    />
                    </Box>
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
                            paddingTop: '2vh',
                            fontSize: '4rem',
                            width: '100%',
                            color: 'white',
                            textShadow: '2px 5px 12px black',
                            flexDirection: 'column',
                            position: 'fixed'
                        }}
                    >
                        <Image
                            src="/images/sonnevi_logo-color.svg"
                            alt="Main Logo"
                            placeholder="empty"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                justifySelf: 'auto',
                                position: 'relative',
                                pointerEvents: 'none',
                                maxHeight: '16rem'
                            }}
                        />
                    </Box>
                    <Box
                    sx={{
                        height: '90vh',
                        backgroundColor: 'transparent'
                    }}
                    ></Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        padding: { xl: '5rem', xs: '1rem' },
                        backgroundColor: 'white.main',
                        display: 'flex',
                        flexDirection: { xl: 'row', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 'auto',
                            padding: { xl: '5rem', md: '5rem', xs: '0rem' },
                            backgroundColor: 'white.main',
                            display: 'flex',
                            flexDirection: { xl: 'row', md: 'column-reverse', xs: 'column-reverse' },
                            boxSizing: 'border-box',
                            margin: 'auto',
                            gap: '3rem',
                            justifyContent: 'center'

                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: { xl: '75%', sm: '90%' },
                                margin: "auto",
                                display: 'flex',
                                flexDirection: { xl: 'row', xs: 'column' },
                                gap: '3rem',
                                marginBottom: '0PX'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: { xl: '90%', xs: 'auto' },
                                    gap: '2rem',
                                    color: 'black.main',
                                    marginLeft: '0',
                                    backgroundColor: 'white.main',
                                    padding: { xl: "2rem", md: '2rem', xs: '0rem' },
                                    marginBottom: '10rem'
                                }}
                            >
                                <Box
                                    sx={{
                                        borderBottom: '3px solid',
                                        borderBottomColor: 'gold.main'
                                    }}
                                >
                                    <Box
                                        component={motion.div}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        variants={titleReveal}
                                    >
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                marginBottom: '2.5rem',
                                                fontSize: { xl: '5rem', md: '4.25rem', xs: '3.25rem' },
                                                textAlign: 'center'
                                            }}
                                        >
                                            JAN SONNEVI
                                        </Typography>
                                    </Box>
                                </Box>
                                <AnimatedText
                                    text={t.animatedText}
                                    variant="h1"
                                    sx={{ textAlign: 'center', paddingBottom: '2rem', color: 'gold.main', marginTop: '1rem' }}
                                />
                                <Box
                                    component={motion.div}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                    variants={imageReveal}
                                    sx={{
                                        width: { xl: '50%', xs: '100%' },
                                        margin: 'auto',
                                    }}
                                >
                                    <Image
                                        src="/images/jan_pp.png"
                                        alt="Background"
                                        placeholder="empty"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto', justifySelf: 'auto', position: 'relative', pointerEvents: 'none' }}
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
                                    {t.profileParagraph}
                                </Typography>
                                <Typography
                                    variant="p"
                                    component="a"
                                    href="/profile"
                                    sx={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        color: 'gold.main',
                                        alignSelf: 'end',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: '-100%',
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                            transform: 'skewX(-20deg)',
                                            transition: 'left 0.5s ease',
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 0,
                                            height: '2px',
                                            width: '0%',
                                            backgroundColor: 'gold.main',
                                            transition: 'width 0.4s ease',
                                        },
                                        '&:hover::before': {
                                            left: '100%',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    {t.continueReading}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        padding: { xl: '5rem 5rem 15rem 5rem;', xs: '1rem 1rem 15rem 1rem;' },
                        backgroundColor: 'white.main',
                        display: 'flex',
                        flexDirection: { xl: 'row', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto',
                        paddingBottom: {xl: '10rem', xd: '5rem'}
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xl: '80%', sm: '90%' },
                            margin: "auto",
                            display: 'flex',
                            flexDirection: { xl: 'row', xs: 'column' },
                            gap: '3rem'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: { xl: '50%', xs: '100%' },
                                gap: '2rem',
                                margin: 'auto',
                                paddingTop: { xl: '0', xs: '2rem' }
                            }}
                        >
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.8 }}
                                style={{ display: 'inline-block', position: 'relative' }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{ marginBottom: '0.5rem' }}
                                    component={motion.h1}
                                    variants={textReveal}
                                >
                                    {renderMultilineText(t.designPhilosophyTitle)}
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
                                {t.designPhilosophyDescription}
                            </Typography>
                            <Typography
                                variant="p"
                                component="a"
                                href="/design"
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    color: 'gold.main',
                                    alignSelf: 'end',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        transform: 'skewX(-20deg)',
                                        transition: 'left 0.5s ease',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        height: '2px',
                                        width: '0%',
                                        backgroundColor: 'gold.main',
                                        transition: 'width 0.4s ease',
                                    },
                                    '&:hover::before': {
                                        left: '100%',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                            >
                                {t.learnMore}
                            </Typography>
                        </Box>
                        <Box
                            component={motion.div}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={imageReveal}
                            sx={{
                                width: { xl: '50%', xs: '100%' },
                                margin: 'auto',
                            }}
                        >
                            <Image
                                src="/images/Postales de golf.jpg"
                                alt="Golf Course"
                                placeholder="empty"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    justifySelf: 'auto',
                                    position: 'relative',
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>
                    </Box>
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
                    sizes="100%"
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
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        padding: { xl: '5rem', xs: '1rem' },
                        backgroundColor: 'blue.main',
                        display: 'flex',
                        flexDirection: { xl: 'row', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto',
                        color: 'white.main'
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xl: '80%', sm: '90%' },
                            margin: "auto",
                            display: 'flex',
                            flexDirection: { xl: 'row', xs: 'column' },
                            gap: '3rem'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: { xl: '50%', xs: '100%' },
                                gap: '2rem',
                                margin: 'auto',
                                paddingTop: { xl: '0', xs: '2rem' }
                            }}
                        >
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.8 }}
                                style={{ display: 'inline-block', position: 'relative' }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{ marginBottom: '0.5rem' }}
                                    component={motion.h1}
                                    variants={textReveal}
                                >
                                    {renderMultilineText(t.golfCourseDesign)}
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
                            <Typography
                                variant="p"
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
                                component={motion.p}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.7 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            >
                                {t.golfCourseDescription}
                            </Typography>
                            <Typography
                                variant="p"
                                component="a"
                                href="/services"
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    color: 'gold.main',
                                    alignSelf: 'end',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        transform: 'skewX(-20deg)',
                                        transition: 'left 0.5s ease',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        height: '2px',
                                        width: '0%',
                                        backgroundColor: 'gold.main',
                                        transition: 'width 0.4s ease',
                                    },
                                    '&:hover::before': {
                                        left: '100%',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                            >
                                {t.learnMore}
                            </Typography>
                        </Box>
                        <Box
                            component={motion.div}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={imageReveal}
                            sx={{
                                width: { xl: '50%', xs: '100%' },
                                margin: 'auto',
                            }}
                        >
                            <Image
                                src="/images/SanEliseo1.jpg"
                                alt="Golf Course Renovation"
                                placeholder="empty"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    justifySelf: 'auto',
                                    position: 'relative',
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        padding: { xl: '5rem', xs: '1rem' },
                        backgroundColor: 'white.main',
                        display: 'flex',
                        flexDirection: { xl: 'row', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xl: '80%', sm: '90%' },
                            margin: "auto",
                            display: 'flex',
                            flexDirection: { xl: 'row', xs: 'column' },
                            gap: '3rem'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: { xl: '50%', xs: '100%' },
                                gap: '2rem',
                                margin: 'auto',
                                paddingTop: { xl: '0', xs: '2rem' }
                            }}
                        >
                            <Box
                                sx={{
                                    borderBottom: '3px solid',
                                    borderBottomColor: 'gold.main'
                                }}
                            >
                                <Typography variant="h1" sx={{ marginBottom: '0.5rem' }}>
                                    {t.consulting}
                                </Typography>
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
                                {t.consultingDescription}
                            </Typography>
                            <Typography
                                variant="p"
                                component="a"
                                href="/services"
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    color: 'gold.main',
                                    alignSelf: 'end',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                        transform: 'skewX(-20deg)',
                                        transition: 'left 0.5s ease',
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        height: '2px',
                                        width: '0%',
                                        backgroundColor: 'gold.main',
                                        transition: 'width 0.4s ease',
                                    },
                                    '&:hover::before': {
                                        left: '100%',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                            >
                                {t.learnMore}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: { xl: '50%', xs: '100%' },
                                margin: 'auto',
                            }}
                        >
                            <Image
                                src="/images/LosNaranjos.JPG"
                                alt="Background"
                                placeholder="empty"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto', justifySelf: 'auto', position: 'relative', pointerEvents: 'none' }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        padding: { xl: '5rem', xs: '1rem' },
                        backgroundColor: 'white.main',
                        display: 'flex',
                        flexDirection: { xl: 'column', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto',
                    }}
                >
                    <NewsSection />
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
                    <ContactForm />
                </Box>
            </Box>
        </Layout>
    );
}
