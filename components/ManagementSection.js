import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MusicNote, Language } from '@mui/icons-material';
import Image from 'next/image';

const cardAnimation = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.4, ease: 'easeOut' } 
    },
    exit: {
        opacity: 0,
        x: -100,
        transition: { duration: 0.2, ease: 'easeIn' }
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

const artistCardAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.4, ease: 'easeOut' } 
    }
};

export default function ManagementSection({ managementItems, language }) {
    const [selectedArtist, setSelectedArtist] = useState(0);

    if (!managementItems || managementItems.length === 0) {
        return null;
    }

    const handleArtistSelect = (index) => {
        setSelectedArtist(index);
    };

    return (
        <Box
            id="management-section"
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
                    borderRight: '1px solid black',
                    paddingLeft: { xs: '1rem', lg: '2rem' },
                    paddingRight: { xs: '1rem', lg: '2rem' }
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
                            textAlign: 'right',
                            color: 'primary.main',
                            fontSize: { xs: '3rem', sm: '4rem', md: '6rem', lg: '8rem' },
                            lineHeight: { xs: '1', sm: '1.1', md: '1.2' }
                        }}
                    >
                        MANAGEMENT
                    </Typography>
                </motion.div>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        marginTop: '2rem',
                        gap: { xs: '2rem', lg: '0' }
                    }}
                >
                    {/* Main Artist Card */}
                    <Box
                        sx={{
                            width: { xs: '100%', lg: '65%' },
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: { xs: 'auto', lg: '400px' },
                            order: { xs: 2, lg: 1 },
                            overflow: 'hidden',
                            '& .card-content': {
                                flexDirection: { xs: 'column', lg: 'row' }
                            }
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedArtist}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={cardAnimation}
                                style={{ 
                                    display: 'flex', 
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative'
                                }}
                                className="card-content"
                            >
                                {/* Image and Description Section */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: { xs: '0', lg: '2rem' }
                                    }}
                                >
                                    {/* Artist Image */}
                                    {managementItems[selectedArtist].imagen && (
                                        <Box
                                            sx={{
                                                width: '350px',
                                                height: '250px',
                                                position: 'relative',
                                                marginBottom: '1.5rem'
                                            }}
                                        >
                                            <Image
                                                src={managementItems[selectedArtist].imagen}
                                                alt={managementItems[selectedArtist].nombre}
                                                fill
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {/* Description */}
                                    <Typography
                                        variant="p"
                                        sx={{
                                            color: 'black.main',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.6,
                                            width: '100%'
                                        }}
                                    >
                                        {language === 'es' 
                                            ? managementItems[selectedArtist].descripcion 
                                            : managementItems[selectedArtist].description
                                        }
                                    </Typography>
                                </Box>

                                {/* White Border Divider */}
                                <Box
                                    sx={{
                                        width: { xs: '0', lg: '1px' },
                                        height: { xs: '0', lg: 'auto' },
                                        backgroundColor: 'black',
                                        margin: { xs: '0', lg: '1rem 0' },
                                        display: { xs: 'none', lg: 'block' }
                                    }}
                                />

                                {/* Name and Social Links Section */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        padding: { xs: '0', lg: '2rem' },
                                        borderTop: { xs: '1px solid black', lg: 'none' },
                                        marginTop: { xs: '1rem', lg: '0' }
                                    }}
                                >
                                    {/* Name and Nationality Container */}
                                    <Box
                                        sx={{
                                            marginBottom: '3rem',
                                            marginTop: { xs: '1rem', lg: '0' }
                                        }}
                                    >
                                        {/* Artist Name */}
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                color: 'primary.main',
                                            }}
                                        >
                                            {managementItems[selectedArtist].nombre}
                                        </Typography>

                                        {/* Nationality */}
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                             {language === 'es' 
                                                ? managementItems[selectedArtist].nacionalidad 
                                                : managementItems[selectedArtist].nationality
                                            }
                                        </Typography>
                                    </Box>

                                    {/* Social Media Links */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem'
                                        }}
                                    >
                                        {managementItems[selectedArtist].linkRedes && (
                                            <Typography
                                                component="a"
                                                href={managementItems[selectedArtist].linkRedes}
                                                target="_blank"
                                                variant="p"
                                                sx={{
                                                    color: 'primary.main',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    textTransform: 'uppercase',
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                Instagram
                                            </Typography>
                                        )}
                                        
                                        {managementItems[selectedArtist].spotify && (
                                            <Typography
                                                component="a"
                                                href={managementItems[selectedArtist].spotify}
                                                target="_blank"
                                                variant="p"
                                                sx={{
                                                    color: 'primary.main',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    textTransform: 'uppercase',
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                Spotify
                                            </Typography>
                                        )}
                                        
                                        {managementItems[selectedArtist].pressKit && (
                                            <Typography
                                                component="a"
                                                href={managementItems[selectedArtist].pressKit}
                                                target="_blank"
                                                variant="p"
                                                sx={{
                                                    color: 'primary.main',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    textTransform: 'uppercase',
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                Press Kit
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </motion.div>
                        </AnimatePresence>
                    </Box>

                    {/* Artist Selection Grid */}
                    <Box
                        sx={{
                            width: { xs: '100%', lg: '35%' },
                            borderLeft: { xs: 'none', lg: '1px solid black' },
                            borderBottom: { xs: '1px solid black', lg: 'none' },
                            paddingLeft: { xs: '0', lg: '2rem' },
                            paddingBottom: { xs: '2rem', lg: '0' },
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr', lg: '1fr 1fr' },
                            gap: '1rem',
                            backgroundColor: 'transparent',
                            zIndex: 2,
                            position: 'relative',
                            order: { xs: 1, lg: 2 }
                        }}
                    >
                    {managementItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={artistCardAnimation}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Box
                                    onClick={() => handleArtistSelect(index)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        border: selectedArtist === index 
                                            ? '1px solid black' 
                                            : 'none',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    {/* Artist Image */}
                                    {item.imagen && (
                                        <Box
                                            sx={{
                                                // width: '100%',
                                                height: '120px',
                                                position: 'relative'
                                            }}
                                        >
                                            <Image
                                                src={item.imagen}
                                                alt={item.nombre}
                                                fill
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                    )}
                                    
                                    {/* Artist Name */}
                                    <Box
                                            sx={{
                                            padding: '0.25rem',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.9rem',
                                                fontWeight: "100",
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {item.nombre}
                                        </Typography>
                                    </Box>
                                        </Box>
                            </motion.div>
                    ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}