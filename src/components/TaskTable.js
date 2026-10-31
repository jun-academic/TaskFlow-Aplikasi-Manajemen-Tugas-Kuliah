import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Tooltip,
    Typography,
    Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function getStatusColor(status) {
    switch (status) {
        case "Completed":
            return "success";
        case "In Progress":
            return "info";
        case "To Do":
            return "warning";
        default:
            return "default";
    }
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

function formatDate(dateString) {
    if (!dateString) return "-";

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

function TaskTable({ tasks, onEdit, onDelete }) {
    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                overflowX: "auto",
            }}
        >
            <Table sx={{ minWidth: 750 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                hover
                            >
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
                                        {task.title}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {task.course}
                                </TableCell>

                                <TableCell>
                                    {formatDate(task.dueDate)}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={task.priority}
                                        color={getPriorityColor(task.priority)}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={task.status}
                                        color={getStatusColor(task.status)}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="Edit task">
                                        <IconButton
                                            color="primary"
                                            aria-label={`Edit ${task.title}`}
                                            onClick={() => onEdit(task)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete task">
                                        <IconButton
                                            color="error"
                                            aria-label={`Delete ${task.title}`}
                                            onClick={() => onDelete(task)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                align="center"
                                sx={{ py: 5 }}
                            >
                                <Box>
                                    <Typography fontWeight={600}>
                                        No tasks found
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Try changing your search or filters.
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TaskTable;