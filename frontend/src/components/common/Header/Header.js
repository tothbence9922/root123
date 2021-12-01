import { makeStyles, useTheme } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import HeaderData from './HeaderData'
import { useSelector } from 'react-redux'
import { logout } from 'redux/slices/HeaderSlice'
import AuthService from 'services/Auth/AuthService'

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '75px',
    width: "100%",
    backgroundColor: 'lightgrey',
    fontFamily: "raleway",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  toolbar: {
    maxWidth: "1200px",

    height: '100%',
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    fontSize: "2rem",

  },
  listItemText: {
    fontSize: "1.25rem !important",
    textTransform: "uppercase",
    fontFamily: "raleway",
    color: 'white',
  },
  title: {
    fontFamily: "raleway",
    margin: "0.5rem",
    flexGrow: 1,
    textAlign: "start",
    maxWidth: "150px",
    width: "100%",
    color: 'white',
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer",
      outline: "none !important",
    },
    '&:focus': {
      outline: "none !important",
    },
  },
  smallList: {
    width: 250,
    fontSize: "1rem",

  },
  bigList: {
    display: "flex",
  },
  paper: {
    backgroundColor: 'lightgrey',
    color: theme.palette.primary.contrastText,
  },
  listItemIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',

  },
  logoutItem: {
    color: theme.palette.primary.contrastText,
    fontSize: "25px"
  },
  listItem: {
    position: "relative",
    color: theme.palette.primary.contrastText,
    whiteSpace: "nowrap",
    width: "100%",
    textTransform: "uppercase",
    textDecoration: "none",
    letterSpacing: "0.15em",
    padding: "15px 20px",

    '&:hover, &:focus': {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    '&:focus': {
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      outline: "none !important",
    },

  },
  activeItem: {
    position: "relative",
    color: theme.palette.primary.dark,
    whiteSpace: "nowrap",
    width: "100%",
    textTransform: "uppercase",
    textDecoration: "none",
    letterSpacing: "0.15em",
    padding: "15px 20px",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    outline: "none !important",
  },
  collapse: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderBottomLeftRadius: '11px',
    borderBottomRightRadius: '11px',
    backgroundColor: 'lightgrey',
    color: theme.palette.primary.dark,
    position: "absolute",
    top: "100%",
    left: "0",
    zIndex: "100",
    "& wrapperInner": {
      border: "5px solid red",
    }
  },
  bigMenu: {
    color: theme.palette.primary.contrastText,
    display: "flex",
    margin: "0 2rem",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
      display: "flex",
    },
  },
}))

const Header = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const handleLogout = () => {
    AuthService.doLogout()
  }


  const calcOptionsAuth = (
    <List
      component="nav"
      className={classes.bigList}
    >
      {HeaderData.optionsAuth.map((option, idx) => (
        <ListItem disabled={option.disabled} component={RouterLink} to={option.to} key={`header_big_option_${idx}`} >
          <ListItemText classes={{ primary: classes.listItemText }} primary={option.name} />
        </ListItem>
      ))}
      <ListItem disabled={false} onClick={handleLogout} className={classes.listItem} component={RouterLink} to={"/"} key={`header_big_option_logout`} >
        <ListItemText classes={{ primary: classes.listItemText }} primary={"Logout"} />
      </ListItem>

    </List>
  )

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          {
            HeaderData.icon
              ?
              <RouterLink variant="h5" className={classes.title} to={"/"} >
                <img src={HeaderData.icon} alt="Site icon" className={classes.title} />
              </RouterLink>
              :
              <Typography variant="h4" className={classes.title}>
                <RouterLink to='/browse' className={classes.title}>
                  {HeaderData.siteName}
                </RouterLink>
              </Typography >
          }
          <div className={classes.bigMenu}>
            {calcOptionsAuth}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header