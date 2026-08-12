import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const NavItem = ({ title }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      gap: 0.5,
      padding: "26px 16px",

      "&:hover": {
        "& .MuiTypography-root ": {
          color: "#00b14f",
        },
        "& .MuiSvgIcon-root": {
          color: "#00b14f",
          transform: "rotateX(180deg)",
        },
      },
    }}
  >
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 600,
        color: "#212f3f",
        transition: "color 0.3s ease",
      }}
    >
      {title}
    </Typography>
    <KeyboardArrowDownIcon
      sx={{ fontSize: "18px", color: "#7f878f", transition: "all 0.3s ease" }}
    />
  </Box>
);
export default NavItem;
