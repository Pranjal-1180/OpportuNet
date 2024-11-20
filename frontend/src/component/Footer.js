import React from 'react';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const { palette } = useTheme(); // Access MUI theme colors
    return (
        <div style={{
            height: '70px',
            backgroundColor: palette.secondary.midNightBlue,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <span style={{ color: palette.primary.main }}>All rights reserved! 2024.</span>
        </div>
    );
};

export default Footer;

