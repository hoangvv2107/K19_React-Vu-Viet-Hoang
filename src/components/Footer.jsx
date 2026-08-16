import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// === DỮ LIỆU CÁC CỘT LINK ===
const FOOTER_LINKS = {
  col1: [
    {
      title: "Về TopCV",
      links: [
        "Giới thiệu",
        "Góc báo chí",
        "Tuyển dụng",
        "Liên hệ",
        "Hỏi đáp",
        "Chính sách quyền riêng tư",
        "Cài đặt Cookie",
        "Điều khoản dịch vụ",
      ],
    },
    {
      title: "Đối tác",
      links: ["TestCenter", "TopHR", "ViecNgay", "Happy Time"],
    },
  ],
  col2: [
    {
      title: "Hồ sơ và CV",
      links: [
        "Quản lý CV của bạn",
        "Hướng dẫn viết CV",
        "Thư viện CV theo ngành nghề",
        "Review CV",
      ],
    },
    {
      title: "Khám phá",
      links: [
        "Ứng dụng di động TopCV",
        "Tính lương Gross - Net",
        "Tính lãi suất kép",
        "Lập kế hoạch tiết kiệm",
        "Tính bảo hiểm thất nghiệp",
        "Tính bảo hiểm xã hội một lần",
        "Trắc nghiệm MBTI",
        "Trắc nghiệm MI",
      ],
    },
  ],
  col3: [
    {
      title: "Xây dựng sự nghiệp",
      links: [
        "Việc làm tốt nhất",
        "Việc làm lương cao",
        "Việc làm quản lý",
        "Việc làm IT",
        "Việc làm Senior",
        "Việc làm bán thời gian",
      ],
    },
    {
      title: "Quy tắc chung",
      links: [
        "Điều kiện giao dịch chung",
        "Giá dịch vụ & Cách thanh toán",
        "Thông tin về vận chuyển",
      ],
    },
  ],
};

