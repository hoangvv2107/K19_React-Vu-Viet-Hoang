import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Typography, Avatar, Button } from "@mui/material";

// Hàm hỗ trợ format tiền lương
const formatSalary = (salaryObj) => {
  if (!salaryObj) return "Chưa cập nhật";
  if (salaryObj.type === "AGREEMENT") return "Thoả thuận";
  if (salaryObj.type === "RANGE") {
    const minM = salaryObj.min / 1000000;
    const maxM = salaryObj.max / 1000000;
    return `${minM} - ${maxM} triệu`;
  }
  return "Thoả thuận";
};

// Hàm hỗ trợ format địa điểm (Lấy thành phố đầu tiên)
const formatLocation = (workLocation) => {
  if (!workLocation || workLocation.length === 0) return "Chưa cập nhật";
  return workLocation[0].city_name;
};

// Hàm tính toán số ngày còn lại đến hạn nộp
const getDaysLeft = (deadline) => {
  if (!deadline) return "Chưa cập nhật";
  const diffTime = new Date(deadline).getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `Còn ${diffDays} ngày` : "Đã hết hạn";
};

const JobDetailCard = ({ job }) => {
  // Tránh lỗi khi hover mà data chưa load kịp
  if (!job) return null;

  return (
    <Box
      sx={{
        width: "420px",
        bgcolor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
        border: "1px solid #e5e7eb",
        p: 2.5,
      }}
    >
      {/* 1. HEADER: Logo + Tiêu đề + Công ty + Lương */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Avatar
          variant="square"
          src={job.company?.logo_url || "https://via.placeholder.com/64"}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "4px",
            border: "1px solid #e5e7eb",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#212f3f",
              lineHeight: 1.4,
              mb: 0.5,
            }}
          >
            {job.title}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#7f878f", mb: 0.5 }}>
            {job.company?.short_name || job.company?.company_name}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 600, color: "#00b14f" }}
          >
            {formatSalary(job.salary)}
          </Typography>
        </Box>
      </Box>

      {/* 2. META INFO: Địa điểm, Kinh nghiệm, Hạn nộp */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#7f878f",
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: "16px" }} />
          <Typography sx={{ fontSize: "13px" }}>
            {formatLocation(job.work_location)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#7f878f",
          }}
        >
          <WorkOutlineOutlinedIcon sx={{ fontSize: "16px" }} />
          <Typography sx={{ fontSize: "13px" }}>
            {job.experience_level}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#7f878f",
          }}
        >
          <AccessTimeOutlinedIcon sx={{ fontSize: "16px" }} />
          <Typography sx={{ fontSize: "13px" }}>
            {getDaysLeft(job.deadline)}
          </Typography>
        </Box>
      </Box>

      {/* 3. TIÊU ĐỀ: Mô tả công việc (Cái vạch màu xanh lá) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Box
          sx={{
            width: "4px",
            height: "16px",
            bgcolor: "#00b14f",
            borderRadius: "2px",
          }}
        />
        <Typography
          sx={{ fontSize: "15px", fontWeight: 700, color: "#212f3f" }}
        >
          Mô tả công việc
        </Typography>
      </Box>

      {/* 4. LIST MÔ TẢ (Render an toàn từ chuỗi HTML của DB) */}
      <Box
        dangerouslySetInnerHTML={{ __html: job.description_html }}
        sx={{
          mb: 3,
          color: "#4b5563",
          fontSize: "13px",
          lineHeight: 1.6,
          // Ghi đè CSS cho dữ liệu HTML trả về từ API
          "& h3": {
            display: "none", // Ẩn thẻ <h3> gốc từ DB vì đã có UI tiêu đề ở trên
          },
          "& ul": {
            m: 0,
            pl: "20px",
          },
          "& li": {
            mb: "4px",
          },
        }}
      />

      {/* 5. ACTION BUTTONS */}
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            color: "#00b14f",
            borderColor: "#00b14f",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { borderColor: "#009944", bgcolor: "#f7fffb" },
          }}
        >
          Ứng tuyển
        </Button>
        <Button
          variant="contained"
          sx={{
            flex: 2,
            bgcolor: "#00b14f",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { bgcolor: "#009944", boxShadow: "none" },
          }}
        >
          Xem chi tiết
        </Button>
      </Box>
    </Box>
  );
};

export default JobDetailCard;
