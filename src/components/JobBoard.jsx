import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Avatar,
  Skeleton,
  Link,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import JobDetailCard from "./JobDetailCard";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
const JobHoverTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent", // Xóa nền đen
    padding: 0, // Xóa khoảng cách để card ôm sát
    maxWidth: 500, // Đới nới rộng giới hạn chiều ngang
  },
}));
const JobBoard = ({ isLoading, jobs }) => {
  // 2. ĐÃ XÓA CHECK LOADING Ở ĐÂY ĐỂ TRÁNH MẤT GIAO DIỆN

  const formatSalary = (salaryObj) => {
    if (!salaryObj) return "Chưa cập nhật";

    if (salaryObj.type === "AGREEMENT") {
      return "Thoả thuận";
    }

    if (salaryObj.type === "RANGE") {
      const minM = salaryObj.min / 1000000;
      const maxM = salaryObj.max / 1000000;
      return `${minM} - ${maxM} triệu`;
    }

    return "Thoả thuận"; // Fallback dự phòng
  };

  const formatWorkLocation = (work_location) => {
    if (!work_location || work_location.length === 0) return "Chưa cập nhật";
    return work_location.map((location) => location.city_name).join(" & ");
  };

  // State lưu danh sách ID các công việc đã thích
  const [likedJobs, setLikedJobs] = useState([]);

  // Hàm xử lý click thả tim
  const handleToggleLike = (jobId) => {
    const isLiked = likedJobs.includes(jobId);

    if (isLiked) {
      // Đã thích rồi -> Bỏ thích (Lọc bỏ ID ra khỏi mảng)
      setLikedJobs(likedJobs.filter((id) => id !== jobId));
    } else {
      // Chưa thích -> Thêm ID vào mảng
      setLikedJobs([...likedJobs, jobId]);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1170px",
        margin: "0 auto",
        p: "15px",
      }}
    >
      {/* ================= 1. HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#00b14f" }}>
            Việc làm
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff" }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              border: "1px solid #00b14f",
              color: "#00b14f",
              bgcolor: "#fff",
            }}
          >
            <KeyboardArrowRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* ================= 3. HINT BANNER ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#e8f2ff",
          border: "1px solid #b6d4fe",
          borderRadius: "4px",
          p: "8px 16px",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmojiObjectsOutlinedIcon
            sx={{ color: "#0d6efd", fontSize: "20px" }}
          />
          <Typography sx={{ fontSize: "14px", color: "#212f3f" }}>
            <strong>Gợi ý:</strong> Di chuột vào tiêu đề việc làm để xem thêm
            thông tin chi tiết
          </Typography>
        </Box>
        <IconButton size="small">
          <CloseIcon sx={{ fontSize: "16px", color: "#4b5563" }} />
        </IconButton>
      </Box>

      {/* ================= 4. JOB GRID ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 2.5,
        }}
      >
        {/* 3. LOGIC LOADING & HIỂN THỊ DATA */}
        {isLoading
          ? // KHI ĐANG TẢI: In ra 6 cái Skeleton
            Array.from(new Array(6)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  p: 2,
                  height: "160px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Skeleton
                    variant="rounded"
                    width={64}
                    height={64}
                    sx={{ borderRadius: "4px" }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", mb: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "80%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "0.8rem", width: "50%", mt: 1 }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "auto",
                    pt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton
                      variant="rounded"
                      width={80}
                      height={24}
                      sx={{ borderRadius: "16px" }}
                    />
                    <Skeleton
                      variant="rounded"
                      width={80}
                      height={24}
                      sx={{ borderRadius: "16px" }}
                    />
                  </Box>
                  <Skeleton variant="circular" width={28} height={28} />
                </Box>
              </Box>
            ))
          : // KHI TẢI XONG: In ra thẻ Jobs thật
            jobs.map((j) => {
              return (
                <Box
                  key={j.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    p: 2,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#00b14f",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  {/* Nửa trên: Logo & Thông tin */}
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <Box
                      sx={{
                        width: "64px",
                        height: "64px",
                        position: "relative",
                        border: "1px solid #e5e7eb",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={j.company?.logo_url}
                        sx={{ width: "90%", height: "90%" }}
                      />
                    </Box>

                    <Box sx={{ flex: 1, overflow: "hidden" }}>
                      {/* BỌC TOOLTIP VÀO ĐÂY */}
                      <JobHoverTooltip
                        title={<JobDetailCard job={j} />}
                        placement="right-start" // Cho nó hiện ra bên phải, ngang hàng với tiêu đề
                        interactive // Cho phép chuột rê vào trong popup để bấm nút "Ứng tuyển"
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#212f3f",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.4,
                            mb: 0.5,
                            cursor: "pointer",
                            "&:hover": { color: "#00b14f" },
                          }}
                        >
                          <Link
                            href="/job-info"
                            underline="none"
                            sx={{ color: "inherit" }}
                          >
                            {j.title}
                          </Link>
                        </Typography>
                      </JobHoverTooltip>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#7f878f",
                          textTransform: "uppercase",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {j.company?.short_name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Nửa dưới: Tags & Heart Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                      pt: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Chip
                        label={formatSalary(j.salary)}
                        size="small"
                        sx={{
                          bgcolor: "#f2f4f5",
                          color: "#4b5563",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        label={formatWorkLocation(j.work_location)}
                        size="small"
                        sx={{
                          bgcolor: "#f2f4f5",
                          color: "#4b5563",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    {/* Icon trái tim */}
                    <IconButton
                      size="small"
                      onClick={() => handleToggleLike(j.id)} // Gắn sự kiện click
                      sx={{
                        // Nếu có ID trong mảng thì viền xanh, không thì viền xám
                        border: "1px solid",
                        borderColor: likedJobs.includes(j.id)
                          ? "#00b14f"
                          : "#e5e7eb",

                        // Nếu có ID trong mảng thì nền xanh nhạt, không thì nền trắng
                        bgcolor: likedJobs.includes(j.id) ? "#f7fffb" : "#fff",

                        "&:hover": {
                          bgcolor: likedJobs.includes(j.id)
                            ? "#e8f8ee"
                            : "#f4f5f5",
                        },
                      }}
                    >
                      {/* Kiểm tra: Có ID thì hiện Tim đặc màu xanh, Không có thì hiện Tim rỗng màu xám */}
                      {likedJobs.includes(j.id) ? (
                        <FavoriteIcon
                          fontSize="small"
                          sx={{ color: "#00b14f" }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          fontSize="small"
                          sx={{ color: "#a6acb2" }}
                        />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
      </Box>

      {/* ================= 5. PAGINATION ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          pb: 2,
        }}
      >
        <IconButton
          size="small"
          sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff" }}
        >
          <KeyboardArrowLeftIcon fontSize="small" />
        </IconButton>
        <Typography
          component="span"
          sx={{ mx: 2, fontSize: "14px", color: "#7f878f" }}
        >
          <strong style={{ color: "#00b14f", fontWeight: 600 }}>1</strong> / 127
          trang
        </Typography>
        <IconButton
          size="small"
          sx={{
            border: "1px solid #00b14f",
            bgcolor: "#fff",
            color: "#00b14f",
          }}
        >
          <KeyboardArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default JobBoard;
