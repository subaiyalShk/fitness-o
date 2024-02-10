import React, {useState, useEffect} from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {imageUpload} from '../Data/ImageUpload'
import {AppCTX} from '../Data/AppData'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {validateInputs, textInputHandler} from '../utils/inputHandlers'
import SelectMealTime from '../components/SelectMealTime'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

export default function AddMenuItem({add}) {
  const {getUser} = React.useContext(AppCTX);
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [newItem, setNewItem] = useState({
    name:'',
    displayImg:'',
    url:'',
    time:'breakfast',
    days:{
      monday:true,
      tuesday:false,
      wednesday:false,
      thursday:false,
      friday:false,
      saturday:false,
      sunday:false,
    }
  })
  const [invalidInputs, setInvalidInputs] = React.useState({
    "name":false,
    "url":false,
    "time":false,
    
  })
  const [imageError, setImageError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setImageError(false);
  };

  useEffect(() => {
    if(!open){
      setNewItem({
        name:'',
        displayImg:'',
        url:'',
        time:'breakfast',
        days:{
          monday:true,
          tuesday:false,
          wednesday:false,
          thursday:false,
          friday:false,
          saturday:false,
          sunday:false,
        }
      })
      setImage(null)
    }
  },[open])

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = async () => {
    // if(validateInputs([
    //   ['name', newItem.name, 4],
    //   ['displayImg', newItem.displayImg, 5],
    //   ['url', newItem.url, 1],
    //   ['time', newItem.time, 3]
    // ], invalidInputs, setInvalidInputs))return

    if(image==null){
      setImageError(true);
      return
    }

    let user = await getUser()
    const imageUrl = await imageUpload(image)
    const payload = {
      displayImg: imageUrl,
      status:'new',
      name: newItem.name,
      url: newItem.url,
      time: newItem.time,
      author: user.userName,
      days:{
        monday:true,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
        sunday:false,
      }
    }
    add(payload)
    setOpen(false)
  }

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab variant="extended" onClick={()=>setOpen(true)} aria-label="add" style={{position: 'fixed', bottom: 76, right: 16, bgcolor:'#9FD218'}}>
          <AddIcon />
          Add Recipe
        </Fab>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
          <Container sx={{display:'flex', flexDirection:'row', overflow:'scroll', maxHeight:'90%'}} maxWidth="sm">
            <Paper elevation={6} sx={{width:'80%', height:'100%'}}>
            <Stack spacing={4} sx={{width:'100%', height:'100%', padding:'20px'}}>
              {/* Select Time */}
              <SelectMealTime 
                invalidInputs={invalidInputs} 
                data={newItem} 
                changeData={setNewItem} 
                setInvalidInputs={setInvalidInputs}
              />
              {/* Display Name */}
              <TextField  
                value={newItem.name}
                id="outlined-basic" 
                label="Recipie name" 
                variant="outlined" 
                onChange={(e)=>setNewItem({...newItem, name:e.target.value})}
                error={invalidInputs["name"]}
                // helperText={invalidInputs["name"]? "Incorrect entry." : null}
              />
              <TextField  
                value={newItem.url}
                id="outlined-basic" 
                label="Recipie url" 
                variant="outlined" 
                onChange={(e)=>setNewItem({...newItem, url:e.target.value})}
                error={invalidInputs["name"]}
                // helperText={invalidInputs["name"]? "Incorrect entry." : null}
              />
              {
                newItem.url.length>0?<iframe frameBorder="0"  height="100%" width="100%" src={newItem.url}></iframe>:null
              }
              {/* THIS IS DISPLAY PICTURE UPLOAD */}
              { image? 
                  <img src={URL.createObjectURL(image)} loading="lazy" className="add-image" />
                :
                  <Button variant="outlined" component="label"  startIcon={<PhotoCamera />}>
                  Upload Photo
                  <input hidden accept="image/*" type="file" onChange={(e)=>setImage(e.target.files[0])} />
                  </Button>
              }
              <Button onClick={handleSubmit} style={{width:"100%"}} variant="contained">Save</Button>
              <Button onClick={()=>setOpen(false)} color="warning" style={{width:"100%"}} variant="contained">Cancel</Button>
            </Stack>
            <Snackbar open={imageError} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                You forgot to upload an image. 
              </Alert>
            </Snackbar>
          </Paper>
        </Container>
      </Backdrop>
    </>
  );
}