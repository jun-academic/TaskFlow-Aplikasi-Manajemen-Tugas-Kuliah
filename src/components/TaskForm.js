import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
} from "@mui/material";

const emptyForm = {
    title: "",
    course: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do",
};

function TaskForm({ open, onClose, onSubmit, task }) {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || "",
                course: task.course || "",
                description: task.description || "",
                dueDate: task.dueDate || "",
                priority: task.priority || "Medium",
                status: task.status || "To Do",
            });
        } else {
            setFormData(emptyForm);
        }

        setErrors({});
    }, [task, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Task title is required";
        }

        if (!formData.course.trim()) {
            newErrors.course = "Course name is required";
        }

        if (!formData.dueDate) {
            newErrors.dueDate = "Deadline is required";
        }

        if (formData.dueDate) {
            const selectedDate = new Date(
                `${formData.dueDate}T00:00:00`
            );

            if (Number.isNaN(selectedDate.getTime())) {
                newErrors.dueDate = "Invalid deadline";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({
            ...formData,
            title: formData.title.trim(),
            course: formData.course.trim(),
            description: formData.description.trim(),
        });

        setFormData(emptyForm);
        setErrors({});
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {task ? "Edit Task" : "Add New Task"}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Task Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            error={Boolean(errors.course)}
                            helperText={errors.course}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type="date"
                            label="Deadline"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            error={Boolean(errors.dueDate)}
                            helperText={errors.dueDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="To Do">To Do</MenuItem>
                            <MenuItem value="In Progress">
                                In Progress
                            </MenuItem>
                            <MenuItem value="Completed">
                                Completed
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2.5 }}>
                <Button
                    color="inherit"
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {task ? "Save Changes" : "Add Task"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskForm;