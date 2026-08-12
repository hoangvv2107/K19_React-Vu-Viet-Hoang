import { useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import api from "../../plugins/axios";
const HomePage = () => {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const getCategoryGroupsData = async () => {
    try {
      const { data } = await api.get("/category_groups");
      setCategoryGroups(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoryGroupsData();
  }, []);
  console.log(categoryGroups);

  return (
    <>
      <Header />

      <SearchBar categoryData={categoryGroups} />
    </>
  );
};
export default HomePage;
