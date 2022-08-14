import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function createData(name, quantity) {
  return { name, quantity};
}

const rows = [
  createData('calories', 159),
  createData('carbs', 237),
  createData('protiens', 262),
  createData('fats', 262),
];

export default function NutritionDetails() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "90%" }} >
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button fullWidth variant="contained">See Recipie</Button>
    </TableContainer>
  );
}
