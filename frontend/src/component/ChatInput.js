import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message); 
      setMessage(''); 
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)} 
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage} 
        sx={{ ml: 1 }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;

