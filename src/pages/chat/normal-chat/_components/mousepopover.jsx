import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      fontFamily: 'Tajawal, sans-serif',
      
      
    },
    components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              color: ' rgba(82, 37, 206, 1);', // Set text color to red
              fontSize:"10px"
            },
          },
        },
      },
  });

export default function MouseOverPopover({ children, content }) {
    
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {children}
        </div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{content}</Typography>
        </Popover>
      </div>
    </ThemeProvider>
  );
}
