import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useLocation } from "react-router-dom";

const drawerWidth = 250;

function Header({ onMenuClick }) {
    const location = useLocation();

    const pageTitle =
        location.pathname === "/tasks"
            ? "Task Management"
            : "Dashboard";

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                borderBottom: "1px solid #E2E8F0",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{
                            mr: 2,
                            display: { md: "none" },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        color="text.primary"
                    >
                        {pageTitle}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="body2" fontWeight={600}>
                            Student
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            TaskFlow User
                        </Typography>
                    </Box>

                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 36,
                            height: 36,
                        }}
                    >
                        S
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;