import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: 'easeOut' } 
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

export default function ManagementSection({ managementItems, language }) {
    if (!managementItems || managementItems.length === 0) {
        return null;
    }

    return (
        <Box
            id="management-section"
            sx={{
                width: '100%',
                padding: { xl: '5rem', xs: '2rem' },
                backgroundColor: 'black.main',
                color: 'white.main'
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={titleAnimation}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '3rem',
                            fontSize: { xl: '3rem', md: '2.5rem', xs: '2rem' },
                            color: 'gold.main',
                            fontFamily: 'Garamond'
                        }}
                    >
                        MANAGEMENT
                    </Typography>
                </motion.div>

                <Grid container spacing={4}>
                    {managementItems.map((item, index) => (
                        <Grid item xs={12} md={6} lg={4} key={item.id}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={cardAnimation}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        height: '100%',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 20px 40px rgba(152, 130, 84, 0.3)',
                                        }
                                    }}
                                >
                                    {item.imagen && (
                                        <CardMedia
                                            sx={{
                                                height: '250px',
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
                                        </CardMedia>
                                    )}
                                    
                                    <CardContent sx={{ padding: '1.5rem' }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                marginBottom: '1rem',
                                                color: 'gold.main',
                                                fontFamily: 'Garamond',
                                                fontSize: { xl: '1.5rem', xs: '1.25rem' }
                                            }}
                                        >
                                            {item.nombre}
                                        </Typography>
                                        
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginBottom: '1rem',
                                                color: 'white.main',
                                                fontSize: '0.9rem',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {language === 'es' ? item.descripcion : item.description}
                                        </Typography>
                                        
                                        <Box sx={{ marginBottom: '1rem' }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontSize: '0.8rem',
                                                    marginBottom: '0.5rem'
                                                }}
                                            >
                                                🌍 {language === 'es' ? item.nacionalidad : item.nationality}
                                            </Typography>
                                            
                                            {item.linkRedes && (
                                                <Button
                                                    href={item.linkRedes}
                                                    target="_blank"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        marginRight: '0.5rem',
                                                        marginBottom: '0.5rem',
                                                        borderColor: 'gold.main',
                                                        color: 'gold.main',
                                                        '&:hover': {
                                                            borderColor: 'gold.main',
                                                            backgroundColor: 'rgba(152, 130, 84, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    Social Media
                                                </Button>
                                            )}
                                            
                                            {item.spotify && (
                                                <Button
                                                    href={item.spotify}
                                                    target="_blank"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        marginRight: '0.5rem',
                                                        marginBottom: '0.5rem',
                                                        borderColor: 'gold.main',
                                                        color: 'gold.main',
                                                        '&:hover': {
                                                            borderColor: 'gold.main',
                                                            backgroundColor: 'rgba(152, 130, 84, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    Spotify
                                                </Button>
                                            )}
                                            
                                            {item.pressKit && (
                                                <Button
                                                    href={item.pressKit}
                                                    target="_blank"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        marginRight: '0.5rem',
                                                        marginBottom: '0.5rem',
                                                        borderColor: 'gold.main',
                                                        color: 'gold.main',
                                                        '&:hover': {
                                                            borderColor: 'gold.main',
                                                            backgroundColor: 'rgba(152, 130, 84, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    Press Kit
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}