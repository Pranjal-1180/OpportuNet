// import React, { useEffect } from "react";
// import { Box, Button, Paper, Typography } from "@mui/material";
// import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import { useDispatch, useSelector } from "react-redux";
// import { jobLoadAction } from "../../redux/actions/jobAction";

// const DashJobs = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(jobLoadAction());
//   }, []);

//   const { jobs, loading } = useSelector((state) => state.loadJobs);
//   let data = [];
//   data = jobs !== undefined && jobs.length > 0 ? jobs : [];

//   //delete job by Id
//   const deleteJobById = (e, id) => {
//     console.log(id);
//   };

//   const columns = [
//     {
//       field: "_id",
//       headerName: "Job ID",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "title",
//       headerName: "Job name",
//       width: 150,
//     },
//     {
//       field: "jobType",
//       headerName: "Category",
//       width: 150,
//       valueGetter: (params) => {
//         console.log("JobType Params:", params.row); // Log the entire row
//         return params.row?.jobType?.jobTypeName || "N/A"; // Ensure you check if jobType exists
//       },
//     },
//     {
//       field: "user",
//       headerName: "User",
//       width: 150,
//       valueGetter: (params) => {
//         console.log("User Params:", params.row); // Log the entire row
//         return params.row?.user?.firstName || "N/A"; // Ensure you check if user exists
//       },
//     },
//     {
//       field: "available",
//       headerName: "available",
//       width: 150,
//       renderCell: (values) => (values.row.available ? "Yes" : "No"),
//     },

//     {
//       field: "salary",
//       headerName: "Salary",
//       type: Number,
//       width: 150,
//       renderCell: (values) => "$" + values.row.salary,
//     },

//     {
//       field: "Actions",
//       width: 200,
//       renderCell: (values) => (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "170px",
//           }}
//         >
//           <Button variant="contained">
//             <Link
//               style={{ color: "white", textDecoration: "none" }}
//               to={`/admin/edit/job/${values.row._id}`}
//             >
//               Edit
//             </Link>
//           </Button>
//           <Button
//             onClick={(e) => deleteJobById(e, values.row._id)}
//             variant="contained"
//             color="error"
//           >
//             Delete
//           </Button>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
//         Jobs list
//       </Typography>
//       <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
//         <Button variant="contained" color="success" startIcon={<AddIcon />}>
//           {" "}
//           <Link
//             style={{ color: "white", textDecoration: "none" }}
//             to="/admin/job/create"
//           >
//             Create Job
//           </Link>
//         </Button>
//       </Box>
//       <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
//         <Box sx={{ height: 400, width: "100%" }}>
//           <DataGrid
//             getRowId={(row) => row._id}
//             sx={{
//               "& .MuiTablePagination-displayedRows": {
//                 color: "white",
//               },
//               color: "white",
//               [`& .${gridClasses.row}`]: {
//                 bgcolor: (theme) =>
//                   // theme.palette.mode === 'light' ? grey[200] : grey[900],
//                   theme.palette.secondary.main,
//               },
//               button: {
//                 color: "#ffffff",
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "rgba(0, 0, 0, 0.87)", // Set background color for header
//                 color: "black", // Set text color for header
//               },
//               "& .MuiDataGrid-columnHeaderTitle": {
//                 fontWeight: "bold",
//               },
//             }}
//             rows={data}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             checkboxSelection
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default DashJobs;

import React, { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  jobLoadAction,
  deleteSingleJobAction,
  jobLoadSingleAction,
} from "../../redux/actions/jobAction";
import CardElement from "../../component/CardElement";
const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, [dispatch]);

  const { success: deleteSuccess } = useSelector((state) => state.deleteJob);
  const { jobs, loading } = useSelector((state) => state.loadJobs);
  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];
  console.log(data);

  // delete a job by id
  const deleteJobById = (e, id) => {
    console.log(id);
    if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
      dispatch(deleteSingleJobAction(id));
      if (deleteSuccess && deleteSuccess === true) {
        dispatch(jobLoadAction());
      }
    }
  };

  const viewJobById = (e, id) => {
    dispatch(jobLoadSingleAction(id));
  };

  const columns = [
    {
      field: "_id",
      headerName: "Job ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Job name",
      width: 150,
    },
    {
      field: "jobType",
      headerName: "Category",
      width: 150,
      renderCell: (params) => (
        <span>{params.row.jobType?.jobTypeName || "N/A"}</span>
      ),
    },
    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params) => (
        <span>{params.row.user?.firstName || "N/A"}</span>
      ),
    },
    {
      field: "available",
      headerName: "Available",
      width: 150,
      renderCell: (values) => (values.row.available ? "Yes" : "No"),
    },
    {
      field: "salary",
      headerName: "Salary",
      type: Number,
      width: 150,
      renderCell: (values) => "$" + values.row.salary,
    },
    {
      field: "Actions",
      width: 300,
      renderCell: (values) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <button
            onClick={(e) => viewJobById(e, values.row._id)}
            style={{
              padding: "9px 12px",
              marginTop: "10px",
              backgroundColor: "#d32f2f",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Link
              to={`/job/${values.row._id}`}
              state={{ fromDashJobs: true }}
              style={{ color: "white", textDecoration: "none" }}
            >
              View Job Details
            </Link>
          </button>

          <button
            style={{
              padding: "6px 12px",
              marginTop: "10px",
              backgroundColor: "#1976d2",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/job/${values.row._id}`}
            >
              Edit
            </Link>
          </button>
          <button
            onClick={(e) => deleteJobById(e, values.row._id)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#d32f2f",
              marginTop: "10px",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ color: "#2196f3", paddingBottom: "24px" }}>Jobs List</h2>
      <div
        style={{
          paddingBottom: "16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            padding: "6px 12px",
            backgroundColor: "#2e7d32",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AddIcon style={{ marginRight: "8px" }} />
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/job/create"
          >
            Create Job
          </Link>
        </button>
      </div>
      <div
        style={{
          backgroundColor: "#0e1b32",
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        <div style={{ height: 400, width: "100%" }}>
          {loading ? (
            <p style={{ color: "white", textAlign: "center", padding: "16px" }}>
              Loading...
            </p>
          ) : (
            <DataGrid
              getRowId={(row) => row._id}
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "white",
                },
                color: "white",
                [`& .${gridClasses.row}`]: {
                  backgroundColor: "#5587f2",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(0, 0, 0, 0.87)", // Set background color for header
                  color: "black", // Set text color for header
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashJobs;
