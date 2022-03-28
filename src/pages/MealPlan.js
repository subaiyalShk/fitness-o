import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {MenuData} from '../Data/MenuData'
import DailyMeals from '../components/DailyMeals'

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

export default function MenuPage() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const MenuList = (props) => {
        const {items, idx} = props;

        return(
            <TabPanel value={value} index={idx} dir={theme.direction}>
                <List>
                    {items.map(({ primary, secondary, person }, index) => (
                    <ListItem button key={index + person}>
                        <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText primary={primary} secondary={secondary} />
                    </ListItem>
                    ))}
                </List>
            </TabPanel>
        )
    }   

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar position="static">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="scrollable"
                aria-label="full width tabs example"
                >
                    <Tab label="Monday" {...a11yProps(0)} />
                    <Tab label="Tuesday" {...a11yProps(1)} />
                    <Tab label="Wednesday" {...a11yProps(2)} />
                    <Tab label="Thursday" {...a11yProps(2)} />
                    <Tab label="Friday" {...a11yProps(2)} />
                    <Tab label="Saturday" {...a11yProps(2)} />
                    <Tab label="Sunday" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
              <DailyMeals/>
              <DailyMeals/>
              <DailyMeals/>
              <DailyMeals/>
              <DailyMeals/>
              <DailyMeals/>
              <DailyMeals/>
            </SwipeableViews>
        </Box>
    );


}
