import * as React from 'react';
import {Link, NavLink,} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Button, Container, Divider} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function OnepointAppBar({logout, isManager = true}) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: 'primary.main', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{color: 'primary.input'}}>
                            OnePoint
                        </Typography>
                    </Box>
                    {isManager && (
                        <Container sx={{display: 'flex', alignItems: 'center'}}>
                            <NavLink to="/my-team" activeClassName="active" className="nav-link">
                                <Button
                                    startIcon={<GroupsIcon/>}
                                    sx={{textTransform: 'none', mx: 1, color: 'primary.input'}}
                                >
                                    My Team
                                </Button>
                            </NavLink>
                            <Divider orientation="vertical" flexItem sx={{mx: 1}}/>
                            <NavLink
                                to="/unresolved-discussions"
                                activeClassName="active"
                                className="nav-link"
                            >
                                <Button
                                    startIcon={<ChatIcon/>}
                                    sx={{textTransform: 'none', mx: 1, color: 'primary.input'}}
                                >
                                    Unresolved Discussions
                                </Button>
                            </NavLink>
                        </Container>
                    )}
                    <NavLink to="/account" className="nav-link">
                        <Button
                            startIcon={<AccountCircleIcon/>}
                            sx={{textTransform: 'none', mx: 1, color: 'primary.input'}}
                        >
                            My Account
                        </Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
