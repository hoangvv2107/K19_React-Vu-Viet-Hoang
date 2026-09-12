import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logoTopCV from "../../assets/topcv-logo-login.webp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import api, { getApiErrorMessage } from "../../plugins/axios";
import NotificationDialog from "../../components/NotificationDialog";
import { useNavigate } from "react-router";

const EmployerRegisterPage = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State khớp 100% API + thêm confirm_password để xử lý giao diện
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    tax_code: "",
    company_name: "",
    international_name: "",
    short_name: "",
    director: "",
    headquarters_address: "",
    phone_number: "",
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isAgreement, setIsAgreement] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) setErrors({ ...errors, [name]: false });
    if (generalError) setGeneralError(false);
    if (
      passwordMatchError &&
      (name === "password" || name === "confirm_password")
    ) {
      setPasswordMatchError(false);
    }
  };

  const handleRegister = async () => {
    let isOk = true;
    const newErrors = {};
    let hasEmptyField = false;

    // Kiểm tra rỗng tất cả các trường
    for (const key in formData) {
      if (!formData[key] || formData[key].trim() === "") {
        newErrors[key] = true;
        isOk = false;
        hasEmptyField = true;
      }
    }

    // Kiểm tra mật khẩu khớp nhau
    let isPasswordMismatch = false;
    if (
      formData.password.trim() !== "" &&
      formData.confirm_password.trim() !== "" &&
      formData.password !== formData.confirm_password
    ) {
      newErrors.password = true;
      newErrors.confirm_password = true;
      isPasswordMismatch = true;
      isOk = false;
    }

    setErrors(newErrors);
    setGeneralError(hasEmptyField);
    setPasswordMatchError(isPasswordMismatch);

    // Kiểm tra điều khoản
    if (!isAgreement) {
      setAgreementError(true);
      isOk = false;
    }

    // Gửi dữ liệu lên API (loại bỏ confirm_password vì API không nhận trường này)
    if (isOk) {
      const apiData = { ...formData };
      delete apiData.confirm_password;
      try {
        await api.post("/api/v1/companies/register", apiData);
        setIsSuccessPopup(true);
        setPopupMessage("Đăng ký tài khoản nhà tuyển dụng thành công!");
        setOpenPopup(true);
      } catch (error) {
        const errorMsg = getApiErrorMessage(
          error,
          "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.",
        );
        setIsSuccessPopup(false);
        setPopupMessage(errorMsg);
        setOpenPopup(true);
      }
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    if (isSuccessPopup) {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f5f5" }}>
      {/* CỘT TRÁI: FORM ĐĂNG KÝ */}
      <Box
        sx={{
          flex: { xs: 1, md: 7 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: { xs: 2, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "680px",
            bgcolor: "#ffffff",
            borderRadius: "12px",
            p: { xs: 3, sm: 5 },
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Logo & Tiêu đề */}
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
              sx={{ fontWeight: 700, color: "#333", m: 0, textAlign: "center" }}
            >
              Đăng ký tài khoản Nhà tuyển dụng
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 2, textAlign: "center" }}
            >
              Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ
              tuyển dụng ứng dụng sâu AI.
            </Typography>
          </Link>

          {/* Form Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Email đăng nhập */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                size="small"
                fullWidth
                color="success"
              />
              <Typography
                variant="caption"
                sx={{ color: "#d32f2f", fontSize: "11px", lineHeight: 1.4 }}
              >
                Trường hợp bạn đăng ký tài khoản bằng email không phải email tên
                miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới
                hạn quyền mua hoặc sử dụng.
              </Typography>
            </Box>

            {/* Mật khẩu */}
            <TextField
              label="Mật khẩu"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              size="small"
              fullWidth
              color="success"
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

            {/* Nhập lại mật khẩu */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <TextField
                label="Nhập lại mật khẩu"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
                size="small"
                fullWidth
                color="success"
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
              {passwordMatchError && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ fontSize: "12px" }}
                >
                  Mật khẩu đang không khớp
                </Typography>
              )}
            </Box>

            {/* TIÊU ĐỀ: Thông tin nhà tuyển dụng */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#212f3f",
                mt: 1,
                mb: 0.5,
                fontSize: "16px",
              }}
            >
              Thông tin nhà tuyển dụng
            </Typography>

            {/* Tên công ty & Tên viết tắt */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Tên công ty"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                error={errors.company_name}
                size="small"
                fullWidth
                color="success"
              />
              <TextField
                label="Tên viết tắt"
                name="short_name"
                value={formData.short_name}
                onChange={handleChange}
                error={errors.short_name}
                size="small"
                fullWidth
                color="success"
              />
            </Box>

            {/* Tên quốc tế & Mã số thuế */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Tên quốc tế"
                name="international_name"
                value={formData.international_name}
                onChange={handleChange}
                error={errors.international_name}
                size="small"
                fullWidth
                color="success"
              />
              <TextField
                label="Mã số thuế"
                name="tax_code"
                value={formData.tax_code}
                onChange={handleChange}
                error={errors.tax_code}
                size="small"
                fullWidth
                color="success"
              />
            </Box>

            {/* Người đại diện pháp luật & Số điện thoại */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Người đại diện pháp luật"
                name="director"
                value={formData.director}
                onChange={handleChange}
                error={errors.director}
                size="small"
                fullWidth
                color="success"
              />
              <TextField
                label="Số điện thoại cá nhân"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                error={errors.phone_number}
                size="small"
                fullWidth
                color="success"
              />
            </Box>

            {/* Địa chỉ trụ sở chính */}
            <TextField
              label="Địa chỉ trụ sở chính"
              name="headquarters_address"
              value={formData.headquarters_address}
              onChange={handleChange}
              error={errors.headquarters_address}
              size="small"
              fullWidth
              color="success"
            />

            {/* Website công ty */}
            <TextField
              label="Website công ty"
              name="website"
              value={formData.website}
              onChange={handleChange}
              error={errors.website}
              size="small"
              fullWidth
              color="success"
            />
          </Box>

          {/* Checkbox điều khoản */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Checkbox
                size="small"
                id="agreement"
                color="success"
                checked={isAgreement}
                onChange={() => {
                  setIsAgreement(!isAgreement);
                  setAgreementError(false);
                }}
                sx={{ padding: 0, mt: "2px" }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "13px", color: "#666", lineHeight: 1.5 }}
              >
                <label htmlFor="agreement" style={{ cursor: "pointer" }}>
                  Tôi đã đọc và đồng ý với{" "}
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
                </label>
              </Typography>
            </Box>
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

          {generalError && (
            <Typography
              color="error"
              variant="body2"
              sx={{ fontSize: "13px", mb: 1, textAlign: "center" }}
            >
              Vui lòng nhập đầy đủ tất cả các trường thông tin bắt buộc
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
              py: 1.25,
              width: "100%",
              fontSize: "15px",
              fontWeight: 600,
              "&:hover": { background: "#009643" },
            }}
          >
            Hoàn tất đăng ký{" "}
            <ArrowForwardIcon sx={{ fontSize: "16px", ml: 1 }} />
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
              fontSize: "14px",
              mt: 3,
            }}
          >
            <Typography variant="inherit">Bạn đã có tài khoản?</Typography>
            <Link
              href="/login"
              color="success"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Đăng nhập ngay
            </Link>
          </Box>
        </Box>
      </Box>

      {/* CỘT PHẢI: BANNER TRANG TRÍ */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 5,
          bgcolor: "#021a1d",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: 700, mb: 2, textAlign: "center" }}
        >
          Track your funnel with{" "}
          <span style={{ color: "#00b14f" }}>Report</span>
        </Typography>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
          alt="Illustration"
          sx={{
            maxWidth: "85%",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        />
        <Typography variant="body2" sx={{ color: "#9ca3af", mt: 4 }}>
          © 2014-2026 TopCV Vietnam JSC. All rights reserved.
        </Typography>
      </Box>

      {/* Popup thông báo kết quả */}
      <NotificationDialog
        open={openPopup}
        onClose={handleClosePopup}
        message={popupMessage}
        isSuccess={isSuccessPopup}
      />
    </Box>
  );
};

export default EmployerRegisterPage;
