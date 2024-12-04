import {React,useEffect,useState} from "react";
import StatComponent from "../../component/StatComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
const AdminDashboard = () => {
  const theme = useTheme();
  const [jobCategories, setJobCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsCount, setJobsCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch job categories
  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get("/api/type/jobs");
        setJobCategories(response.data.jobT);
        setCategoriesLoading(false);
      } catch (error) {
        console.error("Error fetching job categories:", error);
        setCategoriesLoading(false);
      }
    };

    fetchJobCategories();
  }, []);

  // Fetch jobs count
  useEffect(() => {
    const fetchJobsCount = async () => {
      try {
        const response = await axios.get("/api/jobs/show");
        setJobsCount(response.data.count);
        setJobsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobsLoading(false);
      }
    };

    fetchJobsCount();
  }, []);

  // Fetch admin count
  useEffect(() => {
    const fetchAdminCount = async () => {
      try {
        const response = await axios.get("/api/users/admin-count");
        setAdminCount(response.data.adminCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin count:", error);
        setLoading(false);
      }
    };

    fetchAdminCount();
  }, []);

  const jobCategoryCount = jobCategories.length;

  return (
    <div style={{ padding: "10px", backgroundColor: theme.palette.mode==="dark"?"#3C3D37":"#edeff0" }}>
      <h3 style={{ color: "#127de6", paddingBottom: "20px" }}>Dashboard</h3>

      <div
        style={{
          display: "grid",
          gap: "23px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          justifyContent: "center", // Centers the grid content
        }}
      >
        <StatComponent
          value={loading ? "Loading..." : adminCount}
          icon={
            <SupervisorAccountIcon
              style={{ color: "#87A2FF", fontSize: "26px" }}
            />
          }
          description="Administrators"
          money=""
        />
        <StatComponent
          value={jobsLoading ? "Loading..." : jobsCount}
          icon={<WorkIcon style={{ color: "#87A2FF", fontSize: "26px" }} />}
          description="Jobs registered"
          money=""
        />
        <StatComponent
          value={categoriesLoading ? "Loading..." : jobCategoryCount}
          icon={<CategoryIcon style={{ color: "#87A2FF", fontSize: "26px" }} />}
          description="Job Categories"
          money=""
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
