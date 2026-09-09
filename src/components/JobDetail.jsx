import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Stack,
  Chip,
  Grid,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

// === Import Icons ===
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";

import api from "../plugins/axios";
import NotificationDialog from "./NotificationDialog";

const JobDetail = ({ jobData, isLoading }) => {
  const navigate = useNavigate();

  // --- STATE QUẢN LÝ POPUP ỨNG TUYỂN ---
  const [openApply, setOpenApply] = useState(false);
  const [applyForm, setApplyForm] = useState({
    cv_id: "",
    cover_letter: "",
  });

  // --- STATE QUẢN LÝ THÔNG BÁO (NOTIFICATION DIALOG) ---
  const [openDialog, setOpenDialog] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [redirectAfterClose, setRedirectAfterClose] = useState(""); // Lưu URL cần chuyển hướng sau khi đóng thông báo

  // Đóng Dialog thông báo
  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (redirectAfterClose) {
      navigate(redirectAfterClose);
      setRedirectAfterClose(""); // Reset
    }
  };

  const mockMyCVs = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "CV_LapTrinhVien_NguyenVanA.pdf",
    },
    {
      id: "12345678-1234-1234-1234-1234567890ab",
      name: "CV_TiengAnh_Thang9.pdf",
    },
  ];

  // --- LOGIC XỬ LÝ ỨNG TUYỂN ---
  const handleOpenApply = () => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (!token) {
      setPopupMessage("Bạn cần đăng nhập để ứng tuyển công việc này!");
      setIsSuccessPopup(false);
      setRedirectAfterClose("/login"); // Nhớ url để lát đóng thông báo thì chuyển sang login
      setOpenDialog(true);
      return;
    }

    if (role === "EMPLOYER") {
      setPopupMessage(
        "Tài khoản Nhà tuyển dụng không thể ứng tuyển công việc!",
      );
      setIsSuccessPopup(false);
      setOpenDialog(true);
      return;
    }

    setOpenApply(true);
  };

  const handleCloseApply = () => {
    setOpenApply(false);
    setApplyForm({ cv_id: "", cover_letter: "" });
  };

  const submitApply = async () => {
    if (!applyForm.cv_id) {
      setPopupMessage("Vui lòng chọn CV để ứng tuyển!");
      setIsSuccessPopup(false);
      setOpenDialog(true);
      return;
    }

    try {
      await api.post(`/api/v1/jobs/${jobData.id}/apply`, applyForm);
      handleCloseApply(); // Đóng modal nộp đơn trước

      setPopupMessage(
        "Ứng tuyển thành công! Nhà tuyển dụng sẽ sớm liên hệ với bạn.",
      );
      setIsSuccessPopup(true);
      setOpenDialog(true);
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg ||
        error.response?.data?.message ||
        "Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại sau.";

      setPopupMessage(errorMsg);
      setIsSuccessPopup(false);
      setOpenDialog(true);
    }
  };

  // --- Các hàm Format Dữ Liệu ---
  const formatSalary = (salaryObj) => {
    if (!salaryObj) return "Chưa cập nhật";
    if (salaryObj.type === "AGREEMENT") return "Thoả thuận";
    if (salaryObj.type === "RANGE") {
      const minM = salaryObj.min / 1000000;
      const maxM = salaryObj.max / 1000000;
      return `${minM} - ${maxM} triệu`;
    }
    return "Thoả thuận";
  };

  const formatWorkLocation = (work_location) => {
    if (!work_location || work_location.length === 0) return "Chưa cập nhật";
    return work_location.map((location) => location.city_name).join(" & ");
  };

  const formatDate = (isoString) => {
    if (!isoString) return "Chưa cập nhật";
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getJobTypeString = (type) => {
    const types = {
      FULL_TIME: "Toàn thời gian",
      PART_TIME: "Bán thời gian",
      REMOTE: "Làm từ xa",
    };
    return types[type] || type;
  };

  const getGenderString = (gender) => {
    const genders = {
      MALE: "Nam",
      FEMALE: "Nữ",
      OTHER: "Không yêu cầu",
    };
    return genders[gender] || gender;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1170px",
          margin: "0 auto",
          px: "15px",
          py: 3,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 2 }}
        />
      </Box>
    );
  }

  if (!jobData) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" color="text.secondary">
          Không tìm thấy thông tin công việc!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f4f5f5", minHeight: "100vh", py: 3 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1170px",
          margin: "0 auto",
          px: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ================= CỘT TRÁI (NỘI DUNG CHÍNH) ================= */}
          <Box sx={{ flex: 2, width: "100%" }}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "8px",
                p: 3,
                border: "1px solid #e5e7eb",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#212f3f",
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {jobData.title}
                {jobData.is_hot && (
                  <VerifiedUserIcon
                    sx={{ color: "#00b14f", fontSize: "20px" }}
                  />
                )}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <MonetizationOnOutlinedIcon sx={{ color: "#00b14f" }} />
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 700, color: "#00b14f" }}
                >
                  {formatSalary(jobData.salary)}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocationOnOutlinedIcon sx={{ color: "#00b14f" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Địa điểm
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {formatWorkLocation(jobData.work_location)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <WorkOutlineOutlinedIcon sx={{ color: "#00b14f" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Kinh nghiệm
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {jobData.experience_level}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AccessTimeOutlinedIcon sx={{ color: "#00b14f" }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Hạn nộp hồ sơ
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {formatDate(jobData.deadline)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Nút Ứng tuyển */}
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={handleOpenApply}
                  sx={{
                    flex: 1,
                    bgcolor: "#00b14f",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "15px",
                    py: 1.2,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#009944", boxShadow: "none" },
                  }}
                >
                  Ứng tuyển ngay
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Mô tả công việc
                  </Typography>
                </Box>
                <Box
                  dangerouslySetInnerHTML={{ __html: jobData.description_html }}
                  sx={{
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    "& ul, & ol": { pl: 3, m: 0 },
                    "& h4": { color: "#212f3f", mb: 1 },
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Yêu cầu ứng viên
                  </Typography>
                </Box>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: jobData.requirements_html,
                  }}
                  sx={{
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    "& ul, & ol": { pl: 3, m: 0 },
                    "& h4": { color: "#212f3f", mb: 1 },
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Quyền lợi
                  </Typography>
                </Box>
                <Box
                  dangerouslySetInnerHTML={{ __html: jobData.benefits_html }}
                  sx={{
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    "& ul, & ol": { pl: 3, m: 0 },
                    "& h4": { color: "#212f3f", mb: 1 },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Địa điểm làm việc
                  </Typography>
                </Box>
                {jobData.work_location?.map((loc, index) => (
                  <Typography
                    key={index}
                    sx={{ color: "#4b5563", fontSize: "15px", pl: 1, mb: 0.5 }}
                  >
                    - {loc.city_name}: {loc.address_detail}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ================= CỘT PHẢI (SIDEBAR) ================= */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  p: 2.5,
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Avatar
                    variant="square"
                    src={jobData.company?.logo_url}
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "4px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#212f3f",
                        mb: 0.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {jobData.company?.company_name}
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, color: "#7f878f" }}>
                    <PeopleAltOutlinedIcon fontSize="small" />
                    <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
                      <strong>Quy mô:</strong>{" "}
                      {jobData.company?.company_size || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, color: "#7f878f" }}>
                    <BusinessOutlinedIcon fontSize="small" />
                    <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
                      <strong>Lĩnh vực:</strong>{" "}
                      {jobData.company?.category || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, color: "#7f878f" }}>
                    <LocationOnOutlinedIcon fontSize="small" />
                    <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
                      <strong>Địa điểm:</strong>{" "}
                      {jobData.company?.headquarters_address || "Chưa cập nhật"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  p: 2.5,
                  border: "1px solid #e5e7eb",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#212f3f",
                    mb: 2,
                  }}
                >
                  Thông tin chung
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      <LayersOutlinedIcon
                        sx={{ color: "#00b14f", fontSize: "18px" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Cấp bậc
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {jobData.experience_level}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      <WorkOutlineOutlinedIcon
                        sx={{ color: "#00b14f", fontSize: "18px" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Kinh nghiệm
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {jobData.experience_level}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      <PeopleAltOutlinedIcon
                        sx={{ color: "#00b14f", fontSize: "18px" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Số lượng tuyển
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {jobData.quantity} người
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      <BusinessOutlinedIcon
                        sx={{ color: "#00b14f", fontSize: "18px" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Hình thức làm việc
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {getJobTypeString(jobData.job_type)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "#f4f5f5",
                        borderRadius: "50%",
                        display: "flex",
                      }}
                    >
                      <WcOutlinedIcon
                        sx={{ color: "#00b14f", fontSize: "18px" }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
                        Giới tính
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {getGenderString(jobData.gender)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  p: 2.5,
                  border: "1px solid #e5e7eb",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#212f3f",
                    mb: 2,
                  }}
                >
                  Danh mục nghề liên quan
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {jobData.category && (
                    <Chip
                      label={jobData.category}
                      sx={{
                        bgcolor: "#f4f5f5",
                        color: "#4b5563",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                  {jobData.specialty && (
                    <Chip
                      label={jobData.specialty}
                      sx={{
                        bgcolor: "#f4f5f5",
                        color: "#4b5563",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ================= DIALOG / POPUP ỨNG TUYỂN ================= */}
      <Dialog
        open={openApply}
        onClose={handleCloseApply}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#212f3f",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          Ứng tuyển: {jobData?.title}
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ mb: 1, color: "#212f3f" }}
            >
              Chọn CV của bạn *
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={applyForm.cv_id}
              onChange={(e) =>
                setApplyForm({ ...applyForm, cv_id: e.target.value })
              }
            >
              <MenuItem value="" disabled>
                -- Vui lòng chọn CV --
              </MenuItem>
              {mockMyCVs.map((cv) => (
                <MenuItem key={cv.id} value={cv.id}>
                  {cv.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ mb: 1, color: "#212f3f" }}
            >
              Thư giới thiệu (Cover Letter)
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Nhập lời chào và giới thiệu ngắn gọn điểm mạnh của bạn (Không bắt buộc)..."
              value={applyForm.cover_letter}
              onChange={(e) =>
                setApplyForm({ ...applyForm, cover_letter: e.target.value })
              }
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: "1px solid #e5e7eb" }}>
          <Button
            onClick={handleCloseApply}
            sx={{ color: "#7f878f", fontWeight: 600 }}
          >
            Hủy
          </Button>
          <Button
            onClick={submitApply}
            variant="contained"
            sx={{
              bgcolor: "#00b14f",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { bgcolor: "#009944", boxShadow: "none" },
            }}
          >
            Nộp hồ sơ
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= NOTIFICATION DIALOG ================= */}
      <NotificationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        message={popupMessage}
        isSuccess={isSuccessPopup}
      />
    </Box>
  );
};

export default JobDetail;
