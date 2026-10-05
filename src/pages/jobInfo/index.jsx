import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import api from "../../plugins/axios";
import JobDetail from "../../components/JobDetail";
import { useParams } from "react-router";

const JobInfo = () => {
  const { slug } = useParams();

  const [categoryGroups, setCategoryGroups] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  const [jobData, setJobData] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(true);

  // Load categories for the search bar on the detail page.
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

  // Fetch the job selected by the slug in the URL.
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

  useEffect(() => {
    getCategoryGroupsData();
  }, []);

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

      <JobDetail jobData={jobData} isLoading={isJobLoading} />

      <Footer />
    </>
  );
};

export default JobInfo;
