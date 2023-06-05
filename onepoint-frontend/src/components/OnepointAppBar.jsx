import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Stack} from "@mui/material";
import AccountDropdown from "./AccountButton";

export default function OnepointAppBar({logout}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: 'primary.main'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.input"}}>
                        OnePoint
                    </Typography>
                    <AccountDropdown logout={logout}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}