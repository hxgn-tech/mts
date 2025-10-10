import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { getPressItems } from '../controllers/prensa';
import { getPortfolioItems } from '../controllers/portfolio';
import AnimatedText from '../components/AnimatedText';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import ContactForm from '../components/ContactForm';

// Helper to get cookie by name with error logging
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

// Helper to render multiline text by splitting on newline characters
const renderMultilineText = (text) => {
    return text.split('\n').map((line, index, arr) => (
        <React.Fragment key={index}>
            {line}
            {index < arr.length - 1 && <br />}
        </React.Fragment>
    ));
};

// Debug object for logging errors
const Debug = {
    LogError: (msg) => {
        console.error(msg);
    }
};

const textReveal = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
};
const borderAnimation = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } }
};
const imageReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } }
};

const translations = {
    en: {
        profileHeading: "JAN SONNEVI",
        profileParagraph1: "Swedish professional golfer, golf course designer and consultant in all areas of golf course management.",
        profileParagraph2: "Born in Stockholm, Sweden, he was a pioneer in the first wave of Swedish golfers that made their mark on the international professional tours. Jan competed mainly on the Scandinavian and European Tours but also in North and South America, Asia and Africa.",
        profileParagraph3: "He won eight professional tournaments, the Swedish PGA Order of Merit twice and represented Sweden four times in the World Cup.",
        profileParagraph4: "After his playing days he continued his career in golf, concentrating on golf course management and design. Jan successfully managed some of southern Spain’s leading Golf Courses, including Atalaya Golf & Country Club, La Cala Resort, Real Club de golf Las Brisas and Los Naranjos Golf Club, introducing international and modern concepts of club management and maintenance.",
        profileParagraph5: "Jan has always been passionate about the design of golf courses. During his career as a professional golfer he competed on some of the best golf courses around the world, he found that the more he understood about the design strategy of these famous courses, the better he would play them. His keen interest in the history of the game led him to study the concepts of the designers of these classic courses and how they were created.",
        profileParagraph6: "In 2005 he founded Sonnevi Golf Design & Consulting. The company is based in Marbella, Spain and has taken on projects of course renovations, design of new golf courses and club management consulting, both in Europe and South America.",
        profileParagraph7: "Jan designed two of Argentina’s finest new courses, San Eliseo Golf & Country Club and La Providencia Resort & Country Club, both located near Buenos Aires. San Eliseo has been the venue of several tournaments on the PGA Latin American Tour and La Providencia hosted the Argentinian PGA Championship twice. Designed and built to high international standards, both courses are recognized among the best in Argentina."
    },
    es: {
        profileHeading: "JAN SONNEVI – PERFIL",
        profileParagraph1: "Golfista profesional sueco, diseñador de campos de golf y consultor en todas las áreas de gestión de clubes de golf.",
        profileParagraph2: "Nacido en Estocolmo, Suecia, fue un pionero de la primera oleada de golfistas suecos que dejaron su huella en los circuitos profesionales internacionales. Jan compitió principalmente en los circuitos escandinavos y europeos, pero también en América del Norte y del Sur, Asia y África.",
        profileParagraph3: "Ganó ocho torneos profesionales, la Orden del Mérito de la PGA sueca dos veces y representó a Suecia cuatro veces en la Copa del Mundo.",
        profileParagraph4: "Después de su etapa como jugador, continuó su carrera en el golf, centrándose en la gestión y el diseño de campos de golf. Jan dirigió con éxito algunos de los principales campos de golf del sur de España, incluidos Atalaya Golf & Country Club, La Cala Resort, Real Club de golf Las Brisas y Los Naranjos Golf Club, introduciendo conceptos internacionales y modernos de gestión y mantenimiento de campos de golf.",
        profileParagraph5: "Jan siempre ha sido un apasionado del diseño de campos de golf. Durante su carrera como golfista profesional compitió en algunos de los mejores campos de golf del mundo y descubrió que cuanto más comprendía la estrategia de diseño de estos famosos campos, mejor jugaba en ellos. Su gran interés por la historia del golf lo llevó a estudiar los conceptos de los diseñadores de estos campos clásicos y cómo se crearon.",
        profileParagraph6: "En 2005 fundó Sonnevi Golf Design & Consulting, una empresa con sede en Marbella (España) que ha llevado a cabo proyectos de renovación de campos de golf, diseño de nuevos campos de golf y consultoría de gestión de clubes, tanto en Europa como en Sudamérica.",
        profileParagraph7: "Jan diseñó dos de los mejores campos nuevos de Argentina, San Eliseo Golf & Country Club y La Providencia Resort & Country Club, ambos ubicados cerca de Buenos Aires. San Eliseo ha sido sede de varios torneos del PGA Latin American Tour y La Providencia fue sede del Campeonato Argentino de la PGA en dos ocasiones. Diseñados y construidos según altos estándares internacionales, ambos campos están reconocidos entre los mejores de Argentina."
    }
};

