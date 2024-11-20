import React from "react";
import StatComponent from "../../component/StatComponent";
import { Chart } from "react-google-charts";
import { data, options } from "./data/data";
import ChartComponent from "../../component/ChartComponent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "white" }}>
      <h1 style={{ color: "#7E60BF", paddingBottom: "20px" }}>Dashboard</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "space-between",
        }}
      >
        <StatComponent
          value="3"
          icon={
            <SupervisorAccountIcon
              style={{ color: "#87A2FF", fontSize: "30px" }}
            />
          }
          description="Administrators"
          money=""
        />
        <StatComponent
          value="10"
          icon={<WorkIcon style={{ color: "#87A2FF", fontSize: "30px" }} />}
          description="Jobs"
          money=""
        />
        <StatComponent
          value="6"
          icon={<CategoryIcon style={{ color: "#87A2FF", fontSize: "30px" }} />}
          description="Jobs categories"
          money=""
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        <ChartComponent>
          <Chart
            chartType="Bar"
            data={data}
            options={options}
            width="100%"
            height="300px"
            legendToggle
          />
        </ChartComponent>
      </div>
    </div>
  );
};

export default AdminDashboard;



