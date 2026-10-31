import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
    Box,
    Toolbar,
    Container,
} from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Header onMenuClick={handleDrawerToggle} />

            <Sidebar
                mobileOpen={mobileOpen}
                onClose={handleDrawerClose}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    backgroundColor: "background.default",
                    minHeight: "100vh",
                }}
            >
                <Toolbar />

                <Container
                    maxWidth={false}
                    sx={{
                        py: 4,
                        px: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}

export default AppLayout;