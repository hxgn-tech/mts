import Layout from "../components/Layout"
import React, { useState, useEffect } from 'react';
import ContactForm from "../components/ContactForm";
import { Box } from '@mui/material';

export default function portfolio() {
    return (
        <Layout>
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
        </Layout>
    )
}