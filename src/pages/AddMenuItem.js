import * as React from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {imageUpload} from '../Data/ImageUpload'
import {AppCTX} from '../Data/AppData'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {validateInputs, textInputHandler} from '../utils/inputHandlers'
import SelectMealTime from '../components/SelectMealTime'
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMenuItem({open, setOpen}) {
  const {createMeal, getUser} = React.useContext(AppCTX);
  const [image, setImage] = React.useState(null)
  const [mealtime, setMealtime] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [method, setMethod] = React.useState('')
  const [imageError, setImageError] = React.useState(false);
  const [dataCapturePhase, setDataCapturePhase] = React.useState(0)
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

  const renderPartTwo = () => {
    return(
      <div>
        
      </div>
    )
  }

  const renderPartOne = () => {
    return(
      <Paper elevation={6} sx={{width:'80%', height:'60%'}}>
        <Stack spacing={4} sx={{width:'100%', height:'100%', padding:'20px'}}>
          <SelectMealTime invalidInputs={invalidInputs} output={mealtime} setOutput={setMealtime} setInvalidInputs={setInvalidInputs}/>
          {/* DISPLAY title */}
          <TextField  
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
              <Button variant="outlined" component="label"  startIcon={<PhotoCamera />}>
              Upload Photo
              <input hidden accept="image/*" type="file" onChange={(e)=>setImage(e.target.files[0])} />
              </Button>
            }
          {/* METHOD
          <TextField
            id="outlined-multiline-static"
            label="Method"
            multiline
            rows={4}
            onChange={(e)=>textInputHandler("method", e.target.value, setMethod, 10, setInvalidInputs, invalidInputs)}
            error={invalidInputs["method"]}
            helperText={invalidInputs["method"]? "Please enter minimum 10 character description" : null}
          /> */}
          <Button onClick={handleSubmit} style={{marginBottom:'30px', width:"100%"}} variant="contained">Save</Button>
        </Stack>
        <Snackbar open={imageError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
            You forgot to upload an image. 
          </Alert>
        </Snackbar>
      </Paper>
    )
  }

  
  const handleSubmit = async () => {
    if(validateInputs([
      ['title', title, 4],
      ['description', description, 5],
      ['method', method, 10],
      ['mealtime', mealtime, 3]
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
    setOpen(false)
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={()=>setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={()=>setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add a Recipie
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', }}>
        {dataCapturePhase===0 ? renderPartOne() : renderPartTwo()}
      </Container>
    </Dialog>
  );
}