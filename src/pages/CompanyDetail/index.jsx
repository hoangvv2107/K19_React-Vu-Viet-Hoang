import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, Stack, Divider } from "@mui/material";

// === Import Icons ===
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";

const CompanyDetail = () => {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const getCategoryGroupsData = async () => {
    try {
      setIsCategoryLoading(true);
      const { data } = await api.get("/category_groups");
      setCategoryGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCategoryLoading(false);
    }
  };
  useEffect(() => {
    getCategoryGroupsData();
  }, []);
  return (
    <>
      <Header />

      <Box
        sx={{
          background:
            " linear-gradient(180deg, #002b33, rgba(0, 43, 51, .25)), linear-gradient(90deg, #008060 21.86%, #2bab60 78.13%)",
          backgroundSize: "cover",
          py: "20px",
        }}
      >
        <SearchBar
          categoryData={categoryGroups}
          isLoading={isCategoryLoading}
        />
      </Box>

      <Box sx={{ bgcolor: "#f4f5f5", minHeight: "100vh", pb: 5 }}>
        {/* ================= 1. HEADER CÔNG TY (COVER & LOGO) ================= */}
        <Box
          sx={{
            bgcolor: "#fff",
            mb: 3,
            pb: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1170px",
              margin: "0 auto",
              px: "15px",
            }}
          >
            {/* Ảnh bìa */}
            <Box
              sx={{
                width: "100%",
                height: "250px",
                bgcolor: "#e5e7eb",
                backgroundImage: "url('https://via.placeholder.com/1170x250')", // Thay bằng ảnh thật sau
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0 0 8px 8px",
              }}
            />

            {/* Khối Logo & Tên công ty dàn ngang */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                mt: "-40px", // Kéo logo đè lên cover
                gap: 3,
              }}
            >
              {/* Logo */}
              <Box sx={{ p: 0.5, bgcolor: "#fff", borderRadius: "8px" }}>
                <Avatar
                  variant="square"
                  src="https://via.placeholder.com/140"
                  sx={{
                    width: 140,
                    height: 140,
                    borderRadius: "4px",
                    border: "1px solid #e5e7eb",
                  }}
                />
              </Box>

              {/* Tên công ty & Nút Follow */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                  pb: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#212f3f" }}
                >
                  Tên Công Ty Cổ Phần (Hardcode)
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: "#00b14f",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#009944", boxShadow: "none" },
                  }}
                >
                  Theo dõi công ty
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ================= 2. NỘI DUNG CHÍNH (CHIA 2 CỘT BẰNG FLEXBOX) ================= */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1170px",
            margin: "0 auto",
            px: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "flex-start",
              flexDirection: { xs: "column", md: "row" }, // Đảm bảo mobile nằm dọc
            }}
          >
            {/* ================= CỘT TRÁI (CHIẾM 2 PHẦN) ================= */}
            <Box
              sx={{
                flex: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* Khối Giới thiệu */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Giới thiệu công ty
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#4b5563", fontSize: "15px", lineHeight: 1.8 }}
                >
                  Đây là đoạn text mô tả giới thiệu về công ty. Bạn sẽ dùng dữ
                  liệu API để render vào đây. Tạm thời cứ để một đoạn text dài
                  dài một chút để nhìn cấu trúc cho dễ hình dung. Công ty ABC
                  chuyên cung cấp các giải pháp công nghệ phần mềm hàng đầu tại
                  Việt Nam...
                </Typography>
              </Box>

              {/* Khối Việc làm đang tuyển */}
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Tuyển dụng
                  </Typography>
                </Box>

                {/* Box chứa tạm 1 Job Card mồi để làm UI */}
                <Box
                  sx={{
                    border: "1px solid #e5e7eb",
                    p: 2,
                    borderRadius: "8px",
                    "&:hover": { borderColor: "#00b14f" },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#212f3f", mb: 1 }}>
                    Nhân viên Lập trình ReactJS (Demo)
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", color: "#00b14f", fontWeight: 600 }}
                  >
                    Tới 1,000 USD
                  </Typography>
                </Box>
                {/* Sau này bạn sẽ map() danh sách jobs của công ty vào đây */}
              </Box>
            </Box>
            {/* ================= HẾT CỘT TRÁI ================= */}

            {/* ================= CỘT PHẢI (CHIẾM 1 PHẦN) ================= */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "24px",
                      bgcolor: "#00b14f",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#212f3f" }}
                  >
                    Thông tin liên hệ
                  </Typography>
                </Box>

                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <LocationOnOutlinedIcon sx={{ color: "#7f878f" }} />
                    <Box>
                      <Typography
                        sx={{ fontSize: "14px", color: "#7f878f", mb: 0.5 }}
                      >
                        Địa chỉ công ty
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        Số 47 Nguyễn Tuân, Thanh Xuân, Hà Nội
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />

                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <PeopleAltOutlinedIcon sx={{ color: "#7f878f" }} />
                    <Box>
                      <Typography
                        sx={{ fontSize: "14px", color: "#7f878f", mb: 0.5 }}
                      >
                        Quy mô công ty
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#212f3f",
                        }}
                      >
                        100 - 499 nhân viên
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />

                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <LanguageOutlinedIcon sx={{ color: "#7f878f" }} />
                    <Box>
                      <Typography
                        sx={{ fontSize: "14px", color: "#7f878f", mb: 0.5 }}
                      >
                        Website
                      </Typography>
                      <Typography
                        component="a"
                        href="#"
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#00b14f",
                          textDecoration: "none",
                        }}
                      >
                        https://topcv.vn
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>
            {/* ================= HẾT CỘT PHẢI ================= */}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default CompanyDetail;
