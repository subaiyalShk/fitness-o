import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { AppCTX } from '../Data/AppData'
import { useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import RecipieBook from '../pages/RecipieBook'
import GrocceryList from '../pages/GrocceryList'
import PopUpPage from '../components/PopUpPage'

const drawerWidth = 240;

function Navigation(props) {
  const {selectedDay, setSelectedDay} = useContext(AppCTX);
  const {children, page, setPage } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedPopUpPage, setSelectedPopUpPage] = React.useState(0);
  const [showPopUpPage, setShowPopUpPage] = React.useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleOpenPage = (page) => {
    setSelectedPopUpPage(page)
    setShowPopUpPage(true)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>handleOpenPage(0)}>
            <ListItemIcon>
              <MenuBookIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'Recipie book'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>handleOpenPage(1)}>
            <ListItemIcon>
              <KitchenIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'Groccery list'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>handleOpenPage(2)}>
            <ListItemIcon>
              <LogoutIcon sx={{color:'white'}}/>
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Tabs
            value={selectedDay}
            onChange={(event, newValue) => setSelectedDay(newValue)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            aria-label="full width tabs example"
          >
            <Tab label="Monday" />
            <Tab label="Tuesday" />
            <Tab label="Wednesday" />
            <Tab label="Thursday" />
            <Tab label="Friday" />
            <Tab label="Saturday" />
            <Tab label="Sunday" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', bgcolor:'#192327', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { zIndex:'4', boxSizing: 'border-box', bgcolor:'#192327', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {children}
      </Box>
      <Paper sx={{position: 'fixed', zIndex:'5', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          id="bottom-navigation"
          showLabels
          value={page}
          onChange={(event, nextPage) => {
            setPage(nextPage);
          }}
        >
          <BottomNavigationAction label="Training" icon={<SportsMartialArtsIcon />} />
          <BottomNavigationAction label="Meal Plan" icon={<CalendarMonthIcon />} />
          <BottomNavigationAction label="Progress" icon={<EqualizerIcon />} />
        </BottomNavigation>
      </Paper>
      <PopUpPage open={showPopUpPage} setOpen={setShowPopUpPage}>
        {selectedPopUpPage===0?<RecipieBook/>:null}
        {selectedPopUpPage===1?<GrocceryList/>:null}
      </PopUpPage>
    </Box>
  );
}

export default Navigation;








