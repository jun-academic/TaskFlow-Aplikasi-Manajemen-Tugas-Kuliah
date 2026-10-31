import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from "@mui/material";

function DeleteConfirmDialog({
    open,
    onClose,
    onConfirm,
    task,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Delete Task?</DialogTitle>

            <DialogContent>
                <Typography color="text.secondary">
                    Are you sure you want to delete
                    {" "}
                    <strong>{task?.title}</strong>?
                    This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    color="inherit"
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmDialog;