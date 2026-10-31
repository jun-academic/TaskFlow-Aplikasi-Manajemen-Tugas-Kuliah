import {
    Box,
    Drawer,
    Toolbar,
    Typography,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 250;

function Sidebar({ mobileOpen, onClose }) {
    const location = useLocation();

    const menuItems = [
        {
            title: "Dashboard",
            path: "/",
            icon: <DashboardIcon />,
        },
        {
            title: "Task Management",
            path: "/tasks",
            icon: <AssignmentIcon />,
        },
    ];

    const sidebarContent = (
        <Box>
            <Toolbar sx={{ px: 3 }}>
                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={700}
                >
                    TaskFlow
                </Typography>
            </Toolbar>

            <Divider />

            <Box sx={{ px: 2, py: 3 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 2 }}
                >
                    MAIN MENU
                </Typography>

                <List sx={{ mt: 1 }}>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={onClose}
                            sx={{
                                borderRadius: 2,
                                mb: 1,

                                "&.Mui-selected": {
                                    backgroundColor: "rgba(37, 99, 235, 0.10)",
                                    color: "primary.main",
                                },

                                "&.Mui-selected .MuiListItemIcon-root": {
                                    color: "primary.main",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Sidebar Desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid #E2E8F0",
                    },
                }}
                open
            >
                {sidebarContent}
            </Drawer>

            {/* Sidebar Mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", md: "none" },

                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
}

export default Sidebar;