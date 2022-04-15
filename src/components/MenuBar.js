import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Paper from '@mui/material/Paper';
import MenuPage from '../pages/MenuPage'
import MealPlan from '../pages/MealPlan'
import { PropaneSharp } from '@mui/icons-material';

export default function FixedBottomNavigation(props) {
  const {children, page, setPage} = props;
  const ref = React.useRef(null);


  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [page]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline/>
      {children}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={page}
          onChange={(event, nextPage) => {
            setPage(nextPage);
          }}
        >
          <BottomNavigationAction label="Menu" icon={<MenuBookIcon />} />
          <BottomNavigationAction label="Meal Plan" icon={<CalendarMonthIcon />} />
          <BottomNavigationAction label="Groccery list" icon={<KitchenIcon/>} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
