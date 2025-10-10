"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

// Translations for contact form texts
const translations = {
    en: {
        contactTitle: "CONTACT US",
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        message: "Message",
        send: "SEND",
        sending: "Sending..."
    },
    es: {
        contactTitle: "CONTÁCTANOS",
        name: "Nombre",
        company: "Empresa",
        email: "Correo",
        phone: "Telefono",
        message: "Mensaje",
        send: "ENVIAR",
        sending: "Enviando..."
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

export default function ContactForm() {
    // States for form fields and response
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [language, setLanguage] = useState('en'); // default language

    // Read language from cookie on mount
    useEffect(() => {
        const cookieLang = getCookie('lang');
        if (cookieLang && translations[cookieLang]) {
            setLanguage(cookieLang);
        } else {
            setLanguage('en');
        }
    }, []);

    // Select translations based on language
    const t = translations[language] || translations.en;

    // Function to send mail via API
    const handleSendMail = async () => {
        // Check required fields
        if (!name || !email || !message || !phone) {
            console.error('Name, email, and message are required');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, company, email, phone, message })
            });
            const data = await res.json();
            setResponseMessage(data.message);
        } catch (error) {
            console.error('Error sending mail:', error);
            setResponseMessage('Error sending mail');
        } finally {
            setLoading(false);
            setName('');
            setCompany('');
            setEmail('');
            setPhone('');
            setMessage('');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {xl: 'row', md: 'row', xs: 'column'},
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                height: '100%',
                width: '100%',
                backgroundColor: 'blue.main', // Use your theme color
                padding: { xs: '2rem', md: '4rem', xs: '5rem 1rem 10rem 1rem' },
                borderRadius: '0px',
                boxShadow: 3
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: {xl: '40%', md: '70%', xs: '100%'},
                    mr: 2
                }}
            >
                <Typography variant="h1" sx={{ color: 'white.main' }}>CONTACT US</Typography>
                
                <TextField
                    label={t.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        sx: {
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            color: 'gold.main'
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0',
                            backgroundColor: 'white.main',
                            '&:hover fieldset': {
                                boxShadow: '0 0 8px gold.main'
                            }
                        }
                    }}
                />

                <TextField
                    label={t.company}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        sx: {
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            color: 'gold.main'
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0',
                            backgroundColor: 'white.main',
                            '&:hover fieldset': {
                                boxShadow: '0 0 8px gold.main'
                            }
                        }
                    }}
                />

                <TextField
                    label={t.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        sx: {
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            color: 'gold.main'
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0',
                            backgroundColor: 'white.main',
                            '&:hover fieldset': {
                                boxShadow: '0 0 8px gold.main'
                            }
                        }
                    }}
                />

                <TextField
                    label={t.phone}
                    value={phone}
                    onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        setPhone(numericValue);
                    }}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        sx: {
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            color: 'gold.main'
                        }
                    }}
                    inputProps={{
                        inputMode: "numeric", // Optimized for mobile keyboards
                        pattern: "[0-9]*" // Ensures only numbers are allowed
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0',
                            backgroundColor: 'white.main',
                            '&:hover fieldset': {
                                boxShadow: '0 0 8px gold.main'
                            }
                        }
                    }}
                />
                <TextField
                    label={t.message}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    InputLabelProps={{
                        sx: {
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            color: 'gold.main'
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '0',
                            backgroundColor: 'white.main',
                            '&:hover fieldset': {
                                boxShadow: '0 0 8px gold.main'
                            },
                            '&.Mui-focused fieldset': {
                                boxShadow: '0 0 12px gold.main'
                            }
                        }
                    }}
                />

                <Button
                    variant="text"
                    onClick={handleSendMail}
                    disabled={loading}
                    sx={{
                        position: 'relative',
                        display: 'inline-block',
                        color: 'gold.main',
                        alignSelf: 'end',
                        textTransform: 'none',
                        fontSize: '3rem',
                        fontFamily: 'Garamond',
                        fontWeight: '300',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        background: 'transparent',
                        border: 'none',
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
                    {loading ? t.sending : t.send}
                </Button>

                {responseMessage && (
                    <Typography
                        color={responseMessage.includes('Error') ? 'error' : 'gold.main'}
                        sx={{ mt: 2 }}
                    >
                        {responseMessage}
                    </Typography>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: {xl: '50%', md: '76%', xs: '100%'},
                    marginTop: {xl: '0', md: '2rem', xs: '5rem'}
                }}
            >
                <img src="images/sonnevi_logo-w.svg" alt="Contact" style={{ width: '100%' }} />
            </Box>
        </Box>
    );
}
