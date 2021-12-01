import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, useTheme } from '@material-ui/core/styles'
// eslint-disable-next-line no-unused-vars
import headercss from './Header.css'

const useStyles = makeStyles((theme) => ({

  listItem: {
    fontFamily: "raleway !important"
  },

}))

const HeaderOption = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <ListItem className={classes.listItem} disabled={props.disabled} onClick={props.click} button key={props.name}>
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  )
}

export default HeaderOption