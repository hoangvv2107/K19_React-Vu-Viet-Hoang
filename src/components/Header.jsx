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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import api from "../plugins/axios";
import { useNavigate } from "react-router";

const Header = () => {
  let navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("access_token")),
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openMenu = Boolean(anchorEl);

  // Open the account menu from the avatar button.
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the account menu.
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Sign out through the API, clear the local session, and return home.
  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");
      localStorage.removeItem("last_created_cv_id");
      localStorage.removeItem("last_created_cv_name");
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
        px: { xs: 1, sm: 3 },
        bgcolor: "#fff",
        borderBottom: "1px solid #f4f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 4 },
          minWidth: 0,
        }}
      >
        <IconButton
          aria-label="Mở menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
          sx={{
            display: { xs: "inline-flex", lg: "none" },
            order: { xs: -1, lg: 0 },
            color: "#263a4d",
            bgcolor: "#f2f4f5",
          }}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Link href="/">
          <Box
            component="img"
            src={logoTopCV}
            alt="logo TopCV"
            sx={{ height: { xs: "52px", sm: "72px" }, display: "block" }}
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
          <NavItem title="Tạo CV" to={"/create-cv"} />
          <NavItem title="Danh sách công ty " to={"/CompanyList"} />
        </Box>
      </Box>

      {mobileMenuOpen && (
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
            flexDirection: "column",
            gap: 1,
            p: 2,
            bgcolor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <NavItem title="Việc làm" to="/" />
          <NavItem title="Tạo CV" to="/create-cv" />
          <NavItem title="Danh sách công ty" to="/CompanyList" />
          <NavItem title="Đăng tuyển & tìm hồ sơ" to="/post-job" />
        </Box>
      )}

      {isLoggedIn ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 0.5, sm: "12px" },
          }}
        >
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

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
              href="/post-job"
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 },
          }}
        >
          <Button
            href="/register"
            variant="outlined"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              borderColor: "#00b14f",
              color: "#00b14f",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              px: { xs: 1.25, sm: 3 },
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
              px: { xs: 1.25, sm: 3 },
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
            href="/post-job"
            sx={{
              display: { xs: "none", md: "inline-flex" },
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