export default function App() {
    const [pressItems, setPressItems] = useState([]);
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [language, setLanguage] = useState('en'); // default language

    useEffect(() => {
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
                        src="/images/background.jpg"
                        alt="Background"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: '100vh', justifySelf: 'auto', position: 'fixed', right: '0', bottom: '0rem', pointerEvents: 'none', zIndex: '-3' }}
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
                                position: 'relative',
                                width: 'auto',
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
                                                {t.profileHeading}
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
                                display: 'flex',
                                flexDirection: 'column',
                                width: { xl: '70%', xs: '100%' },
                                gap: { xl: '2rem', md: '0', xs: '0' },
                                margin: 'auto',
                                paddingTop: { xl: '0', xs: '2rem' },
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 'auto',
                                    padding: { xl: '1rem', xs: '1rem' },
                                    display: 'flex',
                                    flexDirection: { xl: 'row', xs: 'column' },
                                    boxSizing: 'border-box',
                                    margin: 'auto',
                                    color: 'gold.main'
                                }}
                            >
                                <AnimatedText
                                    text={t.profileParagraph1}
                                    variant="h1"
                                    sx={{ textAlign: 'center', paddingBottom: '2rem', color: 'gold.main', paddingTop: '1rem' }}
                                />
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
                            src="/images/jan_pp.png"
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
                        {t.profileParagraph2}
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
                        {t.profileParagraph3}
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
                        {t.profileParagraph4}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: { xl: '90%', xs: '90%' },
                        margin: 'auto',
                        maxWidth: '1200px',
                    }}
                >
                    <Box
                        sx={{
                            border: '2px solid',
                            borderColor: 'gold.main',
                            padding: { xl: '4rem', md: '3rem', xs: '1rem' },
                            backgroundColor: 'blue.main',
                            color: 'white.main',
                            marginTop: '3rem',
                            display: 'flex',
                            flexDirection: { xl: 'row', md: 'column', xs: 'column' },
                            width: { xl: '100%', md: '100%', xs: 'auto' },
                            gap: '2rem'
                        }}
                    >
                        <Box>
                            <Box
                                sx={{
                                    borderBottom: '3px solid',
                                    borderBottomColor: 'gold.main'
                                }}
                            >
                                <Typography sx={{ textAlign: "center" }} variant="h2" paragraph>
                                {t.profileParagraph5}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: { xl: '45%', md: '45%', xs: '100%' },
                                margin: 'auto',
                                marginTop: '0',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Image
                                src="/images/jan_young.png"
                                alt="Background"
                                placeholder="empty"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: 'auto', height: '100%', justifySelf: 'auto', position: 'relative', pointerEvents: 'none' }}
                            />
                            <Typography sx={{ alignSelf: 'end', fontSize: '1rem', marginTop: '0.25rem' }}>
                                Jan en el Scandinavian Open de 1983
                            </Typography>
                        </Box>
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
                    <Typography
                        variant="p"
                        paragraph
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
                    >
                        {t.profileParagraph7}
                    </Typography>
                </Box>
                <AnimatedText
                    text="The routing of the golf course should allow for an interesting round of golf with a mix of holes of different lengths and difficulties, in different directions, taking into account the prevailing winds of the area. "
                    variant="h1"
                    sx={{ width: { xl: '70%', md: '80%', xs: '90%' }, textAlign: 'center', paddingBottom: '2rem', margin: 'auto' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        maxWidth: { xl: '50%', md: '90%', xs: '90%' },
                        margin: 'auto',
                        marginTop: '0'
                    }}
                >
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
                        {t.profileParagraph6}
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
