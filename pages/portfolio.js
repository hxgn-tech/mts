import Layout from "../components/Layout"
import { getPortfolioItems } from '../controllers/portfolio';
import React, { useState, useEffect } from 'react';
import PortfolioCarousel from "../components/PortfolioCarousel";
import ContactForm from '../components/ContactForm';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';

export default function portfolio() {
    return (
        <Layout>
            <PortfolioCarousel />
            {/* <ThemeProvider theme={theme}> */}
                {/* <ContactForm /> */}
            {/* </ThemeProvider> */}
        </Layout>
    )
}