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

  // 1. Quản lý dữ liệu người dùng nhập
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    full_name: "",
    confirm_password: "",
  });

  // 2. Quản lý trạng thái lỗi của từng trường (true = có lỗi)
  const [errors, setErrors] = useState({
    full_name: false,
    email: false,
    password: false,
    confirm_password: false,
  });

  // 3. Quản lý lỗi điều khoản và lỗi chung
  const [isAgreement, setIsAgreement] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleClickIsAgreement = () => {
    setIsAgreement(!isAgreement);
    setAgreementError(false);
  };

  // Hàm cập nhật dữ liệu khi người dùng gõ phím
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: false });
    if (generalError) setGeneralError(false);
  };

  const handleRegister = async () => {
    // === PHẦN BẠN SẼ TỰ VIẾT LOGIC VALIDATE Ở ĐÂY ===
    // Bước 1: Tạo một object lưu trạng thái lỗi mới
    // Bước 2: Kiểm tra từng trường trong userData, nếu rỗng thì đánh dấu là true
    // Bước 3: Cập nhật state errors
    // Bước 4: Kiểm tra isAgreement, nếu chưa tích thì setAgreementError(true)
    // Bước 5: Kiểm tra xem có bất kỳ lỗi nào không. Nếu có trường rỗng, setGeneralError(true).
    // Bước 6: Nếu tất cả hợp lệ, tiến hành gọi API.
    let isOk = true;
    const newErrors = { ...errors };
    let hasEmptyField = false;

    for (const data in userData) {
      if (!Object.hasOwn(userData, data)) continue;

      const ud = userData[data];
      if (ud.trim() === "") {
        newErrors[data] = true;
        if (isOk) isOk = false;
        if (!hasEmptyField) hasEmptyField = true;
      } else newErrors[data] = false;
    }
    setErrors(newErrors);
    setGeneralError(hasEmptyField);
    if (!isAgreement) {
      setAgreementError(true);
      if (isOk) isOk = false;
    }

    if (isOk) {
      // Logic call API
      const registerData = {
        email: userData.email,
        password: userData.password,
        full_name: userData.full_name,
      };
      try {
        await api.post("/api/v1/auth/register", registerData);
      } catch (error) {
        alert("Da xay ra loi");
      }
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
        bgcolor: "#f4f5f5",
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
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
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

        {/* Họ và tên */}
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
            name="full_name" // Bắt buộc có name để handleChange hoạt động
            value={userData.full_name}
            onChange={handleChange}
            error={errors.full_name} // Đỏ viền nếu true
            placeholder="Nhập họ tên"
            id="fullname-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            sx={{
              "& .MuiInputBase-input": { fontSize: "14px", color: "#263a4d" },
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
            name="email"
            value={userData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Nhập email"
            id="email-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            sx={{
              "& .MuiInputBase-input": { fontSize: "14px", color: "#263a4d" },
            }}
          />
        </Box>

        {/* Mật khẩu */}
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
            name="password"
            value={userData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Nhập mật khẩu"
            id="password-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            type={showPassword ? "text" : "password"}
            sx={{
              "& .MuiInputBase-input": { fontSize: "14px", color: "#263a4d" },
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

        {/* Xác nhận mật khẩu */}
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
            name="confirm_password"
            value={userData.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            placeholder="Nhập lại mật khẩu"
            id="confirm-password-input"
            variant="outlined"
            fullWidth
            size="small"
            color="success"
            type={showConfirmPassword ? "text" : "password"}
            sx={{
              "& .MuiInputBase-input": { fontSize: "14px", color: "#263a4d" },
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
        <Box sx={{ mt: 1, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Checkbox
              size="small"
              id="agreement"
              color="success"
              checked={isAgreement}
              onChange={handleClickIsAgreement}
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

          {/* Cảnh báo lỗi điều khoản */}
          {agreementError && (
            <Typography
              color="error"
              variant="body2"
              sx={{ fontSize: "13px", ml: 3.5, mt: 0.5 }}
            >
              Vui lòng xác nhận điều khoản để tiếp tục
            </Typography>
          )}
        </Box>

        {/* Cảnh báo lỗi chung */}
        {generalError && (
          <Typography
            color="error"
            variant="body2"
            sx={{ fontSize: "13px", mb: 1, textAlign: "center" }}
          >
            Hãy nhập đủ thông tin
          </Typography>
        )}

        {/* Nút Submit */}
        <Button
          onClick={handleRegister}
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
            width: "100%",
            fontSize: "15px",
            "&:hover": { background: "#009643" },
          }}
        >
          Đăng ký <ArrowForwardIcon sx={{ fontSize: "16px" }} />
        </Button>

        {/* Các phần khác giữ nguyên... */}
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
      </Box>
    </Box>
  );
};

export default RegisterPage;
