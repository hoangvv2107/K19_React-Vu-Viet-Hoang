import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Stack,
  Chip,
  Grid,
  Link,
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

const JobDetail = () => {
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
        {/* === SỬ DỤNG FLEXBOX THAY CHO GRID ĐỂ CHIA 2 CỘT === */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ================= CỘT TRÁI (NỘI DUNG CHÍNH - CHIẾM 2 PHẦN) ================= */}
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
              {/* --- Header: Tên Job & Lương --- */}
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
                Nhân Viên Kinh Doanh B2B
                <VerifiedUserIcon sx={{ color: "#00b14f", fontSize: "20px" }} />
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <MonetizationOnOutlinedIcon sx={{ color: "#00b14f" }} />
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 700, color: "#00b14f" }}
                >
                  12 - 20 triệu
                </Typography>
              </Box>

              {/* --- Meta Info --- */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid xs={4}>
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
                        Hồ Chí Minh
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={4}>
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
                        1 năm
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={4}>
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
                        05/09/2026
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* --- Nút Ứng tuyển & Lưu tin --- */}
              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
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
                <Button
                  variant="outlined"
                  startIcon={<FavoriteBorderIcon />}
                  sx={{
                    color: "#00b14f",
                    borderColor: "#00b14f",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    "&:hover": { borderColor: "#009944", bgcolor: "#f7fffb" },
                  }}
                >
                  Lưu tin
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* --- Chi tiết: Mô tả công việc --- */}
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
                  component="ul"
                  sx={{
                    pl: 3,
                    m: 0,
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                >
                  <li>
                    Chăm sóc khách hàng cũ và phát triển hệ thống khách hàng mới
                    trong khu vực chủ yếu kênh nhà hàng, khách sạn, resort,
                    coffee, bakery shop...
                  </li>
                  <li>Xử lí phản hồi thông tin từ khách hàng và thị trường.</li>
                  <li>Đàm phán, đề xuất các chương trình khuyến mại.</li>
                  <li>
                    Theo dõi xuất, nhập, tồn, phân tích, đánh giá và kiểm soát
                    lượng hàng tồn, hàng nhập theo tuần tháng.
                  </li>
                </Box>
              </Box>

              {/* --- Chi tiết: Yêu cầu ứng viên --- */}
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
                  component="ul"
                  sx={{
                    pl: 3,
                    m: 0,
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                >
                  <li>
                    Có thể đi thị trường để gặp khách hàng trực tiếp (B khách
                    hàng/ngày cho vị trí Kinh doanh).
                  </li>
                  <li>Ngoại hình sáng, phong cách ăn mặc lịch sự, gọn gàng.</li>
                  <li>
                    Không yêu cầu ngoại ngữ, tuy nhiên giao tiếp Tiếng Anh tốt
                    là lợi thế.
                  </li>
                  <li>Có kinh nghiệm bán hàng ít nhất 1 năm.</li>
                </Box>
              </Box>

              {/* --- Chi tiết: Quyền lợi --- */}
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
                  component="ul"
                  sx={{
                    pl: 3,
                    m: 0,
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                >
                  <li>Thu nhập khi đạt 100% KPI: 12 - 20 triệu VNĐ.</li>
                  <li>Review lương vào tháng 3 hàng năm.</li>
                  <li>Thưởng lương tháng 13 và thưởng cuối năm.</li>
                  <li>Thưởng các ngày lễ, Tết, hiếu hỉ, sinh nhật.</li>
                </Box>
              </Box>

              {/* --- Chi tiết: Địa điểm làm việc --- */}
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
                <Typography sx={{ color: "#4b5563", fontSize: "15px", pl: 1 }}>
                  - Hồ Chí Minh: Tòa nhà Dali, 24C Phan Đăng Lưu, Phường 6, Quận
                  Bình Thạnh.
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* ================= HẾT CỘT TRÁI ================= */}

          {/* ================= CỘT PHẢI (SIDEBAR - CHIẾM 1 PHẦN) ================= */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* 1. Card thông tin Công ty */}
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
                    src="https://via.placeholder.com/64"
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
                      GOOD FOOD CO., LTD
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, color: "#7f878f" }}>
                    <PeopleAltOutlinedIcon fontSize="small" />
                    <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
                      <strong>Quy mô:</strong> 25-99 nhân viên
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, color: "#7f878f" }}>
                    <BusinessOutlinedIcon fontSize="small" />
                    <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
                      <strong>Lĩnh vực:</strong> Bán lẻ - Hàng tiêu dùng - FMCG
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, color: "#7f878f" }}>
                    <LocationOnOutlinedIcon fontSize="small" />
                    <Typography sx={{ fontSize: "13px", color: "#4b5563" }}>
                      <strong>Địa điểm:</strong> Tháp A1, Sarica, Khu đô thị
                      Sala, Quận 2, TP.HCM
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  component="a"
                  href="#"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#00b14f",
                    fontWeight: 600,
                    textDecoration: "none",
                    p: 1,
                    border: "1px solid #00b14f",
                    borderRadius: "4px",
                    "&:hover": { bgcolor: "#f7fffb" },
                  }}
                >
                  <Link
                    href="/company-detail"
                    underline="none"
                    sx={{ color: "inherit" }}
                  >
                    Xem trang công ty
                  </Link>
                </Typography>
              </Box>

              {/* 2. Card thông tin chung */}
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
                        Nhân viên
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
                        1 năm
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
                        5 người
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
                        Toàn thời gian
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
                        Không yêu cầu
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              {/* 3. Danh mục nghề liên quan */}
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
                  <Chip
                    label="Kinh doanh / Bán hàng"
                    sx={{
                      bgcolor: "#f4f5f5",
                      color: "#4b5563",
                      borderRadius: "4px",
                    }}
                  />
                  <Chip
                    label="Bán lẻ / Hàng tiêu dùng"
                    sx={{
                      bgcolor: "#f4f5f5",
                      color: "#4b5563",
                      borderRadius: "4px",
                    }}
                  />
                  <Chip
                    label="B2B Sales"
                    sx={{
                      bgcolor: "#f4f5f5",
                      color: "#4b5563",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* ================= HẾT CỘT PHẢI ================= */}
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetail;
