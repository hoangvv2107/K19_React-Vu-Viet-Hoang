import { Box, Button, Divider, InputBase } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = ({ categoryData }) => {
  const [showCategoryJobs, setShowCategoryJobs] = useState(false);
  const handleClickShowCategoryJobs = () => {
    setShowCategoryJobs(true);
  };
  return (
    // Box ngoài cùng mô phỏng nền xanh đậm của trang TopCV để bạn dễ hình dung
    <Box sx={{ bgcolor: "#004d40", p: 4 }}>
      {/* Container chính của thanh tìm kiếm */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#fff",
          borderRadius: "999px", // Bo góc tròn hoàn toàn
          p: "6px 8px", // Padding trên dưới và 2 bên
          width: "100%",
          maxWidth: "1000px", // Giới hạn chiều rộng tối đa
          margin: "0 auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* 1. Nút "Danh mục Nghề" */}
        <Button
          variant="outlined"
          startIcon={<FormatListBulletedIcon sx={{ color: "#212f3f" }} />}
          sx={{
            borderRadius: "999px",
            color: "#212f3f",
            borderColor: "#e5e7eb",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            px: 2,
            py: 1,
            whiteSpace: "nowrap",
            "&:hover": {
              borderColor: "#d1d5db",
              bgcolor: "#f9fafb",
            },
          }}
        >
          Danh mục Nghề
        </Button>

        {/* Vạch kẻ dọc */}
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mx: 2, borderColor: "#e5e7eb" }}
        />

        {/* 2. Ô Input nhập liệu */}
        <InputBase
          placeholder="Vị trí tuyển dụng, tên công ty"
          sx={{
            flex: 1, // Chiếm toàn bộ không gian còn lại
            fontSize: "15px",
            color: "#212f3f",
            "& .MuiInputBase-input::placeholder": {
              color: "#9ca3af",
              opacity: 1,
            },
          }}
        />

        {/* Vạch kẻ dọc */}
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mx: 2, borderColor: "#e5e7eb" }}
        />

        {/* 3. Nút chọn "Địa điểm" */}
        <Button
          variant="text"
          startIcon={<LocationOnOutlinedIcon sx={{ color: "#4b5563" }} />}
          endIcon={<KeyboardArrowDownIcon sx={{ color: "#4b5563" }} />}
          sx={{
            color: "#212f3f",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            minWidth: "160px",
            justifyContent: "flex-start", // Đẩy nội dung sang trái
            px: 1,
            "& .MuiButton-endIcon": {
              marginLeft: "auto", // Đẩy icon mũi tên sát mép phải
            },
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          Địa điểm
        </Button>

        {/* 4. Nút "Tìm kiếm" */}
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{
            borderRadius: "999px",
            bgcolor: "#00b14f", // Màu xanh lá đặc trưng
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "15px",
            px: 3,
            py: 1.25,
            ml: 1, // Cách nút địa điểm một chút
            boxShadow: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#009944",
              boxShadow: "none",
            },
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
