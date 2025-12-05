import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function FormAddNewCourse({ open, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title: title.trim(), description: description.trim() });
    // onAdd should close modal; fallback:
    onClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm khóa học mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Mô tả"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Thêm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}