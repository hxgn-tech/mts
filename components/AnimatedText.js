import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const AnimatedText = ({ text, variant = 'h1', sx = {} }) => {
  // Split the text by words, then map each word to animated letters
  const words = text.split(' ');

  return (
    <Box
      component={motion.div}
      variants={sentence}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      sx={sx}
    >
      <Typography
        variant={variant}
        sx={{
          ...sx,
          whiteSpace: 'normal',      // Allow normal word wrapping
          wordWrap: 'break-word',    // Prevent words from breaking awkwardly
          overflowWrap: 'break-word',// Better handling of word breaks
          lineHeight: 1.25,           // Control the space between lines
          // color: 'gold.main'
        }}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block', marginRight: '1rem', }}>
            {word.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </Typography>
    </Box>
  );
};

export default AnimatedText;
