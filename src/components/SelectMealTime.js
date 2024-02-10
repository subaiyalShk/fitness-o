import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { textInputHandler} from '../utils/inputHandlers'

export default function SelectMealTime({data, changeData, invalidInputs, setInvalidInputs}) {
  
  const handleChange = (event) => {
    changeData({
        ...data,
        time: event.target.value,
        days:{...data.days}
      })
  };

  return (
    <div id="selectMealTime">
      <Box sx={{ maxWidth: "150px" }}>
        <FormControl fullWidth error={invalidInputs.time} >
          <InputLabel id="demo-simple-select-label">Select Meal</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.time}
            label="Meal"
            onChange={handleChange}
            error={invalidInputs["mealtime"]}
            // helperText={invalidInputs["mealtime"]? "Please an input" : null}
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