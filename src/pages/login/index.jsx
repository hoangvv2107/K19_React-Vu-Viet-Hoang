import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logoTopCV from "../../assets/topcv-logo-login.webp";
import styles from "./index.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className={styles.login_wrapper}>
      <Box
        className={styles.login_container}
        // Responsive width: mobile dùng full 100%, từ màn sm trở lên dùng 648px
        sx={{ width: { xs: "100%", sm: "648px" }, maxWidth: "100%" }}
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
          <img src={logoTopCV} alt="logo TopCV" className={styles.logo} />
          <h2 className={styles.header_title}>Chào mừng quay trở lại</h2>
        </Link>

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

        {/* password */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 1.25 }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="body2"
              fontWeight="bold"
              component="label"
              htmlFor="password-input"
            >
              Password
            </Typography>
            <Link
              href="#"
              color="success"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Quên mật khẩu
            </Link>
          </Box>
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
            padding: "8px 12px", // Tăng xíu padding cho dễ bấm trên mobile
            mt: 1, // Thêm margin top để tách biệt với ô password
          }}
        >
          Đăng nhập <ArrowForwardIcon sx={{ fontSize: "16px" }} />
        </Button>

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
          <Typography variant="inherit">Bạn chưa có tài khoản?</Typography>
          <Link
            href="#"
            color="success"
            sx={{
              textDecoration: "none",
              fontSize: "inherit",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Đăng ký ngay
          </Link>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "11px", sm: "12px" }, // Giữ nguyên 12px cho PC, 11px cho mobile
            padding: "8px 10px",
            background: "#f2f4f5",
            borderRadius: "999px",
            mt: "16px",
            textAlign: "center", // Căn giữa nội dung khi rớt dòng
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
              display: "inline-block", // Tránh link bị cắt đôi
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
          // Responsive margin: giảm khoảng cách m trên mobile
          margin: { xs: "24px 0 16px", sm: "60px 0 24px" },
          fontSize: { xs: "12px", sm: "14px" },
          textAlign: "center",
        }}
      >
        © 2016. All Rights Reserved. TopCV Vietnam JSC.
      </Typography>
    </Box>
  );
};

export default LoginPage;
