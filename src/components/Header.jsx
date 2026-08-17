import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import logoTopCV from "../assets/topcv-logo-home.png";
import NavItem from "./NavItem";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const Header = () => {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* Logo */}
        <Link href="/">
          <Box
            component="img"
            src={logoTopCV}
            alt="logo TopCV"
            sx={{ height: "72px", display: "block" }}
          />
        </Link>

        {/* Danh sách Menu (Ẩn trên màn hình nhỏ) */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <NavItem title="Việc làm" to={"/"} />
          <NavItem title="Tạo CV" to={"/tao-cv"} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#263a4d",
            justifyContent: "center",
          }}
        >
          {/* noti */}
          <IconButton
            sx={{
              background: "#f2f4f5",
              display: "flex",
              justifyContent: "center",
              borderRadius: "50%",
              alignItems: "center",
            }}
          >
            <NotificationsNoneIcon />
          </IconButton>
          {/* chat */}
          <IconButton
            sx={{
              background: "#f2f4f5",
              display: "flex",
              justifyContent: "center",
              borderRadius: "50%",
              alignItems: "center",
            }}
          >
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </Box>

        <IconButton
          disableRipple
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
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

              "&:hover": {
                color: "#00b14f",
              },
            }}
          >
            Đăng tuyển ngay
            <KeyboardDoubleArrowRightIcon sx={{ fontSize: "24px" }} />
          </Link>
        </Box>
      </Box>
    </AppBar>
  );
};
export default Header;
