import {
  Box,
  Typography,
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
import JobDetailCard from "./JobDetailCard";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const PAGE_SIZE = 20;

const JobHoverTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    padding: 0,
    maxWidth: 500,
  },
}));

const JobBoard = ({
  isLoading,
  jobs = [],
  totalPage,
  pageCurrent,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil((totalPage || 0) / PAGE_SIZE));
  const [showHint, setShowHint] = useState(true);

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

    if (salaryObj.type === "UP_TO") {
      return `Tới ${salaryObj.max / 1000000} triệu`;
    }

    if (salaryObj.type === "MINIMUM") {
      return `Từ ${salaryObj.min / 1000000} triệu`;
    }

    return "Thoả thuận";
  };

  const formatWorkLocation = (work_location) => {
    if (!work_location || work_location.length === 0) return "Chưa cập nhật";
    return work_location.map((location) => location.city_name).join(" & ");
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
            disabled={pageCurrent <= 1 || isLoading}
            onClick={() => onPageChange?.(pageCurrent - 1)}
            sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff" }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            disabled={pageCurrent >= totalPages || isLoading}
            onClick={() => onPageChange?.(pageCurrent + 1)}
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
      {showHint && (
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
          <IconButton size="small" onClick={() => setShowHint(false)}>
            <CloseIcon sx={{ fontSize: "16px", color: "#4b5563" }} />
          </IconButton>
        </Box>
      )}

      {/* ================= 4. JOB GRID ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 2.5,
        }}
      >
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => (
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
          : jobs.map((j) => {
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
                      <JobHoverTooltip
                        title={<JobDetailCard job={j} />}
                        placement="right-start"
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
                            href={`/job-info/${j.slug}`}
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
                  </Box>
                </Box>
              );
            })}
      </Box>

      {!isLoading && jobs.length === 0 && (
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "8px",
            p: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#7f878f" }}>
            Không tìm thấy việc làm phù hợp.
          </Typography>
        </Box>
      )}

      {/* ================= 5. PAGINATION ================= */}
      {totalPages > 1 && (
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
            disabled={pageCurrent <= 1 || isLoading}
            onClick={() => onPageChange?.(pageCurrent - 1)}
            sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff" }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>
          <Typography
            component="span"
            sx={{ mx: 2, fontSize: "14px", color: "#7f878f" }}
          >
            <strong style={{ color: "#00b14f", fontWeight: 600 }}>
              {pageCurrent}
            </strong>{" "}
            / {totalPages} trang
          </Typography>
          <IconButton
            size="small"
            disabled={pageCurrent >= totalPages || isLoading}
            onClick={() => onPageChange?.(pageCurrent + 1)}
            sx={{
              border: "1px solid #00b14f",
              bgcolor: "#fff",
              color: "#00b14f",
            }}
          >
            <KeyboardArrowRightIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default JobBoard;
