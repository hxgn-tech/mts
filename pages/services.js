"use client"
import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { getPressItems } from '../controllers/prensa';
import { getPortfolioItems } from '../controllers/portfolio';
import AnimatedText from '../components/AnimatedText';
import { color, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import ContactForm from '../components/ContactForm';

// Helper to get cookie by name with error logging using Debug.LogError
function getCookie(name) {
    if (typeof document === 'undefined') {
        Debug.LogError("document is undefined");
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Debug object for logging errors
const Debug = {
    LogError: (msg) => {
        console.error(msg);
    }
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

const translations = {
    en: {
        designHeading: "GOLF COURSE DESIGN & RENOVATIONS",
        designParagraph1: "The first step of any project, be it the design of a new golf course or renovating an existing course, is to meet up with the clients to listen and understand the needs, wishes and objectives of the project. Once this is established several visits follows to analyze the site, determine the feasibility of the project and review the options available.",
        designParagraph2: "A preliminary project report is presented to the client, including feasibility advice, initial design and budget proposals. This phase includes follow up meetings with the clients in order to establish the scope of the work and preparing a formal project proposal. Once agreed and approved, the project begins.",
        documentationTitle: "The following documentation and plans are prepared.",
        documentationList: [
            "Project Master plan",
            "Golf course Routing plan",
            "Overall topographic plan",
            "Individual topographic plans for greens, tees and bunkers",
            "Drainage plan",
            "Irrigation plan",
            "Seeding and turf planting plans",
            "Tree planting and landscaping plans",
            "Construction budget",
            "Cash flow and phasing"
        ],
        designParagraph3: "Jan works with associated professionals and experts in all areas of the project. He personally oversees the project from start to finish, assuring that the completed golf course or renovation not only meets the client’s expectations, but also his own high standards of excellence.",
        designSectionHeading: "SONNEVI GOLF DESIGN",
        consultingHeading: "GOLF CLUB MANAGEMENT & CONSULTING",
        consultingParagraph: "Jan’s consulting projects are based on his large experience of having managed some of Europe’s finest golf clubs, both in Sweden and Spain. The first step is meeting with the clients in order to understand their needs and objectives. Once established he prepares an initial report after reviewing the club’s operations and conversing with the management and staff, including an analysis of the existing situation and proposals of improvements. Once agreed and approved he prepares and presents a plan to introduce and implement the proposed improvements and changes. Jan personally oversees the project from start to finish, working closely with the club’s board and management, as well as those responsible for the club’s different operations. Areas covered can include:",
        consultingList: [
            "General and financial management",
            "Pro shop and golf operations",
            "Course maintenance",
            "Food and beverage operations"
        ],
        consultingAdditional: "Or specific areas depending on the clubs needs. Jan works with associated professionals in order to provide high quality advice and solutions in all areas."
    },
    es: {
        designHeading: "DISEÑO Y RENOVACIONES DE CAMPOS DE GOLF",
        designParagraph1: "El primer paso de cualquier proyecto, ya sea el diseño de un nuevo campo de golf o la renovación de uno ya existente, es reunirse con el cliente para escuchar y entender las necesidades, deseos y objetivos del proyecto. Una vez establecido esto, se realizan varias visitas para analizar el sitio, determinar la viabilidad del proyecto y revisar las opciones disponibles.",
        designParagraph2: "Se presenta al cliente un informe preliminar del proyecto, que incluye asesoramiento sobre viabilidad, diseño inicial y propuestas de presupuesto. Esta fase incluye reuniones de seguimiento con el cliente para establecer el alcance del trabajo y preparar una propuesta formal del proyecto. Una vez acordado y aprobado, comienza el proyecto.",
        documentationTitle: "Se prepara la siguiente documentación y planos.",
        documentationList: [
            "Master Plan del proyecto",
            "Routing plan del campo de golf",
            "Plano topográfico general",
            "Planos topográficos individuales de greens, tees y bunkers",
            "Planos de drenaje",
            "Planos de riego",
            "Planos de siembra y plantación de cespedes",
            "Planos de plantación de árboles y paisajismo.",
            "Presupuesto de construcción",
            "Cash Flow y fases"
        ],
        designParagraph3: "Jan trabaja con profesionales asociados y expertos en todas las áreas del proyecto. Supervisa personalmente el proyecto de principio a fin, asegurándose de que el campo de golf terminado o la renovación no solo cumpla con las expectativas del cliente, sino también con sus propios altos estándares de excelencia.",
        designSectionHeading: "SONNEVI GOLF DESIGN",
        consultingHeading: "CONSULTORÍA EN GESTIÓN DE CLUBES DE GOLF",
        consultingParagraph: "Los proyectos de consultoría de Jan se basan en su amplia experiencia tras haber gestionado algunos de los mejores clubes de golf de Europa, tanto en Suecia como en España. El primer paso es reunirse con los clientes para entender sus necesidades y objetivos. Una vez establecido, prepara un informe inicial después de revisar las operaciones del club y conversar con la dirección y el personal, que incluye un análisis de la situación existente y propuestas de mejora. Una vez acordado y aprobado, prepara y presenta un plan para introducir e implementar las mejoras y cambios propuestos. Jan supervisa personalmente el proyecto de principio a fin, trabajando en estrecha colaboración con la junta directiva y la dirección del club, así como con los responsables de las diferentes operaciones del club. Las áreas cubiertas pueden incluir:",
        consultingList: [
            "Gestión general y financiera",
            "Pro shop y operaciones de golf",
            "Mantenimiento del campo",
            "Operaciones de restaurante"
        ],
        consultingAdditional: "O áreas específicas dependiendo de las necesidades de los clubes. Jan trabaja con profesionales asociados para brindar asesoramiento y soluciones de alta calidad en todas las áreas."
    }
};

// Componente para cada ítem de documentationList
function DocumentationListItem({ item, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
        >
            <Typography
                variant='h2'
                sx={{
                    fontFamily: 'Garamond',
                    display: 'flex',
                    alignItems: 'flex-start',
                    '&::before': {
                        fontSize: '2.5rem',
                        content: '"•"',
                        marginRight: '0.5rem',
                        color: 'gold.main',
                        marginBottom: 'auto'
                    }
                }}
            >
                {item}
            </Typography>
        </motion.div>
    );
}

export default function App() {
    const [pressItems, setPressItems] = useState([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [language, setLanguage] = useState('en'); // default language

    useEffect(() => {
        // Lee el idioma desde la cookie seteada en el Navbar
        const cookieLang = getCookie('lang');
        if (cookieLang && (cookieLang === 'es' || cookieLang === 'en')) {
            setLanguage(cookieLang);
        }
        getPressItems(setPressItems);
        getPortfolioItems(setPortfolioItems);
    }, []);

    const t = translations[language];

    return (
        <Layout>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'blue.main',
                    mt: '0',
                    color: 'white.main',
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
                        backgroundColor: 'blue.main',
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
                                width: { xl: '50vw', xs: '100%' },
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
                                        variants={titleReveal}
                                    >
                                        {t.designHeading}
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
                    <Typography
                        variant="h2"
                        paragraph
                        sx={{
                            marginBottom: '6.5rem',
                            textAlign: 'center',
                            color: 'gold.main',
                            fontFamily: 'Garamond',
                            '&::first-letter': {
                                float: 'left',
                                fontSize: '9rem',
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
                        {t.designParagraph1}
                    </Typography>
                    <Box
                        sx={{
                            width: ' 100%',
                            maxWidth: { xl: '90%', md: '85%', xs: '90%' },
                            margin: 'auto',
                            marginTop: '5rem'
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
                                width: { xl: 'auto', md: '50%', xs: '100%' },
                                height: 'auto',
                                paddingBottom: { xl: '2rem', md: '0', xs: '1.5rem' },
                                paddingRight: '0',
                            }}
                        >
                            <Image
                                src="/images/SanEliseo1.jpg"
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
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: ' 100%',
                                maxWidth: { xl: '90%', md: '85%', xs: '90%' },
                                margin: 'auto',
                                marginTop: '5rem'
                            }}
                        >
                        </Box>
                        <Box
                            sx={{
                                border: '2px solid',
                                borderColor: 'gold.main',
                                padding: { xl: '4rem', md: '2.5rem', xs: '0.5rem' },
                                backgroundColor: 'blue.main',
                                color: 'white.main',
                                marginTop: '3rem',
                                width: { xl: "90%", md: '90%', xs: 'auto' }
                            }}
                        >
                            <Typography
                                sx={{ textAlign: " center", }}
                                variant="h2"
                                paragraph
                            >
                                {t.designParagraph2}
                            </Typography>
                        </Box>
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
                        {(t.documentationList || []).map((item, index) => (
                            <DocumentationListItem key={index} item={item} index={index} />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            width: "100%",
                            height: 'auto',
                            padding: { xl: '5rem', xs: '1rem' },
                            backgroundColor: 'blue.main',
                            display: 'flex',
                            flexDirection: { xl: 'row', xs: 'column' },
                            boxSizing: 'border-box',
                            margin: 'auto',
                            color: 'black.main'
                        }}
                    >
                        <AnimatedText
                            text={t.designParagraph3}
                            variant="h1"
                            sx={{ textAlign: 'center', paddingBottom: '2rem', color: 'white.main', marginTop: '1rem' }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        padding: { xl: '5rem', xs: '1rem' },
                        paddingTop: { xl: '5rem', md: '5rem', xs: '5rem' },
                        backgroundColor: 'white.main',
                        display: 'flex',
                        flexDirection: { xl: 'column', xs: 'column' },
                        boxSizing: 'border-box',
                        margin: 'auto',
                        color: 'black.main',
                        gap: '2rem',
                    }}
                >
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'white.main',
                    mt: '0',
                    color: 'black.main',
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
                                width: { xl: '50vw', xs: '100%' },
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
                                        variants={titleReveal}
                                    >
                                        {t.consultingHeading}
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
                    <Typography
                        variant="h2"
                        paragraph
                        sx={{
                            marginBottom: '6.5rem',
                            textAlign: 'center',
                            color: 'gold.main',
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
                        {t.consultingParagraph}
                    </Typography>
                    <Box
                        sx={{
                            width: ' 100%',
                            maxWidth: { xl: '90%', md: '85%', xs: '90%' },
                            margin: 'auto',
                            marginTop: '5rem'
                        }}
                    >
                        <Box
                            sx={{
                                width: ' 100%',
                                maxWidth: { xl: '90%', md: '85%', xs: '90%' },
                                margin: 'auto',
                                marginTop: '5rem'
                            }}
                        >
                        </Box>
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
                        {(t.consultingList || []).map((item, index) => (
                            <DocumentationListItem key={index} item={item} index={index} />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            width: "100%",
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
                        <AnimatedText
                            text={t.consultingAdditional}
                            variant="h1"
                            sx={{ textAlign: 'center', paddingBottom: '2rem', color: 'white.main', marginTop: '1rem' }}
                        />
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
    )
}
