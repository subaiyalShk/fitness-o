import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import AddMenuItem from './AddMenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AppCTX } from '../Data/AppData'
import MenuCard from '../components/MenuCard'
import Button from '@mui/material/Button'
import ShowRecipie from './ShowRecipie';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function RecipieBook() {
    const { menu, setEditingMode, saveMealPlan } = useContext(AppCTX);
    const [ allChanges, setAllChanges ] = useState([])
    const [ selectedTime, setSelectedTime ] = useState(0);
    const [ open, setOpen ] = useState(true);
    const [ showRecipie, setShowRecipie ] = useState('')

    const saveChanges = async () => {
        await saveMealPlan([...allChanges])
        setOpen(false)
    }

    useEffect(()=>{
        if(open){
            setAllChanges([...menu])
        }else{
            setAllChanges([]) 
            setTimeout(()=>setEditingMode(false), 500)
        }
    },[menu, open])

    const handleChangeTime = (event, newValue) => {
        setSelectedTime(newValue);
    };
    
    const handleAddMenuItem = (newItem) => {
        let changes = allChanges
        changes.push(newItem)
        setAllChanges([...changes])
    }

    const makeChanges = (event, type, index) => {
        let changes = [...allChanges]
        if(type==='day'){
            changes[index].days[event.target.name]=event.target.checked
            if(changes[index].status != 'new'){
                changes[index].status = 'changed'
            }
        }else if(type==='delete'){
            if(changes[index].status!='new'){
                changes[index].status='delete'
            }else{
                changes.splice(index,1)
            }
        }
        setAllChanges([...changes])
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={()=>setOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={()=>setOpen(false)}
                        aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Recipie Book
                    </Typography>
                    <Button autoFocus color="inherit" onClick={saveChanges}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <AppBar position="static">
                <Tabs
                    id="top-bar"
                    value={selectedTime}
                    onChange={handleChangeTime}
                    indicatorColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Breakfast" {...a11yProps(0)} />
                    <Tab label="Lunch" {...a11yProps(1)} />
                    <Tab label="Dinner" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <Box sx={{ display:'flex', flexWrap:'wrap', width: '100%', justifyContent:'center' }}>
            {
                allChanges.map((meal, idx)=>{
                    if(meal.status != 'delete'&& meal.time===['breakfast','lunch','dinner'][selectedTime])return( <MenuCard key={idx} id={idx} makeChanges={makeChanges} setShowRecipie={setShowRecipie} item={meal} />)
                    else return null
                })
            }
            </Box>
            { showRecipie.length>0 ? <ShowRecipie setUrl={setShowRecipie} url={showRecipie}/> : null}
            <AddMenuItem add={handleAddMenuItem}/>
        </Dialog>
    );
}






