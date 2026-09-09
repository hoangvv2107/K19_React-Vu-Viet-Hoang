import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  TextField,
  Grid,
  Paper,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleOutline from "@mui/icons-material/AddCircle";
import DeleteOutline from "@mui/icons-material/Delete";

import Header from "../../components/Header";
import api from "../../plugins/axios";
import NotificationDialog from "../../components/NotificationDialog";

const CreateCV = () => {
  const navigate = useNavigate();

  // --- 1. STATE CẤU TRÚC DỮ LIỆU KHỚP VỚI API BACKEND ---
  const [cvData, setCvData] = useState({
    full_name: "",
    phone: "",
    email: "",
    summary: "",
    education: [{ school_name: "", major: "", duration: "" }],
    experience: [{ company_name: "", position: "", description: "" }],
    skills: [""],
  });

  // --- STATE QUẢN LÝ THÔNG BÁO ---
  const [openDialog, setOpenDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // --- XỬ LÝ THAY ĐỔI DỮ LIỆU CƠ BẢN ---
  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  // --- XỬ LÝ MẢNG HỌC VẤN (EDUCATION) ---
  const handleEduChange = (index, field, value) => {
    const newEdu = [...cvData.education];
    newEdu[index][field] = value;
    setCvData({ ...cvData, education: newEdu });
  };

  const handleAddEdu = () => {
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        { school_name: "", major: "", duration: "" },
      ],
    });
  };

  const handleRemoveEdu = (index) => {
    const newEdu = cvData.education.filter((_, i) => i !== index);
    setCvData({ ...cvData, education: newEdu });
  };

  // --- XỬ LÝ MẢNG KINH NGHIỆM (EXPERIENCE) ---
  const handleExpChange = (index, field, value) => {
    const newExp = [...cvData.experience];
    newExp[index][field] = value;
    setCvData({ ...cvData, experience: newExp });
  };

  const handleAddExp = () => {
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        { company_name: "", position: "", description: "" },
      ],
    });
  };

  const handleRemoveExp = (index) => {
    const newExp = cvData.experience.filter((_, i) => i !== index);
    setCvData({ ...cvData, experience: newExp });
  };

  // --- XỬ LÝ MẢNG KỸ NĂNG (SKILLS) ---
  const handleSkillChange = (index, value) => {
    const newSkills = [...cvData.skills];
    newSkills[index] = value;
    setCvData({ ...cvData, skills: newSkills });
  };

  const handleAddSkill = () => {
    setCvData({ ...cvData, skills: [...cvData.skills, ""] });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = cvData.skills.filter((_, i) => i !== index);
    setCvData({ ...cvData, skills: newSkills });
  };

  // --- GỌI API LƯU CV ---
  const handleSaveCV = async () => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (!token) {
      setPopupMessage("Bạn cần đăng nhập để tạo CV!");
      setIsSuccessPopup(false);
      setOpenDialog(true);
      return;
    }

    if (role === "EMPLOYER") {
      setPopupMessage("Tài khoản Nhà tuyển dụng không thể tạo CV!");
      setIsSuccessPopup(false);
      setOpenDialog(true);
      return;
    }

    try {
      // Gửi toàn bộ cục JSON lên API POST /api/v1/candidate/cvs
      const { data } = await api.post("/api/v1/candidate/cvs", cvData);

      setPopupMessage(`Lưu CV thành công! Mã CV của bạn là: ${data.cv_id}`);
      setIsSuccessPopup(true);
      setOpenDialog(true);

      console.log("Kết quả tạo CV:", data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg ||
        error.response?.data?.message ||
        "Có lỗi xảy ra khi lưu CV!";
      setPopupMessage(errorMsg);
      setIsSuccessPopup(false);
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 72px)",
          bgcolor: "#f4f5f5",
        }}
      >
        {/* === Thanh Sub-header (Lưu, Tiêu đề) === */}
        <Box
          sx={{
            height: "60px",
            bgcolor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DescriptionIcon sx={{ color: "#00b14f" }} />
            <Typography
              sx={{ fontWeight: 600, color: "#212f3f", fontSize: "16px" }}
            >
              Tạo hồ sơ CV trực tuyến
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveCV}
            sx={{
              bgcolor: "#00b14f",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "20px",
              px: 3,
              boxShadow: "none",
              "&:hover": { bgcolor: "#009944", boxShadow: "none" },
            }}
          >
            Lưu CV
          </Button>
        </Box>

        {/* === KHU VỰC NHẬP LIỆU FORM (Giống như tờ giấy soạn thảo nằm giữa màn hình) === */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            py: 4,
            px: 2,
          }}
        >
          <Paper
            elevation={1}
            sx={{
              width: "100%",
              maxWidth: "850px",
              p: "40px",
              borderRadius: "8px",
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {/* 1. THÔNG TIN CÁ NHÂN */}
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "#00b14f", mb: 2 }}
              >
                1. Thông tin cá nhân
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Họ và tên"
                    name="full_name"
                    value={cvData.full_name}
                    onChange={handleBasicChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Số điện thoại"
                    name="phone"
                    value={cvData.phone}
                    onChange={handleBasicChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email liên hệ"
                    name="email"
                    value={cvData.email}
                    onChange={handleBasicChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    label="Mục tiêu nghề nghiệp / Giới thiệu bản thân (Summary)"
                    name="summary"
                    value={cvData.summary}
                    onChange={handleBasicChange}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* 2. HỌC VẤN (EDUCATION) */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#00b14f" }}
                >
                  2. Học vấn
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddEdu}
                  sx={{
                    color: "#00b14f",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Thêm học vấn
                </Button>
              </Box>

              {cvData.education.map((edu, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px dashed #e5e7eb",
                    borderRadius: "6px",
                    position: "relative",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Tên trường"
                        value={edu.school_name}
                        onChange={(e) =>
                          handleEduChange(index, "school_name", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Chuyên ngành"
                        value={edu.major}
                        onChange={(e) =>
                          handleEduChange(index, "major", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Thời gian (VD: 2020 - 2024)"
                        value={edu.duration}
                        onChange={(e) =>
                          handleEduChange(index, "duration", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cvData.education.length > 1 && (
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveEdu(index)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>

            <Divider />

            {/* 3. KINH NGHIỆM LÀM VIỆC (EXPERIENCE) */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#00b14f" }}
                >
                  3. Kinh nghiệm làm việc
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddExp}
                  sx={{
                    color: "#00b14f",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Thêm kinh nghiệm
                </Button>
              </Box>

              {cvData.experience.map((exp, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: "1px dashed #e5e7eb",
                    borderRadius: "6px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Tên công ty"
                        value={exp.company_name}
                        onChange={(e) =>
                          handleExpChange(index, "company_name", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Vị trí công việc"
                        value={exp.position}
                        onChange={(e) =>
                          handleExpChange(index, "position", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        size="small"
                        label="Mô tả công việc / Thành tích"
                        value={exp.description}
                        onChange={(e) =>
                          handleExpChange(index, "description", e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                  {cvData.experience.length > 1 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteOutline />}
                        onClick={() => handleRemoveExp(index)}
                      >
                        Xóa kinh nghiệm này
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            <Divider />

            {/* 4. KỸ NĂNG (SKILLS) */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: "#00b14f" }}
                >
                  4. Kỹ năng
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddSkill}
                  sx={{
                    color: "#00b14f",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Thêm kỹ năng
                </Button>
              </Box>

              <Grid container spacing={2}>
                {cvData.skills.map((skill, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="VD: ReactJS, Teamwork, Tiếng Anh..."
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                      />
                      {cvData.skills.length > 1 && (
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveSkill(index)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Thông báo kết quả */}
      <NotificationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        message={popupMessage}
        isSuccess={isSuccessPopup}
      />
    </>
  );
};

export default CreateCV;
