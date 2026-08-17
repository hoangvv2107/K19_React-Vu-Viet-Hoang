import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
} from "@mui/material";

// === Import CKEditor ===
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  List,
  Heading,
  Link,
  Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

// === Import Icons ===
import SendIcon from "@mui/icons-material/Send";
import SaveAsIcon from "@mui/icons-material/SaveAs";

const PostJob = () => {
  // State lưu trữ nội dung của CKEditor
  const [jobDescription, setJobDescription] = useState(
    "<h4>1. Mô tả công việc</h4><p>...</p><h4>2. Yêu cầu ứng viên</h4><p>...</p><h4>3. Quyền lợi</h4><p>...</p>",
  );

  return (
    <Box sx={{ bgcolor: "#f4f5f5", minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px", // Form đăng tin thường để chiều rộng vừa phải để dễ đọc
          margin: "0 auto",
          px: "15px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#212f3f", mb: 3 }}
        >
          Tạo tin tuyển dụng mới
        </Typography>

        <Box
          sx={{
            bgcolor: "#fff",
            p: 4,
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* ================= PHẦN 1: THÔNG TIN CHUNG ================= */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#00b14f", mb: 2 }}
          >
            1. Thông tin chung
          </Typography>

          <Grid container spacing={3}>
            {/* Tiêu đề công việc - Chiếm trọn 1 dòng (12 cột) */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tiêu đề công việc"
                placeholder="VD: Lập trình viên ReactJS (Mid/Senior)"
                variant="outlined"
              />
            </Grid>

            {/* Các trường ngắn - Mỗi trường chiếm nửa dòng (6 cột) */}
            <Grid item xs={12} md={6}>
              <TextField fullWidth select label="Ngành nghề" defaultValue="it">
                <MenuItem value="it">IT - Phần mềm</MenuItem>
                <MenuItem value="marketing">Marketing / Truyền thông</MenuItem>
                <MenuItem value="sales">Kinh doanh / Bán hàng</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Cấp bậc"
                defaultValue="nhanvien"
              >
                <MenuItem value="thuctapsinh">Thực tập sinh</MenuItem>
                <MenuItem value="nhanvien">Nhân viên</MenuItem>
                <MenuItem value="truongphong">Trưởng phòng</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mức lương"
                placeholder="VD: 10 - 15 triệu"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Địa điểm làm việc"
                placeholder="VD: Tòa nhà A, Quận B, Hà Nội"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* ================= PHẦN 2: CHI TIẾT CÔNG VIỆC (DÙNG CKEDITOR) ================= */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#00b14f", mb: 2 }}
          >
            2. Chi tiết công việc
          </Typography>

          <Box
            sx={{
              // CSS ép chiều cao tối thiểu cho khung soạn thảo để dễ nhìn
              "& .ck-editor__editable": {
                minHeight: "300px",
                fontSize: "15px",
                color: "#212f3f",
              },
            }}
          >
            <CKEditor
              editor={ClassicEditor} // Đổi thành ClassicEditor
              config={{
                licenseKey: "GPL",
                plugins: [
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  List,
                  Heading,
                  Link,
                  Alignment,
                ],
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "alignment",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={jobDescription}
              onChange={(event, editor) => {
                const data = editor.getData();
                setJobDescription(data);
              }}
            />
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* ================= PHẦN 3: NÚT BẤM HÀNH ĐỘNG ================= */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<SaveAsIcon />}
              sx={{
                color: "#4b5563",
                borderColor: "#e5e7eb",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#f4f5f5", borderColor: "#e5e7eb" },
              }}
            >
              Lưu nháp
            </Button>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              sx={{
                bgcolor: "#00b14f",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                "&:hover": { bgcolor: "#009944" },
              }}
            >
              Đăng tin tuyển dụng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostJob;
