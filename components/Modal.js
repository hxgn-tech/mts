import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'; 
import CloseIcon from '@mui/icons-material/Close';
import theme from '../styles/theme';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '80%',
        sm: '80%',
        md: '60%',
        lg: '50%',
    },
    maxHeight: '80vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px',
};

export default function ModalWindow({ open, onClose, children }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{ ...style, border: 'none' }}>
                <CloseIcon
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: '15px',
                        right: '30px',
                        p: '10px',
                        cursor: 'pointer',
                        ":hover": {
                            backgroundColor: 'rgba(0, 0, 0, 0.09)',
                            borderRadius: '8px',
                        },
                        color: theme.palette.text.primary
                    }}
                />
                <Box>{children}</Box>
            </Box>
        </Modal>
    );
}