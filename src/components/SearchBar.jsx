import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  ClickAwayListener,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchBar = ({ isLoading, categoryData }) => {
  if (isLoading)
    return (
      <CircularProgress enableTrackSlot size="30px" aria-label="Loading…" />
    );
  const [showCategoryJobs, setShowCategoryJobs] = useState(false);
  const handleClickShowCategoryJobs = () => {
    setShowCategoryJobs(!showCategoryJobs);
  };
  const offCategoryJobs = () => {
    if (showCategoryJobs) setShowCategoryJobs(!showCategoryJobs);
  };
  const [activeGroupId, setActiveGroupId] = useState(null);
  const activeGroup = categoryData.find((group) => group.id === activeGroupId);

  const activeCategories = activeGroup?.categories || [];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleToggleParentCheckbox = (groupId, isCurrentlyChecked) => {
    // 1. Tìm object của Nhóm nghề (Cha) dựa vào groupId
    const group = categoryData.find((g) => g.id === groupId);
    if (!group || !group.categories) return;

    // 2. Lấy danh sách ID của tất cả các con
    const childrenIds = group.categories.map((cat) => cat.id);

    if (isCurrentlyChecked) {
      const newCata = selectedCategories.filter(
        (id) => !childrenIds.includes(id),
      );
      setSelectedCategories(newCata);
    } else {
      const newCata = [...selectedCategories, ...childrenIds];
      const standardizationData = [...new Set(newCata)];
      setSelectedCategories(standardizationData);
    }
  };

  const handleToggleChildCheckbox = (childId) => {
    const isAlreadySelected = selectedCategories.includes(childId);
    if (isAlreadySelected) {
      const newCata = selectedCategories.filter((id) => id !== childId);
      setSelectedCategories(newCata);
    } else {
      setSelectedCategories([...selectedCategories, childId]);
    }
  };
  return (
    <ClickAwayListener onClickAway={offCategoryJobs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#fff",
          borderRadius: "999px", // Bo góc tròn hoàn toàn
          width: "100%",
          maxWidth: "1170px", // Giới hạn chiều rộng tối đa
          padding: "15px",
          margin: "0 auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          position: "relative",
        }}
      >
        {/* 1. Nút "Danh mục Nghề" */}
        <Button
          variant="outlined"
          startIcon={
            <FormatListBulletedIcon
              sx={{ color: showCategoryJobs ? "#00b14f" : "#212f3f" }}
            />
          }
          sx={{
            borderRadius: "999px",
            color: showCategoryJobs ? "#00b14f" : "#212f3f",
            borderColor: showCategoryJobs ? "#00b14f" : "#e5e7eb",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "14px",
            px: 2,
            py: 1,
            whiteSpace: "nowrap",
            "&:hover": {
              borderColor: "#00b14f",
              bgcolor: "#f7fffb",
              color: "#00b14f",
              "& .MuiSvgIcon-root": {
                color: "inherit",
              },
            },
          }}
          onClick={handleClickShowCategoryJobs}
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

        {/* category list */}
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.15)", // Box shadow cho modal
            display: showCategoryJobs ? "flex" : "none",
            flexDirection: "column",
            overflow: "hidden",
            position: "absolute",
            zIndex: "999",
            top: "calc(100% + 10px)",
            left: 0,
          }}
        >
          {/* ================= HEADER ================= */}
          <Box
            sx={{
              p: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 700, color: "#212f3f" }}
            >
              Chọn Nhóm nghề, Nghề hoặc Chuyên môn
            </Typography>
            <IconButton
              size="small"
              sx={{ bgcolor: "#f4f5f5", "&:hover": { bgcolor: "#e8eaec" } }}
              onClick={handleClickShowCategoryJobs}
            >
              <CloseIcon fontSize="small" sx={{ color: "#4b5563" }} />
            </IconButton>
          </Box>

          {/* ================= SEARCH BAR ================= */}
          <Box sx={{ px: "24px", pb: "16px" }}>
            <InputBase
              placeholder="Nhập từ khóa tìm kiếm"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9ca3af", fontSize: "20px" }} />
                </InputAdornment>
              }
              sx={{
                width: "100%",
                border: "1px solid #9ca3af",
                borderRadius: "999px",
                px: 2.5,
                py: 0.75,
                fontSize: "14px",
                color: "#212f3f",
                "&.Mui-focused": {
                  borderColor: "#00b14f",
                },
              }}
            />
          </Box>

          {/* ================= BODY (2 CỘT) ================= */}
          <Box
            sx={{
              display: "flex",
              height: "420px", // Cố định chiều cao cho body để xuất hiện thanh cuộn
              borderTop: "1px solid #e5e7eb",
            }}
          >
            {/* CỘT TRÁI: NHÓM NGHỀ */}
            <Box
              sx={{
                width: "35%",
                borderRight: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Tiêu đề cột */}
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#7f878f",
                  fontWeight: 600,
                  p: "12px 24px",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #f4f5f5",
                }}
              >
                Nhóm nghề
              </Typography>

              {categoryData.map((c) => {
                const isParentChecked =
                  c.categories?.some((child) =>
                    selectedCategories.includes(child.id),
                  ) || false;
                return (
                  <Box
                    key={c.id}
                    onMouseEnter={() => setActiveGroupId(c.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: "16px",
                      py: "8px",
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "#f9fafb",
                        "& .MuiTypography-root": {
                          color: "#00b14f",
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        checked={isParentChecked}
                        sx={{
                          color: "#d1d5db",
                          "&.Mui-checked": { color: "#00b14f" },
                          p: "8px",
                        }}
                        onChange={() =>
                          handleToggleParentCheckbox(c.id, isParentChecked)
                        }
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        {c.group_name}
                      </Typography>
                    </Box>
                    <KeyboardArrowRightIcon
                      sx={{ color: "#212f3f", fontSize: "20px" }}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* CỘT PHẢI: NGHỀ  */}
            <Box
              sx={{
                width: "65%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#fff",
              }}
            >
              {/* Tiêu đề cột */}
              <Box
                sx={{
                  display: "flex",
                  p: "12px 24px",
                  borderBottom: "1px solid #f4f5f5",
                }}
              >
                <Typography
                  sx={{
                    width: "35%",
                    fontSize: "12px",
                    color: "#7f878f",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Nghề
                </Typography>
              </Box>

              {/* Vùng chứa nội dung / Empty State */}
              <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
                {activeCategories.length > 0 ? (
                  // NẾU CÓ DATA: Lặp để in ra danh sách
                  activeCategories.map((category) => (
                    <Box key={category.id} sx={{ display: "flex", mb: 2 }}>
                      {/* Render Checkbox và Tên Nghề ở đây (category.name) */}
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleToggleChildCheckbox(category.id)}
                        sx={{
                          color: "#d1d5db",
                          "&.Mui-checked": { color: "#00b14f" },
                          p: 0, // Xóa padding mặc định để căn lề đẹp hơn
                          mr: 1.5, // Cách chữ một chút
                        }}
                      />

                      {/* 2. Tên Nghề */}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                          mt: "2px", // Đẩy nhẹ xuống cho bằng dòng với ô Checkbox
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  // NẾU KHÔNG CÓ DATA: Hiện Empty State
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: 5,
                    }}
                  >
                    <SupportAgentIcon
                      sx={{ fontSize: "100px", color: "#e5e7eb", mb: 2 }}
                    />
                    <Typography sx={{ fontSize: "14px", color: "#7f878f" }}>
                      Vui lòng chọn Nhóm nghề
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* ================= FOOTER ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              bgcolor: "#fff",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#4b5563" }}>
              Bạn gặp vấn đề với Danh mục Nghề?{" "}
              <Typography
                component="span"
                sx={{
                  color: "#00b14f",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Gửi góp ý
              </Typography>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Text Bỏ chọn tất cả (Ví dụ đang ở trạng thái disable màu xám) */}
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  mr: 1,
                  cursor: "pointer",
                }}
                onClick={() => setSelectedCategories([])}
              >
                Bỏ chọn tất cả
              </Typography>

              <Button
                sx={{
                  color: "#212f3f",
                  bgcolor: "#f4f5f5",
                  borderRadius: "999px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  "&:hover": { bgcolor: "#e8eaec" },
                }}
                onClick={handleClickShowCategoryJobs}
              >
                Hủy
              </Button>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#00b14f",
                  color: "#fff",
                  borderRadius: "999px",
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#009944", boxShadow: "none" },
                }}
              >
                Chọn
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
