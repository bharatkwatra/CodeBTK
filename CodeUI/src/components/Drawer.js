import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import BusinessIcon from '@material-ui/icons/Business';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { withRouter } from 'react-router';

const drawerWidth = 210;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    pageIcon:{
      display:'inline-block',
      padding:theme.spacing(0),
      color:'#c00'
  },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));
  
  const  PersistentDrawerLeft= props  => {
    const { history } = props; 
   const classes = useStyles();
   const theme = useTheme();
   const [open, setOpen] = React.useState(false);
 
   const handleDrawerOpen = () => {
     setOpen(true);
   };
   const ItemList = [
 {
     text: "Category",
     icon: <PeopleOutlineTwoToneIcon/>,
     onClick: () => history.push("/category")
 },
 
 {
     text: "Case",
     icon: <BusinessCenterIcon />,
     onClick: () => history.push("/case")
 
 },
 {
     text: "Office",
     icon: <BusinessIcon />,
     onClick: () => history.push("/office")
 }
             
 ]
   const handleDrawerClose = () => {
     setOpen(false);
   };
 
   return (
     <div className={classes.root}>
       <CssBaseline />
       <AppBar style={{ background: '#c00' }}
         position="fixed"
         className={clsx(classes.appBar, {
           [classes.appBarShift]: open,
         })}
       >
         <Toolbar>
           <IconButton
             color="inherit"
             aria-label="open drawer"
             onClick={handleDrawerOpen}
             edge="start"
             className={clsx(classes.menuButton, open && classes.hide)}
           >
             <MenuIcon />
           </IconButton>
          
           <Typography variant="h6" noWrap>
             Bain Data Analytics
           </Typography>
         </Toolbar>
       </AppBar>
       <Drawer 
         className={classes.drawer}
         variant="persistent"
         anchor="left"
         open={open}
         classes={{
           paper: classes.drawerPaper,
         }}
         
       >
         <div className={classes.drawerHeader}>
         <img src="/jira-logo-scaled.png" width={180} height={30}/>
           <IconButton onClick={handleDrawerClose}>
             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
           </IconButton>
         </div>
         <Divider />
         
         <List>
           {ItemList.map((item, index) =>{
               const {text, icon,onClick} = item;
               return(
                 <ListItem button key={text} onClick={onClick} >
                 {icon && <ListItemIcon>{icon}</ListItemIcon> }
               <ListItemText primary={text} />
             </ListItem>
               );
           })}
         </List>
         <Divider />
       </Drawer>
       <main
         className={clsx(classes.content, {
           [classes.contentShift]: open,
         })}
       >

         <div className={classes.drawerHeader} />
       </main>
     </div>
   );
 };
 export default withRouter (PersistentDrawerLeft);