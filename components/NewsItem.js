import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, IconButton, Button, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Define a simple Debug object for logging.
// This ensures Debug is always defined, falling back to console if necessary.
const Debug = {
    LogError: (message) => console.error(message),
    Log: (message) => console.log(message)
};


// Helper to get cookie by name
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

export const NewsItem = ({ title_en, title_es, subtitle_en, subtitle_es, text_en, text_es, images, file, date }) => {
    // Validate required props and log error if missing using Debug.LogError
    if (!title_en) {
        Debug.LogError("NewsItem: title_en prop is missing");
    }
    if (!subtitle_en) {
        Debug.LogError("NewsItem: subtitle_en prop is missing");
    }
    if (!text_en) {
        Debug.LogError("NewsItem: text_en prop is missing");
    }
    if (!images || images.length === 0) {
        Debug.LogError("NewsItem: images prop is missing or empty");
    }
    if (!date) {
        Debug.LogError("NewsItem: date prop is missing");
    }

    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [lang, setLang] = useState("en"); // default language

    // Reset image loading state when currentImage changes
    useEffect(() => {
        setImageLoading(true);
    }, [currentImage]);

    // Read language from cookie on mount
    useEffect(() => {
        const cookieLang = getCookie("lang");
        if (cookieLang === "es" || cookieLang === "en") {
            setLang(cookieLang);
        } else {
            setLang("en"); // Default to English if cookie is not set or invalid
        }
    }, []);

    // Choose texts based on language
    const title = lang === "es" ? title_es : title_en;
    const subtitle = lang === "es" ? subtitle_es : subtitle_en;
    const text = lang === "es" ? text_es : text_en;

    const handleOpen = () => {
        setOpen(true);
        setCurrentImage(0); // Show first image by default
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrevImage = () => {
        // Calculate previous image index with wrap-around
        const prev = (currentImage - 1 + images.length) % images.length;
        setCurrentImage(prev);
    };

    const handleNextImage = () => {
        // Calculate next image index with wrap-around
        const next = (currentImage + 1) % images.length;
        setCurrentImage(next);
    };

    // Style for the modal content box
    const modalContentStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%", // Increased width for better use of space
        maxWidth: "900px", // Max width for larger screens
        maxHeight: "90vh", // Limit height to viewport height
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 4, // Reduced padding slightly
        overflowY: "auto", // Enable vertical scrolling
        display: "flex", // Use flexbox for layout
        flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, side-by-side on larger screens
        gap: '2rem', // Add space between text and image
    };

    // Style for the image container within the modal
    const modalImageContainerStyle = {
        position: "relative", // Needed for absolute positioning of navigation buttons
        width: { xs: '100%', md: '60%' }, // Full width on mobile, 60% on larger screens
        height: '400px', // Fixed height for the image container
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0, // Prevent shrinking on larger screens
    };

    // Style for the text content container within the modal
    const modalTextContentStyle = {
        width: { xs: '100%', md: '40%' }, // Full width on mobile, 40% on larger screens
        flexGrow: 1, // Allow text content to grow
    };


    return (
        <>
            {/* News Item Card (outside modal) */}
            <Box
                sx={{
                    width: { xl: "50%", xs: "100%" },
                    maxWidth: { xl: "100%", md: "100%", xs: "100%" },
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    ":hover": {
                        cursor: "pointer",
                        transform: "scale(1.01)",
                        transition: "transform 0.3s ease-in-out",
                    },
                    borderRadius: '8px', // Added rounded corners
                    overflow: 'hidden', // Hide overflow for rounded corners
                    boxShadow: 3, // Added subtle shadow
                }}
                onClick={handleOpen}
            >
                {/* Title - Responsive Font Size */}
                <Typography
                    variant="h3"
                    sx={{
                        marginBottom: "0.5rem",
                        p: 2,
                        pb: 0,
                        fontSize: { xs: '1.5rem', md: '2rem' } // Smaller font on mobile (xs)
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        height: "auto", // Changed to auto to maintain aspect ratio
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={images[0]}
                        alt="News Image"
                        style={{
                            width: "100%",
                            height: "auto", // Maintain aspect ratio
                            display: "block", // Remove extra space below image
                            objectFit: "cover", // Cover the area
                        }}
                    />
                </Box>
                <Typography
                    variant="p"
                    sx={{
                        color: "gold.main",
                        alignSelf: "flex-end", // Changed to flex-end for consistency
                        mt: "1rem",
                        p: 2,
                        pt: 0
                    }}
                >
                    {lang === "es" ? "Ver más" : "Read more"}
                </Typography>
            </Box>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalContentStyle}>
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 2, // Ensure close button is above everything
                            backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Text Content Container */}
                    <Box sx={modalTextContentStyle}>
                         {/* Title in Modal - Responsive Font Size */}
                        <Typography
                            id="modal-title"
                            variant="h2"
                            component="h2"
                            sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }} // Smaller font on mobile (xs)
                        >
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ mt: 2 }}>
                            {subtitle}
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                            {text}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, color: "gold.main", alignSelf: "end" }}>
                            {date}
                        </Typography>
                        {file && (
                            <Button
                                variant="contained"
                                color="primary"
                                href={file}
                                target="_blank"
                                sx={{ mt: 2, backgroundColor: "gold.main", fontSize: "1.3rem" }}
                                onClick={(e) => window.open(file, "_blank")}
                            >
                                {lang === "es" ? "Ver PDF con mas informacion" : "View PDF with more information"}
                            </Button>
                        )}
                    </Box>

                     {/* Image Container */}
                    <Box sx={modalImageContainerStyle}>
                         {imageLoading && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay while loading
                                        zIndex: 1, // Above image but below text
                                    }}
                                >
                                    <CircularProgress color="inherit" sx={{ color: 'white' }} /> {/* Loading spinner */}
                                </Box>
                            )}
                        <img
                            src={images[currentImage]}
                            alt="News Image"
                            onLoad={() => setImageLoading(false)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", // Cover the entire container
                                display: imageLoading ? 'none' : 'block', // Hide image while loading
                            }}
                        />
                         {/* Image Navigation Buttons */}
                            {images.length > 1 && (
                                <>
                                    <IconButton
                                        onClick={handlePrevImage}
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: 10,
                                            transform: "translateY(-50%)",
                                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                            },
                                            zIndex: 2, // Above image and loading spinner
                                        }}
                                    >
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNextImage}
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            right: 10,
                                            transform: "translateY(-50%)",
                                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                            },
                                            zIndex: 2, // Above image and loading spinner
                                        }}
                                    >
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </>
                            )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
