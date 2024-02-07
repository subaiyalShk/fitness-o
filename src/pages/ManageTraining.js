import React, {useContext, useEffect, useState} from 'react';
import { Card, CardContent, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { AppCTX } from '../Data/AppData'
import Avatar from '@mui/material/Avatar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ManageTraining = () => {
    const {workouts, setEditingMode, saveWorkouts} = useContext(AppCTX);
    const [open, setOpen] = useState(true)
    const [allChanges, setAllChanges] = useState([])
    const [newWorkout, setNewWorkout] = React.useState({
        name:'',
        url:'',
        status:'new',
        days:{
            monday:true,
            tuesday:true,
            wednesday:true,
            thursday:true,
            friday:true,
            saturday:true,
            sunday:true,
        }
    })

    useEffect(()=>{
        if(open){
            setAllChanges([...workouts])
        }
    },[workouts, open])


    const handleInput = (event, type) => {
        if(type==='url'){
            setNewWorkout({
                ...newWorkout,
                url:event.target.value,
                days:{...newWorkout.days}
            })
        }
        if(type==='name'){
            setNewWorkout({
                ...newWorkout,
                name:event.target.value,
                days:{...newWorkout.days}
            })
        }
        if(type === 'day'){
            setNewWorkout({
                ...newWorkout,
                days:{
                    ...newWorkout.days,
                    [event.target.name]: event.target.checked
                },
            });
        }
    };

    const {monday, tuesday ,wednesday ,thursday, friday, saturday, sunday} = newWorkout.days;
    const error = [
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    ].filter((v) => v).length < 1;

    const cancelChanges = () =>{
        setAllChanges([])
        setOpen(false)
        setTimeout(()=>setEditingMode(false),1000)
    }

    const saveChanges = async () => {
        await saveWorkouts(allChanges)
        setOpen(false)
        setEditingMode(false)
    }

    const makeChanges = (event, type, index) => {
        let newChanges = allChanges
        if(type === 'day'){
            newChanges[index].days[event.target.name]= event.target.checked
            if(newChanges[index].status != 'new'){
                newChanges[index].status = 'changed'
            }
            setAllChanges([...newChanges])
        }else if(type === 'delete'){
            newChanges[index].status = 'deleted'
            setAllChanges([...newChanges])
        }else if(type==='add'){
            newChanges.push({...newWorkout})
            setNewWorkout({
                name:'',
                url:'',
                status:'new',
                days:{
                    monday:true,
                    tuesday:true,
                    wednesday:true,
                    thursday:true,
                    friday:true,
                    saturday:true,
                    sunday:true,
                }
            })
        }
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={cancelChanges}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={cancelChanges}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                 Manage Training
                </Typography>
                <Button autoFocus color="inherit" onClick={saveChanges}>
                 save
                </Button>
            </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{height:'100vh', overflow:'scroll', display:'flex', justifyContent:'center', flexWrap:"wrap"}} fixed>
                <Box sx={{marginTop:'50px'}}>
                    <Stack direction="column" spacing={2}>
                        <Paper elevation={3} >
                            <Box padding={2}>
                                <Stack direction="row" alignItems={'center'} spacing={2}>
                                    <Avatar alt="Chris Heria" src="https://yt3.googleusercontent.com/ytc/AIf8zZTzcHgmeqRftV933uRR3z02nO_vk2ipObq8dgmlDg=s176-c-k-c0x00ffffff-no-rj" />  
                                    <Typography variant="h6" component="h6">
                                        Chris Heria
                                    </Typography>
                                    <Button variant="contained">Get Workouts</Button>
                                </Stack>
                            </Box>
                        </Paper>
                        <Paper elevation={3}>
                            <Box padding={2}>
                                <Stack direction="row" alignItems={'center'} spacing={2}>
                                    <Avatar alt="Jeff Chan" src="https://yt3.googleusercontent.com/r9MzbdIPNCgXvs4PtSpMLhCTlkFTsAri70XeHx0KQVkCZqgD33CO9GpDQJo3SWRRe-DHtDb4fw=s176-c-k-c0x00ffffff-no-rj" />
                                    <Typography variant="h6" component="h6">
                                        Jeff Chan
                                    </Typography>
                                    <Button variant="contained">Get Workouts</Button>
                                </Stack>
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
                <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center', marginTop:'50px'}}>
                    <Box sx={{width:'400px'}}>
                        <Paper sx={{padding:'25px', margin:'10px'}}>
                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" spacing={2}>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Name" 
                                        variant="outlined"
                                        value={newWorkout.name}
                                        onChange={(e)=>handleInput(e,'name')}
                                    />
                                    <TextField 
                                        id="outlined-basic" 
                                        label="video url" 
                                        variant="outlined" 
                                        value={newWorkout.url}
                                        onChange={(e)=>handleInput(e,'url')}
                                    />
                                </Stack>
                                <iframe 
                                    width="100%" 
                                    src={newWorkout.url} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                                <FormControl
                                    required
                                    error={error}
                                    component="fieldset"
                                    sx={{ m: 3 }}
                                    variant="standard"
                                >
                                    <FormLabel component="legend">Pick a day</FormLabel>
                                        <FormGroup>
                                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={monday} onChange={(e)=>handleInput(e,'day')} name="monday" />
                                                }
                                                label="Monday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={tuesday} onChange={(e)=>handleInput(e,'day')} name="tuesday" />
                                                }
                                                label="Tuesday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={wednesday} onChange={(e)=>handleInput(e,'day')} name="wednesday" />
                                                }
                                                label="Wednesday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={thursday} onChange={(e)=>handleInput(e,'day')} name="thursday" />
                                                }
                                                label="Thursday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={friday} onChange={(e)=>handleInput(e,'day')} name="friday" />
                                                }
                                                label="Friday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={saturday} onChange={(e)=>handleInput(e,'day')} name="saturday" />
                                                }
                                                label="Saturday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={sunday} onChange={(e)=>handleInput(e,'day')} name="sunday" />
                                                }
                                                label="Sunday"
                                            />
                                            </Stack>
                                        </FormGroup>
                                    </FormControl>
                                <Button onClick={()=>makeChanges(null,'add',null)} variant="contained">Add</Button>
                            </Stack>
                        </Paper>
                    </Box>
                    {allChanges.map((workout, index) => {
                        console.log('each workout',workout)
                        const {
                            monday, 
                            tuesday, 
                            wednesday, 
                            thursday, 
                            friday, 
                            saturday, 
                            sunday
                        } = workout?.days;
                        if(workout.status === 'deleted')return null;
                        else return(
                            <Card sx={{margin:'10px', maxWidth:'400px'}} key={index}>
                                <CardHeader
                                    title={workout.name}
                                    action={
                                        <IconButton onClick={()=>makeChanges(null,'delete',index)} aria-label="settings">
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                />
                                <CardMedia>
                                    <iframe width="100%" src={workout.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </CardMedia>
                                <CardContent>
                                <FormControl
                                    required
                                    error={error}
                                    component="fieldset"
                                    sx={{ m: 3 }}
                                    variant="standard"
                                >
                                    <FormLabel component="legend">Pick a day</FormLabel>
                                        <FormGroup>
                                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={monday} onChange={(e)=>makeChanges(e,'day',index)} name="monday" />
                                                }
                                                label="Monday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={tuesday} onChange={(e)=>makeChanges(e,'day',index)} name="tuesday" />
                                                }
                                                label="Tuesday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={wednesday} onChange={(e)=>makeChanges(e,'day',index)} name="wednesday" />
                                                }
                                                label="Wednesday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={thursday} onChange={(e)=>makeChanges(e,'day',index)} name="thursday" />
                                                }
                                                label="Thursday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={friday} onChange={(e)=>makeChanges(e,'day', index)} name="friday" />
                                                }
                                                label="Friday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={saturday} onChange={(e)=>makeChanges(e,'day', index)} name="saturday" />
                                                }
                                                label="Saturday"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={sunday} onChange={(e)=>makeChanges(e,'day', index)} name="sunday" />
                                                }
                                                label="Sunday"
                                            />
                                            </Stack>
                                        </FormGroup>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Box>
            </Container>
        </Dialog>
    );
};

export default ManageTraining;