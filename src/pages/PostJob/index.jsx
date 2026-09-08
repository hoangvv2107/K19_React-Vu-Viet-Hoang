import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
  FormControlLabel,
  Switch,
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

// === Import Plugin Axios & Navigation ===
import api from "../../plugins/axios";
import { useNavigate } from "react-router";
import NotificationDialog from "../../components/NotificationDialog";

const PostJob = () => {
  const navigate = useNavigate();

  // Khởi tạo state dữ liệu khớp 100% với API Schema yêu cầu
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    specialty: "",
    job_type: "FULL_TIME",
    experience_level: "Nhân viên",
    gender: "OTHER",
    quantity: 1,
    salary: {
      type: "RANGE",
      min: 10000000,
      max: 20000000,
      currency: "VND",
      is_negotiable: false,
    },
    work_location: [
      {
        city_id: 1,
        city_name: "Hà Nội",
        address_detail: "",
      },
    ],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    is_hot: false,
    description_html:
      "<h4>1. Mô tả công việc</h4><p>Nhập chi tiết mô tả...</p>",
    requirements_html:
      "<h4>2. Yêu cầu ứng viên</h4><p>Nhập chi tiết yêu cầu...</p>",
    benefits_html: "<h4>3. Quyền lợi</h4><p>Nhập chi tiết quyền lợi...</p>",
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);

  // Xử lý thay đổi các trường thông tin chung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý thay đổi cấu hình lương
  const handleSalaryChange = (field, value) => {
    setFormData({
      ...formData,
      salary: {
        ...formData.salary,
        [field]: value,
      },
    });
  };

  // Xử lý địa chỉ chi tiết
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      work_location: [
        {
          ...formData.work_location[0],
          address_detail: value,
        },
      ],
    });
  };

  // Gửi request lên API
  const handlePostJob = async () => {
    try {
      await api.post("/api/v1/employer/jobs", formData);
      setIsSuccessPopup(true);
      setPopupMessage("Đăng tin tuyển dụng thành công!");
      setOpenPopup(true);
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg ||
        error.response?.data?.message ||
        "Có lỗi xảy ra khi tạo tin tuyển dụng. Vui lòng kiểm tra lại.";
      setIsSuccessPopup(false);
      setPopupMessage(errorMsg);
      setOpenPopup(true);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    if (isSuccessPopup) {
      navigate("/");
    }
  };

  return (
    <Box sx={{ bgcolor: "#f4f5f5", minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
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
            {/* Tiêu đề công việc */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Tiêu đề công việc *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: Lập trình viên ReactJS (Mid/Senior)"
              />
            </Grid>

            {/* Ngành nghề */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Ngành nghề"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="Công nghệ thông tin">IT - Phần mềm</MenuItem>
                <MenuItem value="Marketing / Truyền thông">
                  Marketing / Truyền thông
                </MenuItem>
                <MenuItem value="Kinh doanh / Bán hàng">
                  Kinh doanh / Bán hàng
                </MenuItem>
              </TextField>
            </Grid>

            {/* Chuyên ngành */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Chuyên ngành"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                placeholder="VD: Lập trình Frontend"
              />
            </Grid>

            {/* Cấp bậc */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Cấp bậc"
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
              >
                <MenuItem value="Thực tập sinh">Thực tập sinh</MenuItem>
                <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                <MenuItem value="Trưởng phòng">Trưởng phòng</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </TextField>
            </Grid>

            {/* Hình thức làm việc */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Hình thức làm việc"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
              >
                <MenuItem value="FULL_TIME">Toàn thời gian</MenuItem>
                <MenuItem value="PART_TIME">Bán thời gian</MenuItem>
                <MenuItem value="REMOTE">Làm từ xa</MenuItem>
              </TextField>
            </Grid>

            {/* Giới tính yêu cầu */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Yêu cầu giới tính"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="MALE">Nam</MenuItem>
                <MenuItem value="FEMALE">Nữ</MenuItem>
                <MenuItem value="OTHER">Không yêu cầu</MenuItem>
              </TextField>
            </Grid>

            {/* Số lượng tuyển */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Số lượng tuyển"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Grid>

            {/* Loại lương: RANGE hoặc AGREEMENT */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Hình thức trả lương"
                value={formData.salary.type}
                onChange={(e) => handleSalaryChange("type", e.target.value)}
              >
                <MenuItem value="RANGE">Khoảng giá (Range)</MenuItem>
                <MenuItem value="AGREEMENT">Thoả thuận</MenuItem>
              </TextField>
            </Grid>

            {/* Nếu là RANGE thì hiện Min - Max */}
            {formData.salary.type === "RANGE" && (
              <>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Lương tối thiểu (VND)"
                    value={formData.salary.min}
                    onChange={(e) =>
                      handleSalaryChange("min", Number(e.target.value))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Lương tối đa (VND)"
                    value={formData.salary.max}
                    onChange={(e) =>
                      handleSalaryChange("max", Number(e.target.value))
                    }
                  />
                </Grid>
              </>
            )}

            {/* Địa chỉ chi tiết */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Địa chỉ chi tiết làm việc"
                placeholder="VD: Tòa nhà A, Số 47 Nguyễn Tuân, Hà Nội"
                value={formData.work_location[0].address_detail}
                onChange={handleLocationChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* ================= PHẦN 2: MÔ TẢ & CHI TIẾT (CKEDITOR) ================= */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#00b14f", mb: 2 }}
          >
            2. Chi tiết mô tả công việc
          </Typography>
          <Box sx={{ mb: 3, "& .ck-editor__editable": { minHeight: "200px" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Mô tả công việc
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.description_html}
              onChange={(event, editor) => {
                setFormData({
                  ...formData,
                  description_html: editor.getData(),
                });
              }}
            />
          </Box>

          <Box sx={{ mb: 3, "& .ck-editor__editable": { minHeight: "200px" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Yêu cầu ứng viên
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.requirements_html}
              onChange={(event, editor) => {
                setFormData({
                  ...formData,
                  requirements_html: editor.getData(),
                });
              }}
            />
          </Box>

          <Box sx={{ mb: 3, "& .ck-editor__editable": { minHeight: "200px" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Quyền lợi được hưởng
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              data={formData.benefits_html}
              onChange={(event, editor) => {
                setFormData({ ...formData, benefits_html: editor.getData() });
              }}
            />
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* ================= PHẦN 3: HÀNH ĐỘNG ================= */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<SaveAsIcon />}
              sx={{
                color: "#4b5563",
                borderColor: "#e5e7eb",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Lưu nháp
            </Button>
            <Button
              variant="contained"
              onClick={handlePostJob}
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

      <NotificationDialog
        open={openPopup}
        onClose={handleClosePopup}
        message={popupMessage}
        isSuccess={isSuccessPopup}
      />
    </Box>
  );
};

export default PostJob;
