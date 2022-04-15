import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function EditButton(props) {
  const { editing, setEditing } = props;
  return (
    <Box 

      style={{
      position: 'absolute',
      bottom: 76,
      right: 16,
      }} 

      sx={{ '& > :not(style)': { m: 1 } }}
    >
      <Fab color="secondary" aria-label="edit" onClick={()=>setEditing(!editing)}>
        {editing?<SaveIcon/>:<EditIcon />}
      </Fab>
    </Box>
  );
}