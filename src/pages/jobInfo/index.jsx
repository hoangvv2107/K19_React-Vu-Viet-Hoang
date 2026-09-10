import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import api from "../../plugins/axios";
import JobDetail from "../../components/JobDetail";
import { useParams } from "react-router";

const JobInfo = () => {
  // 2. Lấy biến slug từ thanh địa chỉ (ví dụ: lap-trinh-vien-reactjs)
  const { slug } = useParams();

  // State cho SearchBar (Giữ nguyên của bạn)
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  // 3. Khởi tạo State cho Chi tiết công việc
  const [jobData, setJobData] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(true);

  const getCategoryGroupsData = async () => {
    try {
      setIsCategoryLoading(true);
      const { data } = await api.get("/api/v1/categories");
      setCategoryGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCategoryLoading(false);
    }
  };

  // 4. Hàm gọi API lấy chi tiết công việc theo slug
  const getJobDetailData = async () => {
    if (!slug) return;
    try {
      setIsJobLoading(true);
      const { data } = await api.get(`/api/v1/jobs/${slug}`);
      setJobData(data);
    } catch (error) {
      console.log("Lỗi tải chi tiết công việc:", error);
    } finally {
      setIsJobLoading(false);
    }
  };

  // useEffect gọi categories (Chạy 1 lần)
  useEffect(() => {
    getCategoryGroupsData();
  }, []);

  // 5. useEffect gọi API job detail (Chạy mỗi khi slug trên URL thay đổi)
  useEffect(() => {
    getJobDetailData();
  }, [slug]);

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

      {/* 6. Truyền data và trạng thái loading xuống cho component con xử lý hiển thị */}
      <JobDetail jobData={jobData} isLoading={isJobLoading} />

      <Footer />
    </>
  );
};

export default JobInfo;
