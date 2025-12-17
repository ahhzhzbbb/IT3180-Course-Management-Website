import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

import callGetAllCourse from "../../api/crud_course/call-get-all-courses";
import callGetCourseDetail from "../../api/crud_course/call-get-course-detail";

export default function FormAdd({ type, titleOfAllert, courseId=null, open, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("Open state changed:", open);
    if (open) {
      if (type === "insert") {
        setTitle("");
        setDescription("");
      }
      if (type === "update") {
        if (titleOfAllert === "Chỉnh sửa khoá học") {
          // Lấy chi tiết khoá học
          const fetchCourseDetail = async () => { 
            const data = await callGetCourseDetail(courseId);
            setTitle(data.title || "");
            setDescription(data.description || "");
          };
          fetchCourseDetail();
        }
        if (titleOfAllert === "Chỉnh sửa chương") {
          
        }
      }
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title: title.trim(), description: description.trim() });
    onClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{titleOfAllert}</DialogTitle>
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
          <Button type="submit" variant="contained">Lưu</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}