import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import logoTopCV from "../../assets/topcv-logo-login.webp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: null,
    password: null,
    full_name: null,
  });
  const [isAgreement, setIsAgreement] = useState(false);
  const handleClickIsAgreement = () => {
    setIsAgreement(!isAgreement);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = () => {
    if (!isAgreement) {
      alert(
        "Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư để tiếp tục.",
      );
      return;
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f5f5", // Nền xám nhạt toàn trang
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "648px" },
          maxWidth: "100%",
          bgcolor: "#ffffff",
          borderRadius: "12px",
          p: { xs: 3, sm: 5 },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // Đổ bóng mờ cho card
        }}
      >
        <Link
          href="#"
          sx={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            m: "auto",
            gap: "6px",
            pb: "16px",
          }}
        >
          <Box
            component="img"
            src={logoTopCV}
            alt="logo TopCV"
            sx={{ width: "140px", objectFit: "contain", mb: 1 }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#333", m: 0 }}
          >
            Đăng ký tài khoản
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, mb: 2 }}
          >
            Tạo tài khoản miễn phí, tìm kiếm hơn 60.000 việc làm.
          </Typography>
        </Link>

        {/* Họ và tên (full_name) */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 1.25 }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            component="label"
            htmlFor="fullname-input"
          >
            Họ và tên
          </Typography>
          <TextField
            placeholder="Nhập họ tên"
            id="fullname-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "14px",
                color: "#263a4d",
              },
            }}
          />
        </Box>

        {/* Email */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 1.25 }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            component="label"
            htmlFor="email-input"
          >
            Email
          </Typography>
          <TextField
            placeholder="Nhập email"
            id="email-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "14px",
                color: "#263a4d",
              },
            }}
          />
        </Box>

        {/* Mật khẩu (password) */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 1.25 }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            component="label"
            htmlFor="password-input"
          >
            Mật khẩu
          </Typography>
          <TextField
            placeholder="Nhập mật khẩu"
            id="password-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            type={showPassword ? "text" : "password"}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "14px",
                color: "#263a4d",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Xác nhận mật khẩu (UI Only - Validate trước khi submit JSON) */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 1.25 }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            component="label"
            htmlFor="confirm-password-input"
          >
            Xác nhận mật khẩu
          </Typography>
          <TextField
            placeholder="Nhập lại mật khẩu"
            id="confirm-password-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            type={showConfirmPassword ? "text" : "password"}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "14px",
                color: "#263a4d",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword}>
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Checkbox Điều khoản */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            mt: 1,
            mb: 2,
          }}
        >
          <Checkbox
            size="small"
            id="agreement"
            color="success"
            checked={isAgreement}
            onClick={handleClickIsAgreement}
            sx={{ padding: 0, mt: "2px" }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}
          >
            <label htmlFor="agreement" style={{ cursor: "pointer" }}>
              Tôi đã đọc và đồng ý với{" "}
            </label>
            <Link
              href="#"
              color="success"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link
              href="#"
              color="success"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Chính sách quyền riêng tư
            </Link>{" "}
            của TopCV (Bắt buộc)
          </Typography>
        </Box>

        {/* Nút Submit */}
        <Button
          variant="contained"
          sx={{
            borderRadius: "999px",
            background: "#00b14f",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 12px",
            mt: 1,
            width: "100%",
            fontSize: "15px",
            "&:hover": { background: "#009643" },
          }}
        >
          Đăng ký <ArrowForwardIcon sx={{ fontSize: "16px" }} />
        </Button>

        {/* Link chuyển sang Đăng nhập */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            fontSize: "14px",
            mt: "24px",
          }}
        >
          <Typography variant="inherit">Bạn đã có tài khoản?</Typography>
          <Link
            href="/login"
            color="success"
            sx={{
              textDecoration: "none",
              fontSize: "inherit",
              fontWeight: "bold",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Đăng nhập ngay
          </Link>
        </Box>

        {/* Support Box */}
        <Typography
          sx={{
            fontSize: { xs: "11px", sm: "12px" },
            padding: "8px 10px",
            background: "#f2f4f5",
            borderRadius: "999px",
            mt: "16px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Bạn gặp khó khăn khi tạo tài khoản? Vui lòng gọi tới số
          <Link
            href="tel:1900068889"
            color="success"
            sx={{
              fontSize: "inherit",
              fontWeight: "500",
              textDecoration: "none",
              mx: "4px",
              "&:hover": { textDecoration: "underline" },
              display: "inline-block",
            }}
          >
            1900 068 889 | Nhánh 2
          </Link>
          (giờ hành chính).
        </Typography>
      </Box>

      {/* Footer Text */}
      <Typography
        sx={{
          color: "#bfbfbf",
          margin: { xs: "24px 0 16px", sm: "40px 0 24px" },
          fontSize: { xs: "12px", sm: "14px" },
          textAlign: "center",
        }}
      >
        © 2016. All Rights Reserved. TopCV Vietnam JSC.
      </Typography>
    </Box>
  );
};

export default RegisterPage;
