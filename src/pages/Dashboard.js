import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Stack,
    Divider,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import StatCard from "../components/StatCard";
import useTasks from "../hooks/useTasks";

// Contoh aktivitas sementara
const recentActivities = [
    {
        id: 1,
        title: "Menyelesaikan tugas",
        description: "Mempelajari React Router",
        time: "Today",
        icon: <TaskAltIcon />,
        color: "#16A34A",
    },
    {
        id: 2,
        title: "Memperbarui tugas",
        description: "Membuat Laporan Praktikum",
        time: "Yesterday",
        icon: <EditNoteIcon />,
        color: "#2563EB",
    },
    {
        id: 3,
        title: "Menambahkan tugas",
        description: "Analisis Dataset",
        time: "Yesterday",
        icon: <AddTaskIcon />,
        color: "#F59E0B",
    },
];

function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

function getPriorityColor(priority) {
    switch (priority) {
        case "High":
            return "error";
        case "Medium":
            return "warning";
        case "Low":
            return "success";
        default:
            return "default";
    }
}

function Dashboard() {
    const { tasks } = useTasks();

    // Menghitung statistik tugas
    const totalTasks = tasks.length;

    const todoTasks = tasks.filter(
        (task) => task.status === "To Do"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    // Mengambil tugas yang belum selesai
    // dan mengurutkannya berdasarkan deadline
    const upcomingTasks = tasks
        .filter(
            (task) =>
                task.status !== "Completed" &&
                task.dueDate
        )
        .sort(
            (a, b) =>
                new Date(`${a.dueDate}T00:00:00`) -
                new Date(`${b.dueDate}T00:00:00`)
        )
        .slice(0, 5);

    const statistics = [
        {
            title: "Total Tasks",
            value: totalTasks,
            icon: <AssignmentIcon />,
            color: "#2563EB",
            description: "All assignments",
        },
        {
            title: "To Do",
            value: todoTasks,
            icon: <PendingActionsIcon />,
            color: "#F59E0B",
            description: "Tasks not started",
        },
        {
            title: "In Progress",
            value: inProgressTasks,
            icon: <AutorenewIcon />,
            color: "#8B5CF6",
            description: "Tasks in progress",
        },
        {
            title: "Completed",
            value: completedTasks,
            icon: <CheckCircleIcon />,
            color: "#16A34A",
            description: "Finished assignments",
        },
    ];

    return (
        <Box>
            {/* Welcome Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Welcome back, Student!
                </Typography>

                <Typography color="text.secondary">
                    Here's an overview of your academic tasks.
                </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
                {statistics.map((item) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        key={item.title}
                    >
                        <StatCard
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                            color={item.color}
                            description={item.description}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Upcoming Tasks and Recent Activity */}
            <Grid container spacing={2.5}>
                {/* Upcoming Tasks */}
                <Grid item xs={12} lg={7}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Box>
                                    <Typography variant="h6">
                                        Upcoming Tasks
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Your nearest assignments
                                    </Typography>
                                </Box>

                                <CalendarMonthIcon color="primary" />
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            {upcomingTasks.length > 0 ? (
                                <Stack spacing={2}>
                                    {upcomingTasks.map((task, index) => (
                                        <Box key={task.id}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    gap: 2,
                                                }}
                                            >
                                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        fontWeight={600}
                                                    >
                                                        {task.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {task.course}
                                                    </Typography>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        sx={{ mt: 1, flexWrap: "wrap" }}
                                                    >
                                                        <Chip
                                                            label={task.status}
                                                            size="small"
                                                            variant="outlined"
                                                        />

                                                        <Chip
                                                            label={task.priority}
                                                            size="small"
                                                            color={getPriorityColor(
                                                                task.priority
                                                            )}
                                                        />
                                                    </Stack>
                                                </Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        pt: 0.5,
                                                    }}
                                                >
                                                    {formatDate(task.dueDate)}
                                                </Typography>
                                            </Box>

                                            {index !== upcomingTasks.length - 1 && (
                                                <Divider sx={{ mt: 2 }} />
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography
                                    color="text.secondary"
                                    textAlign="center"
                                    sx={{ py: 4 }}
                                >
                                    No upcoming tasks. You're all caught up!
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} lg={5}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent sx={{ p: 2.5 }}>
                            <Typography variant="h6">
                                Recent Activity
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Your latest task activities
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Stack spacing={2.5}>
                                {recentActivities.map((activity, index) => (
                                    <Box key={activity.id}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 38,
                                                    height: 38,
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: activity.color,
                                                    backgroundColor: `${activity.color}18`,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {activity.icon}
                                            </Box>

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                >
                                                    {activity.title}
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {activity.description}
                                                </Typography>
                                            </Box>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ whiteSpace: "nowrap" }}
                                            >
                                                {activity.time}
                                            </Typography>
                                        </Box>

                                        {index !== recentActivities.length - 1 && (
                                            <Divider sx={{ mt: 2 }} />
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;