import { useMemo, useState } from "react";

import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Paper,
  InputAdornment,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

function TaskManagement() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Membuka form tambah tugas
  const handleAddClick = () => {
    setSelectedTask(null);
    setFormOpen(true);
  };

  // Membuka form edit tugas
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  // Menyimpan tugas baru atau perubahan tugas
  const handleFormSubmit = (formData) => {
    if (selectedTask) {
      updateTask(selectedTask.id, formData);
    } else {
      addTask(formData);
    }

    setFormOpen(false);
    setSelectedTask(null);
  };

  // Membuka dialog hapus
  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteOpen(true);
  };

  // Mengonfirmasi penghapusan
  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
    }

    setDeleteOpen(false);
    setTaskToDelete(null);
  };

  // Menutup dialog hapus
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setTaskToDelete(null);
  };

  // Pencarian dan filter
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.course.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  return (
    <Box>
      {/* Page Heading */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            Task Management
          </Typography>

          <Typography color="text.secondary">
            Manage and organize your college assignments.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Task
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search task or course..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              size="small"
              label="Filter Status"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">
                In Progress
              </MenuItem>
              <MenuItem value="Completed">
                Completed
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              size="small"
              label="Filter Priority"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              <MenuItem value="All">All Priorities</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Task List */}
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            All Tasks
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {filteredTasks.length} of {tasks.length} tasks
          </Typography>
        </Stack>
      </Box>

      <TaskTable
        tasks={filteredTasks}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add and Edit Dialog */}
      <TaskForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleFormSubmit}
        task={selectedTask}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        task={taskToDelete}
      />
    </Box>
  );
}

export default TaskManagement;