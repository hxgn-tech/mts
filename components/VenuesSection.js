import React, { useState, useRef } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Stack } from '@mui/material';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
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

export default function VenuesSection({ venues, language }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dragControls = useDragControls();
    const containerRef = useRef(null);

    if (!venues || venues.length === 0) {
        return null;
    }

    const nextVenue = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === venues.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevVenue = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? venues.length - 1 : prevIndex - 1
        );
    };

    const goToVenue = (index) => {
        setCurrentIndex(index);
    };

    const handleDragEnd = (event, info) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            prevVenue();
        } else if (info.offset.x < -threshold) {
            nextVenue();
        }
    };

    return (
        <Box
            id="venues-section"
            sx={{
                width: '100%',
                padding: { xl: '5rem', xs: '2rem' },
                backgroundColor: 'black.main',
                color: 'white.main'
            }}
        >
            <Box
                sx={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    borderLeft: '1px solid white',
                    paddingLeft: '2rem'
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
                            color: 'primary.main',
                        }}
                    >
                        VENUES
                    </Typography>
                </motion.div>


                {/* Venue Card Display */}
                <Box
                    ref={containerRef}
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        touchAction: 'pan-y'
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={cardAnimation}
                            drag="x"
                            dragControls={dragControls}
                            dragConstraints={containerRef}
                            dragElastic={0.1}
                            onDragEnd={handleDragEnd}
                            style={{ cursor: 'grab' }}
                            whileDrag={{ cursor: 'grabbing' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2rem'
                                }}
                            >
                                {/* Top row - Name/Ubicacion and Image */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: { xs: 'stretch', md: 'flex-start' },
                                        gap: '2rem'
                                    }}
                                >
                                    {/* Left side - Name and Ubicacion */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0rem',
                                            flex: 1,
                                            order: { xs: 2, md: 1 }
                                        }}
                                    >
                                        {/* Venue Name */}
                                        <Typography variant="p">
                                            {language === 'es' ? venues[currentIndex].nombre : venues[currentIndex].name}
                                        </Typography>

                                        {/* Location */}
                                        <Typography variant="p">
                                            {venues[currentIndex].ubicacion}
                                        </Typography>
                                    </Box>

                                    {/* Right side - Image */}
                                    {venues[currentIndex].images && venues[currentIndex].images.length > 0 && (
                                        <Box
                                            sx={{
                                                width: { xs: '100%', md: '1200px' },
                                                maxWidth: { xs: '100%', md: '900px' },
                                                height: { xs: '250px', md: '400px' },
                                                position: 'relative',
                                                flexShrink: 0,
                                                order: { xs: 1, md: 2 }
                                            }}
                                        >
                                            <Image
                                                src={venues[currentIndex].images[0]}
                                                alt={venues[currentIndex].nombre}
                                                fill
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                                {/* Bottom - Description */}
                                <Typography variant="p"
                                sx={{
                                    maxWidth: "600px",
                                }}>
                                    {language === 'es' ? venues[currentIndex].descripcion : venues[currentIndex].description}
                                </Typography>
                            </Box>
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Navigation Controls with Dots Indicator */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2rem'
                    }}
                >
                    <IconButton
                        onClick={prevVenue}
                        sx={{
                            color: 'white.main',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ChevronLeft fontSize="large" />
                    </IconButton>

                    {/* Dots Indicator */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {venues.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => goToVenue(index)}
                                sx={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: index === currentIndex ? 'white' : 'transparent',
                                    border: '1px solid white',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <IconButton
                        onClick={nextVenue}
                        sx={{
                            color: 'white.main',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Box>

                {/* Counter */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white.main',
                            fontFamily: 'Garamond'
                        }}
                    >
                        {currentIndex + 1} / {venues.length}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}