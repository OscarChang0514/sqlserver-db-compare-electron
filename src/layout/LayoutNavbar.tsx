import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, Container, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dbImg from '../assets/pages/home/db-icon.png';
import { routeConfig } from "../route/route-config";

const NavBar = styled(AppBar)({
    backdropFilter: 'blur(5px)',
});

const NavTitle = styled(Typography)({
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
});

export const LayoutNavbar: React.FC = () => {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <NavBar position="sticky" sx={{ top: 0 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavTitle
                        variant="h5"
                        noWrap
                        onClick={() => navigate("/home")}

                        sx={{ mr: 2, cursor: "pointer", display: { xs: "none", md: "flex" }, alignItems: "center" }}
                    >
                        <img src={dbImg} style={{ width: '32px', marginRight: '10px' }} alt="db-icon" />
                        DB COMPARE
                    </NavTitle>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            disableScrollLock
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {routeConfig.map((route) => (
                                <MenuItem key={route.path} onClick={() => {
                                    navigate(route.path);
                                    setAnchorElNav(null);
                                }}>
                                    <Typography textAlign="center">{route.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <NavTitle
                        variant="h5"
                        noWrap
                        onClick={() => navigate("/home")}
                        sx={{ mr: 2, cursor: "pointer", display: { xs: "flex", md: "none" }, flexGrow: 1 }}
                    >
                        <img src={dbImg} style={{ width: '32px', marginRight: '10px' }} alt="db-icon" />
                        DB COMPARE
                    </NavTitle>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {routeConfig.map((route) => (
                            <Button
                                key={route.path}
                                onClick={() => navigate(route.path)}
                                sx={{ my: 2, color: "black", display: "block" }}
                            >
                                {route.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </NavBar>
    )
}