import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import api from "../../plugins/axios";
import JobDetail from "../../components/JobDetail";

const JobInfo = () => {
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

      <JobDetail />

      <Footer />
    </>
  );
};
export default JobInfo;
