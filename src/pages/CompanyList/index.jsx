import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Pagination,
  Skeleton,
  Chip,
  InputAdornment,
} from "@mui/material";

// === Import Icons ===
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import Header from "../../components/Header";
import api from "../../plugins/axios";

const CompanyList = () => {
  // --- STATE ---
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // State cho thanh tìm kiếm
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const PAGE_SIZE = 20;

  // --- GỌI API LẤY DANH SÁCH ---
  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/v1/companies", {
          params: {
            page: page,
            keyword: keyword || null, // Nếu rỗng thì gửi null hoặc bỏ qua
          },
        });

        setCompanies(response.data.data);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Lỗi lấy danh sách công ty:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [page, keyword]);

  // --- XỬ LÝ SỰ KIỆN ---
  const handleSearch = () => {
    setPage(1); // Reset về trang 1 khi tìm kiếm mới
    setKeyword(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  // Tính tổng số trang (Giả sử backend trả về tổng số record trong 'total')
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;

  return (
    <>
      <Header />

      <Box sx={{ bgcolor: "#f4f5f5", minHeight: "100vh", pb: 5 }}>
        {/* ================= HERO SECTION & SEARCH ================= */}
        <Box
          sx={{
            bgcolor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            py: 5,
            mb: 4,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1170px", mx: "auto", px: 2 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#212f3f", mb: 1, textAlign: "center" }}
            >
              Khám phá văn hóa công ty nổi bật
            </Typography>
            <Typography
              sx={{
                color: "#7f878f",
                mb: 4,
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành
              cho bạn
            </Typography>

            {/* Thanh tìm kiếm */}
            <Box
              sx={{
                display: "flex",
                maxWidth: "700px",
                mx: "auto",
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                placeholder="Nhập tên công ty (VD: F8 Technology...)"
                variant="outlined"
                size="medium"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#7f878f" }} />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: "#fff" },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  bgcolor: "#00b14f",
                  px: 4,
                  fontWeight: 600,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#009944", boxShadow: "none" },
                }}
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ================= DANH SÁCH CÔNG TY ================= */}
        <Box sx={{ width: "100%", maxWidth: "1170px", mx: "auto", px: 2 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: "#212f3f", mb: 3 }}
          >
            Danh sách công ty nổi bật
          </Typography>

          {/* Grid Layout */}
          <Grid container spacing={3}>
            {isLoading
              ? // --- SKELETON LOADING ---
                Array.from(new Array(6)).map((_, index) => (
                  <Grid size={12} key={index}>
                    <Paper sx={{ p: 3, borderRadius: "8px", height: "100%" }}>
                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Skeleton variant="rounded" width={64} height={64} />
                        <Box sx={{ flex: 1 }}>
                          <Skeleton variant="text" width="80%" height={24} />
                          <Skeleton variant="text" width="50%" height={20} />
                        </Box>
                      </Box>
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="80%" />
                    </Paper>
                  </Grid>
                ))
              : // --- RENDER DỮ LIỆU THẬT ---
                companies.map((company) => (
                  <Grid size={12} key={company.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#00b14f",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      {/* Avatar & Tên */}
                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Avatar
                          variant="rounded"
                          src={company.logo_url}
                          sx={{
                            width: 64,
                            height: 64,
                            border: "1px solid #e5e7eb",
                            bgcolor: "#f4f5f5",
                            color: "#00b14f",
                            fontWeight: "bold",
                          }}
                        >
                          {/* Fallback nếu không có logo: lấy chữ cái đầu */}
                          {!company.logo_url && company.company_name?.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: "#212f3f",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {company.company_name}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Thông tin Meta */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          mt: "auto",
                          pt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "flex-start",
                            color: "#4b5563",
                          }}
                        >
                          <LocationOnOutlinedIcon
                            sx={{
                              fontSize: "18px",
                              mt: "2px",
                              color: "#7f878f",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {company.headquarters_address ||
                              "Chưa cập nhật địa chỉ"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              color: "#4b5563",
                            }}
                          >
                            <BusinessOutlinedIcon
                              sx={{ fontSize: "18px", color: "#7f878f" }}
                            />
                            <Typography sx={{ fontSize: "14px" }}>
                              {company.category || "Nhiều lĩnh vực"}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              color: "#4b5563",
                            }}
                          >
                            <PeopleAltOutlinedIcon
                              sx={{ fontSize: "18px", color: "#7f878f" }}
                            />
                            <Typography sx={{ fontSize: "14px" }}>
                              {company.company_size || "Chưa rõ"}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Tag trạng thái Xác thực (Nếu cần hiển thị) */}
                        {company.verification_tier === "VERIFIED" && (
                          <Chip
                            label="Đã xác thực"
                            size="small"
                            sx={{
                              mt: 1,
                              width: "fit-content",
                              bgcolor: "#e8f2ff",
                              color: "#0d6efd",
                              fontWeight: 600,
                              fontSize: "12px",
                            }}
                          />
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
          </Grid>

          {/* Trạng thái không tìm thấy */}
          {!isLoading && companies.length === 0 && (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h6" color="text.secondary">
                Không tìm thấy công ty nào phù hợp.
              </Typography>
            </Box>
          )}

          {/* ================= PHÂN TRANG ================= */}
          {!isLoading && totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="success" // Màu xanh lá mặc định của MUI
                shape="rounded"
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CompanyList;
