import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import NutritionDetails from './NutritionDetails'
import ShowRecipie from '../pages/ShowRecipie';

export default function DisplayMeals({mealPlan}) {
    const [open, setOpen] = React.useState(false);
    const [breakfastDetails, openBreakfastDetails] = React.useState(false);
    const [lunchDetails, openLunchDetails] = React.useState(false);
    const [dinnerDetails, openDinnerDetails] = React.useState(false);
    const [showRecipie, setShowRecipie] = useState('')

    const [meals, setMeals] = useState({
        breakfast:null,
        lunch:null,
        dinner:null
    })
    
    useEffect(()=>{
        console.log('meal plan changed:', mealPlan)
        let initial = {
            breakfast:null,
            lunch:null,
            dinner:null
        }
        for (let meal in mealPlan){
            if(mealPlan[meal].time==='breakfast'){
                initial.breakfast = mealPlan[meal]
            }else if(mealPlan[meal].time==='lunch'){
                initial.lunch = mealPlan[meal]
            }else if(mealPlan[meal].time==='dinner') {
                initial.dinner = mealPlan[meal]
            }
        }
        console.log('initial',initial)
        setMeals({...initial})

    },[mealPlan])

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
        <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Your meal plan for the day
            </ListSubheader>
            }
        >
        {/* Breakfast */}
        {
            meals.breakfast!=null?
            <>
            <ListItemButton onClick={()=>openBreakfastDetails(!breakfastDetails)}>
                <img  height='100px' src={meals.breakfast.displayImg}/>
                <ListItemText sx={{marginLeft:'50px'}} primary={meals.breakfast.name} secondary="Breakfast"/>
                {breakfastDetails ? <ExpandLess/> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={breakfastDetails} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={()=>setShowRecipie(meals.breakfast.url)} sx={{ pl: 4 }}>
                    <NutritionDetails/>
                </ListItemButton>
                </List>
            </Collapse>
            <Divider variant="inset" component="li" />
            </>
            :
            null
        }
        {/* Lunch */}
        {
            meals.lunch!=null?
            <>
            <ListItemButton onClick={()=>openLunchDetails(!lunchDetails)}>
                <img  height='100px' src={meals.lunch.displayImg}/>
                <ListItemText sx={{marginLeft:'50px'}} primary={meals.lunch.name} secondary="Lunch" />
                {lunchDetails ? <ExpandLess/> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={lunchDetails} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={()=>setShowRecipie(meals.lunch.url)} sx={{ pl: 4 }}>
                    <NutritionDetails/>
                </ListItemButton>
                </List>
            </Collapse>
            <Divider variant="inset" component="li" />
            </>:
            null
        }
        {/* Dinner */}
        {
            meals.dinner!=null?
            <>
            <ListItemButton onClick={()=>openDinnerDetails(!dinnerDetails)}>
                <img  height='100px' src={meals.dinner.displayImg}/>
                <ListItemText sx={{marginLeft:'50px'}} primary={meals.dinner.name} secondary="Dinner" />
                {dinnerDetails ? <ExpandLess/> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={dinnerDetails} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton onClick={()=>setShowRecipie(meals.dinner.url)} sx={{ pl: 4 }}>
                    <NutritionDetails/>
                </ListItemButton>
                </List>
            </Collapse>
            {/* <Divider variant="inset" component="li" /> */}
            </>:
            null
        }
        </List>
        { showRecipie.length>0 ? <ShowRecipie setUrl={setShowRecipie} url={showRecipie}/> : null}
        </>
    );
}