import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [searchBarValue, setBarValue] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [chosenSearchQuery, setChosenSearchQuery] = React.useState(null)

  const navigate = useNavigate()
  const openMenu = (e) => setAnchorEl(e.currentTarget)

  React.useEffect(() => {
    if (chosenSearchQuery) {
      navigate(`/opinnot?hakusana=${chosenSearchQuery}`)
    }
  }, [chosenSearchQuery])

  const submitForm = (e) => {
    e.preventDefault()
    if (searchBarValue) {
      setChosenSearchQuery(searchBarValue)
      setBarValue('')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='menu'
            enchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItemComponent
              title='Yliopisto'
              to='/'
            />
            <MenuItemComponent
              title='Ammattikoulu'
              to='/?tab=ammattikoulu'
            />
            <MenuItemComponent
              title='Ammattikorkea'
              to='/?tab=amk'
            />
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to='/'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'text.primary', textDecoration: 'none' }}
          >
            Opintovertailu
          </Typography>
          <form onSubmit={submitForm}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Hae oppilaitoksia"
                  value={searchBarValue}
                  onChange={(e) => setBarValue(e.target.value)}
                  inputProps={{ 'aria-label': 'search', minLength: 3 }}
                />
            </Search>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const MenuItemComponent = ({ title, to }) => (
  <MenuItem component={Link} to={to}>
    <Typography textAlign='center'>{title}</Typography>
  </MenuItem>
)