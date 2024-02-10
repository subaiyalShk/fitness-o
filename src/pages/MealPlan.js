import React, {useState, useContext, useEffect} from 'react';
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

    const { menu, selectedDay, setSelectedDay } = useContext(AppCTX);
    const [plan, setPlan] = useState([])

    useEffect(()=> {
        let day = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][selectedDay]
        let filteredPlan = menu.filter(meal=>meal.days[day])
        setPlan([...filteredPlan])
    },[selectedDay,menu])
    

    return (
        <Container maxWidth="md">
            {/* <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={selectedDay}
                onChangeIndex={(newValue)=>setSelectedDay(newValue)}
            > */}
            <Box  sx={{ width: '100%', marginTop:"100px" }}>
                <DisplayMeals 
                    mealPlan={plan}
                />
            </Box>
            {/* </SwipeableViews> */}
        </Container>
    );


}
