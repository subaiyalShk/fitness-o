import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ScheduleMeals from '../components/ScheduleMeals'
import DisplayMeals from '../components/DisplayMeals'
import EditButton from '../components/EditButton'
import { AppCTX } from '../Data/AppData'
import Container from '@mui/material/Container';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function MealPlanPage() {
    const theme = useTheme();
    const [ editing, setEditing ] = useState(true)
    const { mealPlan, menu, createPlan, selectedDay, setSelectedDay } = useContext(AppCTX);
    const [ schedule, setSchedule ] = useState(()=>mealPlan)

    const createSchedule = (day, plan) =>{
        const newEntry= {...schedule, [day]:plan}
        setSchedule(newEntry);
    }

    React.useEffect(()=>{
        if(editing===false){
            createPlan(schedule)
        }
    },[editing])

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <Container maxWidth="md" style={{marginTop:"10px"}}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={selectedDay}
                    onChangeIndex={(newValue)=>setSelectedDay(newValue)}
                >
                        {editing?<ScheduleMeals meals={menu} day="Monday" plan={schedule.Monday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Monday}/>}
                        {editing?<ScheduleMeals meals={menu} day="Tuesday" plan={schedule.Tuesday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Tuesday}/>}
                        {editing?<ScheduleMeals meals={menu} day="Wednesday" plan={schedule.Wednesday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Wednesday}/>}
                        {editing?<ScheduleMeals meals={menu} day="Thursday" plan={schedule.Thursday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Thursday}/>}
                        {editing?<ScheduleMeals meals={menu} day="Friday" plan={schedule.Friday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Friday}/>}
                        {editing?<ScheduleMeals meals={menu} day="Saturday" plan={schedule.Saturday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Saturday}/>}
                        {editing?<ScheduleMeals meals={menu} day="Sunday" plan={schedule.Sunday} createSchedule={createSchedule}/>:<DisplayMeals mealPlan={mealPlan.Sunday}/>}
                </SwipeableViews>
            </Container>
            <EditButton editing={editing} setEditing={setEditing}/>
        </Box>
    );


}
