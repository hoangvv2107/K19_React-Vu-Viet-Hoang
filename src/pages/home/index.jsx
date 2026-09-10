import { useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import api from "../../plugins/axios";
import { Box } from "@mui/material";
import JobBoard from "../../components/JobBoard";
import Footer from "../../components/Footer";
const HomePage = () => {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [totalPageJobs, setTotalPageJobs] = useState(0);
  const [pageJobsCurrent, setPageJobsCurrent] = useState(1);
  const [jobFilters, setJobFilters] = useState({
    keyword: "",
    category_slug: "",
    city_id: "",
  });
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
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
  const getJobsData = async () => {
    try {
      setIsJobsLoading(true);
      const { data } = await api.get("/api/v1/jobs", {
        params: {
          page: pageJobsCurrent, // Mặc định là trang 1
          keyword: jobFilters.keyword || undefined,
          category_slug: jobFilters.category_slug || undefined,
          city_id: jobFilters.city_id || undefined,
        },
      });
      setJobs(data.data);
      setTotalPageJobs(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setIsJobsLoading(false);
    }
  };
  useEffect(() => {
    getCategoryGroupsData();
  }, []);
  useEffect(() => {
    getJobsData();
  }, [pageJobsCurrent, jobFilters]);

  const handleJobSearch = (filters) => {
    setPageJobsCurrent(1);
    setJobFilters(filters);
  };

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
          onSearch={handleJobSearch}
        />
      </Box>
      <Box
        sx={{
          bgcolor: "#f3f5f7",
          minHeight: "100vh",
        }}
      >
        <JobBoard
          jobs={jobs}
          isLoading={isJobsLoading}
          pageCurrent={pageJobsCurrent}
          totalPage={totalPageJobs}
          onPageChange={setPageJobsCurrent}
        />
      </Box>

      <Footer />
    </>
  );
};
export default HomePage;
