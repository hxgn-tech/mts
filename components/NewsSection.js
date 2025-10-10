import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NewsItem } from "./NewsItem"; // Adjust path if needed
import { getPressItems } from "../controllers/prensa";

export default function NewsSection() {
    const [pressItems, setPressItems] = useState([]);

    useEffect(() => {
        getPressItems(setPressItems);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                margin: "auto",
                display: "flex",
                flexDirection: { xl: "column", xs: "column" },
                gap: "3rem",
                backgroundColor: "background.paper",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xl: "80%", xs: "100%" },
                    gap: "2rem",
                    margin: "auto",
                    paddingTop: { xl: "0", xs: "2rem" },
                }}
            >
                <Box
                    sx={{
                        borderBottom: "3px solid",
                        borderBottomColor: "gold.main",
                    }}
                >
                    <Typography variant="h1" sx={{ marginBottom: "0.5rem" }}>
                        NEWS
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xl: "row", xs: "row" },
                    width: "80%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: { xl: "1", md: "2", xs: "2rem" },
                    padding: "2rem 0",
                }}
            >
                {pressItems.map((item) => (
                    <NewsItem
                        key={item.id}
                        title_en={item.title_en}
                        title_es={item.title_es}
                        subtitle_en={item.subtitle_en}
                        subtitle_es={item.subtitle_es}
                        text_en={item.text_en}
                        text_es={item.text_es}
                        images={item.images}
                        file={item.file}
                        date={item.date}
                    />
                ))}
            </Box>
        </Box>
    );
}
