import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { textInputHandler} from '../utils/inputHandlers'

export default function SelectMealTime({output, setOutput, invalidInputs, setInvalidInputs}) {
  
  const handleChange = (event) => {
    setOutput(event.target.value);
  };

  return (
    <div id="selectMealTime">
      <Box sx={{ maxWidth: "150px" }}>
        <FormControl fullWidth error={invalidInputs.mealtime} >
          <InputLabel id="demo-simple-select-label">Select Meal</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={output}
            label="Meal"
            onChange={(e)=>textInputHandler("mealtime", e.target.value, setOutput, 2, setInvalidInputs, invalidInputs)}
            error={invalidInputs["mealtime"]}
            helperText={invalidInputs["mealtime"]? "Please an input" : null}
          >
            <MenuItem value={'breakfast'}>Breakfast</MenuItem>
            <MenuItem value={'lunch'}>Lunch</MenuItem>
            <MenuItem value={'dinner'}>Dinner</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}