// Component tiện ích để render từng nhóm link
const LinkGroup = ({ title, links }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{ fontSize: "16px", fontWeight: 700, color: "#212f3f", mb: 2 }}
    >
      {title}
    </Typography>
    <Stack spacing={1.5}>
      {links.map((link, index) => (
        <Typography
          key={index}
          component="a"
          href="#"
          sx={{
            fontSize: "14px",
            color: "#4b5563",
            textDecoration: "none",
            "&:hover": { color: "#00b14f" },
          }}
        >
          {link}
        </Typography>
      ))}
    </Stack>
  </Box>
);

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#fff", pt: 6, pb: 3, borderTop: "1px solid #e5e7eb" }}>
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", px: 2 }}>
        {/* ================= PHẦN 1: UPPER FOOTER (4 CỘT) ================= */}
        <Grid container spacing={4}>
          {/* Cột 1: Thông tin liên hệ & App */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#00b14f",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                }}
              >
                topcv
                <Typography
                  component="span"
                  sx={{ fontSize: "12px", verticalAlign: "top" }}
                >
                  ®
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#4b5563",
                  mt: 1,
                }}
              >
                Tiếp lợi thế, nối thành công
              </Typography>
            </Box>

            <Box sx={{ mt: 4, mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#212f3f",
                  mb: 1.5,
                }}
              >
                Liên hệ
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563", mb: 0.5 }}>
                Hotline:{" "}
                <strong>1900 068 889 | Nhánh 2 (Giờ hành chính)</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563", mb: 0.5 }}>
                Email: <strong>hotro@topcv.vn</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563", mb: 0.5 }}>
                Zalo hỗ trợ ứng viên: <strong>Kết nối ngay →</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563", mb: 0.5 }}>
                Fanpage: <strong>TopCV Vietnam</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563", mb: 0.5 }}>
                LinkedIn: <strong>TopCV Vietnam</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563", mb: 0.5 }}>
                Thread: <strong>TopCV Vietnam</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
                Tiktok: <strong>TopCV Vietnam</strong>
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#212f3f",
                  mb: 1.5,
                }}
              >
                Ứng dụng tải xuống
              </Typography>
              <Stack direction="row" spacing={1}>
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  height={36}
                  sx={{ cursor: "pointer" }}
                />
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  height={36}
                  sx={{ cursor: "pointer" }}
                />
              </Stack>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#212f3f",
                  mb: 1,
                }}
              >
                Cộng đồng TopCV
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#6b7280",
                    color: "#fff",
                    "&:hover": { bgcolor: "#4b5563" },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#6b7280",
                    color: "#fff",
                    "&:hover": { bgcolor: "#4b5563" },
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#6b7280",
                    color: "#fff",
                    "&:hover": { bgcolor: "#4b5563" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Cột 2 */}
          <Grid item xs={12} md={2.5}>
            {FOOTER_LINKS.col1.map((group, idx) => (
              <LinkGroup key={idx} {...group} />
            ))}
          </Grid>

          {/* Cột 3 */}
          <Grid item xs={12} md={2.5}>
            {FOOTER_LINKS.col2.map((group, idx) => (
              <LinkGroup key={idx} {...group} />
            ))}
          </Grid>

          {/* Cột 4 */}
          <Grid item xs={12} md={3}>
            {FOOTER_LINKS.col3.map((group, idx) => (
              <LinkGroup key={idx} {...group} />
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#e5e7eb" }} />

        {/* ================= PHẦN 2: LOWER FOOTER ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#212f3f", mb: 2 }}
            >
              Công ty Cổ phần TopCV Việt Nam
            </Typography>

            <Stack spacing={1.5} sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <ReceiptLongIcon
                  sx={{ color: "#00b14f", fontSize: "18px", mt: 0.2 }}
                />
                <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
                  Giấy phép đăng ký kinh doanh số: <strong>0107307178</strong>{" "}
                  cấp ngày 21/01/2016, thay đổi lần thứ 17 ngày 03/04/2025 tại
                  Sở Kế hoạch và Đầu tư Thành phố Hà Nội
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <ReceiptLongIcon
                  sx={{ color: "#00b14f", fontSize: "18px", mt: 0.2 }}
                />
                <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
                  Giấy phép hoạt động dịch vụ việc làm số:{" "}
                  <strong>44/2024/SLĐTBXH-GP</strong>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOnIcon
                  sx={{ color: "#00b14f", fontSize: "18px", mt: 0.2 }}
                />
                <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
                  Trụ sở HN:{" "}
                  <strong>
                    Tòa FS - GoldSeason số 47 Nguyễn Tuân, Phường Thanh Xuân
                    Trung, Quận Thanh Xuân, Hà Nội
                  </strong>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOnIcon
                  sx={{ color: "#00b14f", fontSize: "18px", mt: 0.2 }}
                />
                <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
                  Chi nhánh HCM:{" "}
                  <strong>
                    Tòa nhà Dali, 24C Phan Đăng Lưu, Phường 6, Quận Bình Thạnh,
                    TP HCM
                  </strong>
                </Typography>
              </Box>
            </Stack>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#212f3f",
                mb: 2,
              }}
            >
              Hệ sinh thái HR Tech của TopCV
            </Typography>

            {/* Hệ sinh thái Buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    bgcolor: "#0d3b38",
                    color: "#fff",
                    p: 1.5,
                    borderRadius: "8px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    Nền tảng công nghệ tuyển dụng thông minh TopCV.vn
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    bgcolor: "#f58220",
                    color: "#fff",
                    p: 1.5,
                    borderRadius: "8px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    Nền tảng quản lý & gia tăng trải nghiệm nhân viên
                    HappyTime.vn
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    bgcolor: "#1952a2",
                    color: "#fff",
                    p: 1.5,
                    borderRadius: "8px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    Nền tảng thiết lập và đánh giá năng lực nhân viên
                    TestCenter.vn
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    bgcolor: "#00b14f",
                    color: "#fff",
                    p: 1.5,
                    borderRadius: "8px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    Giải pháp quản trị tuyển dụng hiệu suất cao SHiring.ai
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* QR Code */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "120px",
            }}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              sx={{
                width: 100,
                height: 100,
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                p: 0.5,
                mb: 1,
              }}
            />
            <Typography
              sx={{ fontSize: "12px", color: "#00b14f", fontWeight: 600 }}
            >
              topcv.com.vn
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography sx={{ fontSize: "13px", color: "#7f878f" }}>
            © 2014-2026 TopCV Vietnam JSC. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
