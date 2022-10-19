import { AppBar, BottomNavigation, Box, Toolbar } from '@mui/material';
import  Typography  from '@mui/material/Typography';
import {styled} from '@mui/system'
import {styledAppbarprops, styledBoxprops, styledTypographyprops} from './types'

const StyledAppBar = styled(AppBar)((props : styledAppbarprops) => ({
  backgroundColor: "#000485",
  bottom: props.bottom,
  top : props.top,
  
}))

const StyledTypography = styled(Typography)((props : styledTypographyprops) => ({
  variant : props.variant,
  component : 'div',
  align : props.align,
  nowrap: true,
  fontFamily: 'Raleway',
  color: "#000485"
}))

const StyledToolbar = styled(Toolbar)(() =>({
  marginTop : 10
}))

const StyledBox = styled(Box) ((props : styledBoxprops) => ({
  display: props.display,
  flexDirection: 'row',
  justifyContent: 'center',
  padding: 10,
  
}))

const StyledBottomNavigation = styled(BottomNavigation) (() => ({
  backgroundColor: 'transparent',
  width: '50%',
  "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
     color: "#FCF7F6"
 
  },

}))

export {StyledAppBar, StyledTypography, StyledToolbar, StyledBox, StyledBottomNavigation}