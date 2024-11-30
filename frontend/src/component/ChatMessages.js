// ChatMessages.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatMessages = ({ messages }) => {
  return (
    <Box
      sx={{
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
        padding: 2,
        borderRadius: 1,
        mt: 2,
      }}
    >
      {messages.map((msg, index) => (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {msg.sender}: 
          </Typography>
          <Typography variant="body1">{msg.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;
