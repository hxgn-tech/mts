import React, { useState, useRef, useEffect } from 'react';
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
    const [imageIndex, setImageIndex] = useState(0);
    const dragControls = useDragControls();
    const containerRef = useRef(null);

    useEffect(() => {
        setImageIndex(0); // reset image when venue changes
    }, [currentIndex]);

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

    const images = venues[currentIndex].images || [];
    const nextImage = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };
    const prevImage = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setImageIndex((i) => (i === 0 ? Math.max(images.length - 1, 0) : i - 1));
    };
    const goToImage = (idx, e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setImageIndex(idx);
    };

    return (
        <Box
            id="venues-section"
            sx={{
                width: '100%',
                padding: { xl: '5rem', xs: '2rem' },
                backgroundColor: 'white.main',
                color: 'black.main'
            }}
        >
            <Box
                sx={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    borderLeft: '1px solid black',
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
                                        flexDirection: { xs: 'column', lg: 'row' },
                                        alignItems: { xs: 'stretch', lg: 'flex-start' },
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
                                            order: { xs: 2, lg: 1 }
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

                                    {/* Right side - Image Carousel */}
                                    {images.length > 0 && (
                                        <Box
                                            sx={{
                                                width: { xs: '100%', lg: '1200px' },
                                                maxWidth: { xs: '100%', lg: '900px' },
                                                height: { xs: '250px', lg: '400px' },
                                                position: 'relative',
                                                flexShrink: 0,
                                                order: { xs: 1, lg: 2 },
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                backgroundColor: 'grey.100'
                                            }}
                                        >
                                            {/* Image */}
                                            <Box sx={{ position: 'absolute', inset: 0 }}>
                                                <Image
                                                    src={images[imageIndex]}
                                                    alt={venues[currentIndex].nombre || venues[currentIndex].name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </Box>

                                            {/* Left Arrow */}
                                            <IconButton
                                                onClick={prevImage}
                                                onPointerDown={(e) => e.stopPropagation()}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: 8,
                                                    transform: 'translateY(-50%)',
                                                    zIndex: 10,
                                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.85)' }
                                                }}
                                            >
                                                <ChevronLeft />
                                            </IconButton>

                                            {/* Right Arrow */}
                                            <IconButton
                                                onClick={nextImage}
                                                onPointerDown={(e) => e.stopPropagation()}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: 8,
                                                    transform: 'translateY(-50%)',
                                                    zIndex: 10,
                                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.85)' }
                                                }}
                                            >
                                                <ChevronRight />
                                            </IconButton>

                                            {/* Image Dots */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 8,
                                                    left: 0,
                                                    right: 0,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    gap: 1,
                                                    zIndex: 10
                                                }}
                                            >
                                                {images.map((_, idx) => (
                                                    <Box
                                                        key={idx}
                                                        onClick={(e) => goToImage(idx, e)}
                                                        onPointerDown={(e) => e.stopPropagation()}
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: '50%',
                                                            backgroundColor: idx === imageIndex ? 'black' : 'rgba(255,255,255,0.7)',
                                                            border: idx === imageIndex ? '1px solid white' : '1px solid rgba(0,0,0,0.2)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    />
                                                ))}
                                            </Box>
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
                            color: 'black.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
                                    backgroundColor: index === currentIndex ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: index === currentIndex ? 'black' : 'rgba(0, 0, 0, 0.3)',
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <IconButton
                        onClick={nextVenue}
                        sx={{
                            color: 'black.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            }
                        }}
                    >
                        <ChevronRight fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}