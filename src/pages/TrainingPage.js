import React, {useContext, useEffect, useState} from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AppCTX } from '../Data/AppData'

const TrainingPage = () => {
  const { workouts, selectedDay } = useContext(AppCTX);
  const [ filteredWorkouts, setFilteredWorkouts ] = useState(workouts)
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  useEffect(() =>{
    let filteredData;
    filteredData = workouts.filter((workout) => workout.days[days[selectedDay]])
    setFilteredWorkouts([...filteredData])
  },[selectedDay,workouts])


  return (
    <Container sx={{ height:'100vh'}} fixed>
        <Box 
          sx={{paddingTop:'100px', paddingBottom:'100px', overflow:'scroll', display:'flex', flexWrap:"wrap", justifyContent:'center'}}
        >
        {filteredWorkouts.map((workout, index) => (
          <Box key={index} >
            <Card sx={{margin:'10px', width:'300px'}} >
              <CardHeader
                title={workout.name}
              />
              <CardContent>
                <iframe width="100%"  src={workout.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </CardContent>
              <CardActions disableSpacing>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Workout Completed" />
                </FormGroup>
              </CardActions>
            </Card>
          </Box>
        ))}
        </Box>
    </Container>
  );
};

export default TrainingPage;