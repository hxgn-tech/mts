import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Stack, Modal, Button, CircularProgress } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close'; // Ensure CloseIcon is correctly imported
import { useSwipeable } from 'react-swipeable';
import { getPortfolioItems } from '../controllers/portfolio'; // Assuming this fetches your data
import theme from '../styles/theme'; // Assuming you have a theme object
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// Define a simple Debug object for logging.
// This ensures Debug is always defined, falling back to console if necessary.
const Debug = {
    LogError: (message) => console.error(message),
    Log: (message) => console.log(message)
};

function getCookie(name) {
    if (typeof document === "undefined") {
        Debug.LogError("document is undefined");
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

export default function PortfolioCarousel() {

    // State for lightbox
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    // State for current index and portfolio items
    const [currentIndex, setCurrentIndex] = useState(0);
    const [portfolioItems, setPortfolioItems] = useState([]);
    // State for modal open, selected item and selected image index in modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    // State for language, default is English
    const [lang, setLang] = useState("en");
    // State for loading
    const [loading, setLoading] = useState(true);


    // Fetch portfolio items on mount and read language cookie
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getPortfolioItems(setPortfolioItems); // Assuming getPortfolioItems is async
            setLoading(false);
        };
        fetchData();

        const cookieLang = getCookie("lang");
        if (cookieLang === "es" || cookieLang === "en") {
            setLang(cookieLang);
        } else {
            setLang("en");
        }
    }, []);

    // Sort portfolio items by "order" field (as number)
    const sortedItems = [...portfolioItems].sort((a, b) => a.order - b.order);

    // Handler to open modal with item info
    const handleOpenModal = (item) => {
        if (!item) {
            Debug.LogError("Item is null in handleOpenModal");
            return;
        }
        setSelectedItem(item);
        setModalImageIndex(0);
        setModalOpen(true);
    };

    // Handler to close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null); // Clear selected item on close
        setModalImageIndex(0); // Reset image index
    };

    // Handler to advance to the next item
    const handleNext = () => {
        if (sortedItems.length === 0) {
            Debug.LogError("No portfolio items available");
            return;
        }
        setCurrentIndex((prev) => (prev + 1) % sortedItems.length);
    };

    // Handler to go back to the previous item
    const handlePrev = () => {
        if (sortedItems.length === 0) {
            Debug.LogError("No portfolio items available");
            return;
        }
        setCurrentIndex((prev) => (prev - 1 + sortedItems.length) % sortedItems.length);
    };

    // Swipe handlers for mobile devices
    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
    });

    // Render loading state if items are not loaded
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Modal style: centered on screen with 80% height, padding, and gap between columns
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '900px', // Added max width for larger screens
        maxHeight: '90vh', // Changed to 90vh to give a little more vertical space
        bgcolor: 'blue.main',
        color: 'white.main',
        borderRadius: 0,
        boxShadow: 24,
        p: 3,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 4 }, // Increased mobile gap slightly
        justifyContent: 'center',
        alignItems: 'flex-start', // Align items to start for better layout
        position: 'relative', // Needed for absolute positioning of close button
    };

    return (
        <Box
            {...handlers}
            sx={{
                position: 'relative',
                width: '100%',
                height: '90vh',
                overflow: 'hidden',
            }}
        >
            {sortedItems.map((item, index) => {
                // Retrieve first image; if missing, fallback to empty string
                const imageUrl =
                    item.images && item.images.length > 0
                        ? item.images[0]
                        : '';
                return (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: `${(index - currentIndex) * 100}%`,
                            width: '100%',
                            height: '100%',
                            transition: 'left 0.5s ease-in-out',
                            background: `url(${imageUrl}) center/cover no-repeat`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 0,
                                color: 'gold.main',
                                fontFamily: 'Garamond',
                                width: '90%',
                                pb: 9,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'blue.main',
                                    px: 2,
                                    py: 2,
                                    borderRadius: 0,
                                    color: 'white.main',
                                    width: { xl: 'auto', md: '100%', xs: '100%' },
                                }}
                            >
                                <Typography variant="h1" sx={{ fontFamily: 'Garamond', fontWeight: '200' }}>
                                    {lang === "es" ? item.title_es : item.title_en}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography variant="h2">
                                        {lang === "es" ? item.location_es : item.location_en}
                                    </Typography>
                                    <Box
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: 'gold.main',
                                            px: 3,
                                            py: 1,
                                            borderRadius: 0,
                                            position: 'relative',
                                            right: '0',
                                        }}
                                    >
                                        <Typography onClick={() => handleOpenModal(item)} sx={{ cursor: 'pointer' }} variant="h3">
                                            +
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                );
            })}
            <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '50%', left: { xl: 30, md: 15, xs: 0 }, color: 'white', zIndex: 1 }}>
                <ArrowBackIos />
            </IconButton>
            <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: { xl: 30, md: 15, xs: 0 }, color: 'white', zIndex: 1 }}>
                <ArrowForwardIos />
            </IconButton>
            <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                {sortedItems.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: currentIndex === index ? 'white.main' : 'gray',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer', // Added cursor pointer for clarity
                        }}
                        onClick={() => setCurrentIndex(index)} // Added click handler for direct navigation
                    />
                ))}
            </Stack>
            {/* Modal to show item details */}
            <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={modalStyle}>
                    {/* Close Button - Positioned Absolutely */}
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'white', // Assuming white is visible on blue background
                            zIndex: 2, // Ensure it's above other modal content
                            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Added a subtle background for better visibility
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {selectedItem && (
                        <>
                            {/* Left section: text info */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    width: { xs: '100%', md: '40%' }, // Full width on mobile
                                    textAlign: { xs: 'left', md: 'center' }, // Align text left on mobile, center on desktop
                                    mb: { xs: 2, md: 0 },
                                    mr: { md: 2 },
                                }}
                            >
                                {/* Removed the 'X' button from here */}
                                <Typography id="modal-title" variant="h7" component="h2">
                                    {lang === "es" ? selectedItem.title_es : selectedItem.title_en}
                                </Typography>
                                <Typography id="modal-title" variant="h6" component="h2">
                                    {lang === "es" ? selectedItem.location_es : selectedItem.location_en}
                                </Typography>
                                <Typography variant="h7">{selectedItem.date}</Typography>
                                <Typography id="modal-description" sx={{ mt: 2 }}>
                                    {lang === "es" ? selectedItem.description_es : selectedItem.description_en}
                                </Typography>
                                {selectedItem.file && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={selectedItem.file}
                                        target="_blank"
                                        sx={{ mt: 2, backgroundColor: 'gold.main', fontSize: '1.3rem', color: 'blue.main' }} // Adjusted button colors
                                        onClick={(e) => window.open(selectedItem.file, "_blank")}
                                    >
                                        {lang === "es" ? "Ver PDF con mas informacion" : "View PDF with more information"}
                                    </Button>
                                )}
                            </Box>
                            {/* Right section: image display */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    width: { xs: '100%', md: '60%' }, // Full width on mobile
                                }}
                            >
                                {selectedItem.images && selectedItem.images.length > 0 && (
                                    <>
                                        <Box
                                            component="img"
                                            src={selectedItem.images[modalImageIndex]}
                                            alt={`main-image-${modalImageIndex}`}
                                            sx={{
                                                width: '100%',
                                                height: 'auto', // Changed to auto to maintain aspect ratio
                                                maxHeight: '400px', // Set a max height for the main image
                                                borderRadius: 1,
                                                objectFit: 'contain', // Changed to contain to show the whole image
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => setIsLightboxOpen(true)}
                                        />
                                        {selectedItem.images.length > 1 && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: 1,
                                                    justifyContent: 'center',
                                                    flexWrap: 'wrap', // Allow thumbnails to wrap on smaller screens
                                                }}
                                            >
                                                {selectedItem.images.map((imgUrl, idx) => (
                                                    <Box
                                                        key={idx}
                                                        component="img"
                                                        src={imgUrl}
                                                        alt={`thumbnail-${idx}`}
                                                        onClick={() => setModalImageIndex(idx)}
                                                        sx={{
                                                            width: 60,
                                                            height: 'auto', // Maintain aspect ratio for thumbnails
                                                            borderRadius: 1,
                                                            cursor: 'pointer',
                                                            border: modalImageIndex === idx ? `2px solid ${theme.palette.primary.main}` : 'none',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
            {isLightboxOpen && selectedItem && selectedItem.images && (
                <Lightbox
                    mainSrc={selectedItem.images[modalImageIndex]}
                    nextSrc={selectedItem.images[(modalImageIndex + 1) % selectedItem.images.length]}
                    prevSrc={selectedItem.images[(modalImageIndex - 1 + selectedItem.images.length) % selectedItem.images.length]}
                    onCloseRequest={() => setIsLightboxOpen(false)}
                    onMoveNextRequest={() =>
                        setModalImageIndex((prev) => (prev + 1) % selectedItem.images.length)
                    }
                    onMovePrevRequest={() =>
                        setModalImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length)
                    }
                    reactModalStyle={{
                        overlay: {
                            zIndex: theme.zIndex.modal + 1000,
                        },
                    }}
                />
            )}
        </Box>
    );
}
