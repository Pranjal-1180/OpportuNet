import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message); // Call the function passed as prop
      setMessage(''); // Clear the input field
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update the message state
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage} // Call the send function
        sx={{ ml: 1 }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;

