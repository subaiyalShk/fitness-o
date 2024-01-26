import React, {useState, useContext, useEffect} from 'react';
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
import AddBtn from '../components/AddButton'
import AddMenuItem from '../pages/AddMenuItem'
import { AppCTX } from '../Data/AppData'
import MenuCard from '../components/MenuCard'
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

export default function MenuPage() {
    const theme = useTheme();
    const { menu } = useContext(AppCTX);
    const [value, setValue] = useState(0);
    const [add, setAdd] = useState(false);

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
                <Container maxWidth="md">
                    <Box 
                        sx={{  
                            display: 'flex', 
                            flexWrap:"wrap", 
                            justifyContent:"space-around" 
                        }}>
                        {items.map((item, index) => (
                            <MenuCard item={item} />
                        ))}
                    </Box>
                </Container>
                {/* <List>
                    {items.map(({ primary, secondary, person }, index) => (
                    <ListItem button key={index + person}>
                        <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText primary={primary} secondary={secondary} />
                    </ListItem>
                    ))}
                </List> */}
            </TabPanel>
        )
    }   

    return (
        <Box sx={{ bgcolor: '#192327', width: '100%' }}>
            <AppBar position="static">
                <Tabs
                    id="top-bar"
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="#9FD218"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Breakfast" {...a11yProps(0)} />
                    <Tab label="Lunch" {...a11yProps(1)} />
                    <Tab label="Dinner" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    
                    <MenuList items={menu.breakfast} idx={0} />
                    <MenuList items={menu.lunch} idx={1} />
                    <MenuList items={menu.dinner} idx={2} />
                </SwipeableViews>
            <AddBtn onClick={()=>setAdd(true)}/>
            <AddMenuItem setOpen={setAdd} open={add}/>
        </Box>
    );
}






