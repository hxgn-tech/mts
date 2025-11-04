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
                        PRODUCCIONES
                    </Typography>
                </motion.div>

                <Grid container spacing={3}>
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
                                        backgroundColor: 'transparent',
                                        border: '1px solid black',
                                        borderRadius: 0,
                                        overflow: 'hidden',
                                        height: '100%',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    {produccion.images && produccion.images.length > 0 && (
                                        <CardMedia
                                            sx={{
                                                height: '200px',
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
                                            variant="h2"
                                            sx={{
                                                color: 'primary.main'
                                            }}
                                        >
                                            {language === 'es' ? produccion.nombre : produccion.name}
                                        </Typography>

                                        <Typography
                                            variant="p"
                                            sx={{
                                                color: 'black.main',
                                                fontSize: '0.9rem',
                                                lineHeight: 1.6,
                                                width: '100%'
                                            }}
                                        >
                                            {language === 'es' ? produccion.descripcion : produccion.description}
                                        </Typography>

                                        <Box sx={{ marginBottom: '1rem' }}>
                                            <Typography
                                                variant="p"
                                                sx={{
                                                    fontSize: '0.8rem',
                                                    marginBottom: '0.1rem',
                                                    color: 'black.main'
                                                }}
                                            >
                                                📍 {language === 'es' ? produccion.ubicacion : produccion.location} - {formatDate(produccion.fecha)} {produccion.categoria && (
                                                    <Chip
                                                        label={produccion.categoria}
                                                        sx={{
                                                            ml: '8px',
                                                            backgroundColor: 'transparent',
                                                            color: 'primary.main',
                                                            border: 'none',
                                                            borderRadius: 0,
                                                            fontSize: '0.7rem',
                                                            height: '24px'
                                                        }}
                                                    />
                                                )}
                                            </Typography>


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