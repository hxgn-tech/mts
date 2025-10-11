import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Chip } from '@mui/material';
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

export default function ProduccionesSection({ producciones, language }) {
    if (!producciones || producciones.length === 0) {
        return null;
    }

    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <Box
            id="producciones-section"
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
                        PRODUCCIONES
                    </Typography>
                </motion.div>

                <Grid container spacing={4}>
                    {producciones.map((produccion, index) => (
                        <Grid item xs={12} md={6} lg={4} key={produccion.id}>
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
                                    {produccion.images && produccion.images.length > 0 && (
                                        <CardMedia
                                            sx={{
                                                height: '250px',
                                                position: 'relative'
                                            }}
                                        >
                                            <Image
                                                src={produccion.images[0]}
                                                alt={produccion.nombre}
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
                                            {language === 'es' ? produccion.nombre : produccion.name}
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
                                            {language === 'es' ? produccion.descripcion : produccion.description}
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
                                                📍 {language === 'es' ? produccion.ubicacion : produccion.location}
                                            </Typography>
                                            
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontSize: '0.8rem',
                                                    marginBottom: '0.5rem'
                                                }}
                                            >
                                                📅 {formatDate(produccion.fecha)}
                                            </Typography>
                                            
                                            {produccion.categoria && (
                                                <Chip
                                                    label={produccion.categoria}
                                                    sx={{
                                                        backgroundColor: 'rgba(152, 130, 84, 0.2)',
                                                        color: 'gold.main',
                                                        border: '1px solid rgba(152, 130, 84, 0.5)',
                                                        fontSize: '0.7rem',
                                                        height: '24px'
                                                    }}
                                                />
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