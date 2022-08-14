import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import NutritionDetails from './NutritionDetails'

export default function DisplayMeals(props) {
  const [open, setOpen] = React.useState(false);
  const [breakfastDetails, openBreakfastDetails] = React.useState(false);
  const [lunchDetails, openLunchDetails] = React.useState(false);
  const [dinnerDetails, openDinnerDetails] = React.useState(false);

  const { mealPlan } = props;
  console.log(mealPlan)

  const handleClick = () => {
    setOpen(!open);
  };

return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
        {/* Breakfast */}
        <ListItemButton onClick={()=>openBreakfastDetails(!breakfastDetails)}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={mealPlan?.breakfast} secondary="Breakfast"/>
            {breakfastDetails ? <ExpandLess/> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={breakfastDetails} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <NutritionDetails/>
            </ListItemButton>
            </List>
        </Collapse>
        <Divider variant="inset" component="li" />

        {/* Lunch */}
        <ListItemButton onClick={()=>openLunchDetails(!lunchDetails)}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={mealPlan?.lunch} secondary="Lunch" />
            {lunchDetails ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={lunchDetails} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <NutritionDetails/>
            </ListItemButton>
            </List>
        </Collapse>
        <Divider variant="inset" component="li" />

        {/* Dinner */}
        <ListItemButton onClick={()=>openDinnerDetails(!dinnerDetails)}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={mealPlan?.dinner} secondary="Dinner" />
            {dinnerDetails ? <ExpandLess/> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={dinnerDetails} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <NutritionDetails/>
            </ListItemButton>
            </List>
        </Collapse>
        <Divider variant="inset" component="li" />
        
        </List>
    );
}