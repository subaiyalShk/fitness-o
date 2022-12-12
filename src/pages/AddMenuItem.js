import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function SimpleContainer({goBack}) {
  const [image, setImage] = React.useState(null)
  const handleSubmit = () => {

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ height: '10vh', display: 'flex', paddingTop: '20px'}}>
          <IconButton aria-label="delete" size="large" onClick={goBack}>
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box sx={{  height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/* DISPLAY NAME */}
            <TextField style={{marginTop:"50px", width:"100%"}} id="outlined-basic" label="Display Name" variant="outlined" />
          {/* THIS IS DISPLAY PICTURE UPLOAD */}
            { image? 
              <img src={URL.createObjectURL(image)} loading="lazy" width="300px" />
            :
              <Button variant="outlined" style={{marginTop:"50px", width:"50%"}} startIcon={<PhotoCamera />}>
                Upload Photo
                <input hidden accept="image/*" type="file" onChange={(e)=>setImage(e.target.files[0])} />
              </Button>
            }
          {/* DESCRIPTION */}
            <TextField
              style={{marginTop:"50px", width:"100%"}}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
            />
          {/* METHOD */}
            <TextField
              style={{marginTop:"50px", width:"100%"}}
              id="outlined-multiline-static"
              label="Method"
              multiline
              rows={4}
            />
          <Button onClick={handleSubmit} style={{marginTop:"50px", width:"50%"}} variant="contained">Save</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}