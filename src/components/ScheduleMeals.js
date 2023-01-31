import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MealSelect from './MealSelect'





export default function ScheduleMeals(props) {
    const { meals, day, plan, createSchedule } = props;
    const menu = [
        {name:'Breakfast', meals:meals.breakfast},
        {name:'Lunch', meals:meals.lunch},
        {name:'Dinner', meals:meals.dinner},
    ];

    const onChangeHandler = (name, newMeal) =>{

      var newEntry = {...plan,[name.toLowerCase()]: newMeal}
      createSchedule(day, newEntry);
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="simple table">
        
        <TableBody>
          {menu.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"150px" }}
            >
                <TableCell component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell align="right">
                    <MealSelect day={item.name} 
                      defaultVal={plan[item.name.toLowerCase()]} 
                      onChangeHandler={onChangeHandler} 
                      meals={item.meals}
                    />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}