import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountDropdown = ({logout}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        logout();
        handleClose();
    }

    return (
        <div>
            <IconButton
                aria-controls="account-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AccountCircleIcon sx={{ color: "primary.input" }}/>
            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default AccountDropdown;