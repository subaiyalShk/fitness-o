import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {imageUpload} from '../Data/ImageUpload'
import {AppCTX} from '../Data/AppData'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {validateInputs, textInputHandler} from '../utils/inputHandlers'
import SelectMealTime from '../components/SelectMealTime'


export default function AddMenuItem({goBack}) {
  const {createMeal, getUser} = React.useContext(AppCTX);
  const [image, setImage] = React.useState(null)
  const [mealtime, setMealtime] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [method, setMethod] = React.useState('')
  const [imageError, setImageError] = React.useState(false);
  const [invalidInputs, setInvalidInputs] = React.useState({
    "title":false,
    "description":false,
    "method":false,
    "mealtime":false
  })
  const NoImage = () => {
    setImageError(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setImageError(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  
  const handleSubmit = async () => {
    if(validateInputs([
      ['title', title, 4],
      ['description', description, 5],
      ['method', method, 10],
      ['mealTime', mealtime, 3]
    ], invalidInputs, setInvalidInputs))return

    if(image==null){
      NoImage()
      return
    }

    let user = await getUser()
    console.log(user)
    const imageUrl = await imageUpload(image)
    const payload = {
      image: imageUrl,
      title: title,
      description: description,
      method: method,
      author: user.userName,
    }
    createMeal(payload, mealtime, payload.title)
    goBack(true)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '10vh', display: 'flex', paddingTop: '20px'}}>
          <IconButton aria-label="delete" size="large" onClick={goBack}>
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box sx={{  minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SelectMealTime invalidInputs={invalidInputs} output={mealtime} setOutput={setMealtime} setInvalidInputs={setInvalidInputs}/>
          {/* DISPLAY title */}
            <TextField  
              style={{marginTop:"50px", width:"100%"}} 
              id="outlined-basic" 
              label="Recipie title" 
              variant="outlined" 
              onChange={(e)=>textInputHandler("title", e.target.value, setTitle, 4, setInvalidInputs, invalidInputs)}
              error={invalidInputs["title"]}
              helperText={invalidInputs["title"]? "Incorrect entry." : null}
            />
          {/* THIS IS DISPLAY PICTURE UPLOAD */}
            { image? 
              <img src={URL.createObjectURL(image)} loading="lazy" className="add-image" />
            :
              <Button variant="outlined" component="label" style={{marginTop:"50px", width:"50%"}} startIcon={<PhotoCamera />}>
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
              onChange={(e)=>textInputHandler("description", e.target.value, setDescription, 5, setInvalidInputs, invalidInputs)}
              error={invalidInputs["description"]}
              helperText={invalidInputs["description"]? "Please enter minimum 5 character description" : null}

            />
          {/* METHOD */}
            <TextField
              style={{marginTop:"50px", width:"100%"}}
              id="outlined-multiline-static"
              label="Method"
              multiline
              rows={4}
              onChange={(e)=>textInputHandler("method", e.target.value, setMethod, 10, setInvalidInputs, invalidInputs)}
              error={invalidInputs["method"]}
              helperText={invalidInputs["method"]? "Please enter minimum 10 character description" : null}
            />
          <Button onClick={handleSubmit} style={{marginTop:"50px", width:"50%"}} variant="contained">Save</Button>
          <Snackbar open={imageError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              You forgot to upload an image. 
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </React.Fragment>
  );
}