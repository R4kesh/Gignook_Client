import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material'


const header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar disableGutters variant="dense">
                <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                    GigNook
                </Typography>
                <IconButton sx={{ display: { xs: 'none', md: 'flex' } }}>
                    
                </IconButton>
                
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                   
                </IconButton>
                <IconButton size="large" aria-label="account of current user" color="inherit">
                    
                </IconButton>
                
            </Toolbar>
        </AppBar>
    );
}

export default header
