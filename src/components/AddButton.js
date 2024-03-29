import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({onClick}) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" onClick={onClick} aria-label="add" style={{position: 'fixed', bottom: 76, right: 16, bgcolor:'#9FD218'}}>
        <AddIcon />
        Add Recipe
      </Fab>
    </Box>
  );
}