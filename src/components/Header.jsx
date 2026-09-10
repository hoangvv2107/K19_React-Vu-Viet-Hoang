import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import logoTopCV from "../assets/topcv-logo-home.png";
import NavItem from "./NavItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useEffect, useState } from "react";
import api from "../plugins/axios";
import { useNavigate } from "react-router";

const Header = () => {
  let navigate = useNavigate();

  // 1. Tạo state quản lý trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State quản lý việc đóng/mở menu của Avatar
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // 2. Kiểm tra token trong localStorage khi Header vừa render
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
      setIsLoggedIn(false);
      handleCloseMenu();
      navigate("/");
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        px: "24px",
        bgcolor: "#fff",
        borderBottom: "1px solid #f4f5f5",
      }}
    >
      {/* Nửa bên trái: Logo & Menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Link href="/">
          <Box
            component="img"
            src={logoTopCV}
            alt="logo TopCV"
            sx={{ height: "72px", display: "block" }}
          />
        </Link>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <NavItem title="Việc làm" to={"/"} />
          <NavItem title="Tạo CV" to={"/tao-cv"} />
          <NavItem title="Danh sách công ty " to={"/CompanyList"} />
        </Box>
      </Box>

      {isLoggedIn ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {/* Nút Avatar */}
          <IconButton
            onClick={handleAvatarClick}
            disableRipple
            sx={{
              padding: 0,
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Box sx={{ bgcolor: "#ebebeb", borderRadius: "50%" }}>
                  <KeyboardArrowDownIcon
                    sx={{ fontSize: "14px", color: "#212f3f" }}
                  />
                </Box>
              }
            >
              <Avatar alt="avatar user" src="/src/assets/avatar-default.webp" />
            </Badge>
          </IconButton>

          {/* Menu xổ xuống chỉ chứa nút Đăng xuất */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{ mt: 1 }}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "error.main", fontWeight: "bold" }}
            >
              Đăng xuất
            </MenuItem>
          </Menu>

          <Box
            sx={{
              background:
                "linear-gradient(0deg, hsla(210, 4%, 91%, 0), #e6e7e8 31.5%, #e6e7e8 70%, hsla(210, 4%, 91%, 0))",
              height: "40px",
              margin: "0 4px",
              width: "1px",
            }}
          ></Box>

          <Box>
            <Typography
              sx={{
                color: "#7f878f",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14px",
                margin: "0 0 4px",
                padding: 0,
              }}
            >
              Bạn là nhà tuyển dụng?
            </Typography>
            <Link
              href="/dang-tuyen"
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#263a4d",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "22px",
                margin: "0",
                padding: "0",
                "&:hover": { color: "#00b14f" },
              }}
            >
              Đăng tuyển ngay
              <KeyboardDoubleArrowRightIcon sx={{ fontSize: "24px" }} />
            </Link>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            href="/register"
            variant="outlined"
            sx={{
              borderColor: "#00b14f",
              color: "#00b14f",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "#009944",
                bgcolor: "#f7fffb",
              },
            }}
          >
            Đăng ký
          </Button>

          <Button
            href="/login"
            variant="contained"
            sx={{
              bgcolor: "#00b14f",
              color: "#fff",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#009944",
                boxShadow: "none",
              },
            }}
          >
            Đăng nhập
          </Button>

          <Button
            href="/dang-tuyen"
            sx={{
              bgcolor: "#f2f4f5",
              color: "#212f3f",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                bgcolor: "#e8eaec",
              },
            }}
          >
            Đăng tuyển & tìm hồ sơ
          </Button>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
