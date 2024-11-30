import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  jobLoadAction,
  deleteSingleJobAction,
  jobLoadSingleAction,
} from "../../redux/actions/jobAction";

const DashJobs = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(jobLoadAction());
  }, [dispatch]);

  const { success: deleteSuccess } = useSelector((state) => state.deleteJob);
  const { jobs, loading } = useSelector((state) => state.loadJobs);

  let data = jobs && jobs.length > 0 ? jobs : [];

  const styles = {
    header: {
      color: "#127ce6",
      paddingBottom: "24px",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    createButtonContainer: {
      display: "flex",
      justifyContent: "flex-start",
      paddingBottom: "16px",
    },
    createButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#4caf50",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      textDecoration: "none",
    },
    createButtonHover: {
      backgroundColor: "#66bb6a",
      
    },
    actionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      gap: "10px",
      marginTop: "10px",
    },
    actionButton: {
      border: "none",
      padding: "8px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    viewButton: {
      backgroundColor: "#4caf50",
    },
    viewButtonHover: {
      backgroundColor: "#66bb6a",
    },
    editButton: {
      backgroundColor: "#1976d2",
    },
    editButtonHover: {
      backgroundColor: "#42a5f5",
    },
    deleteButton: {
      backgroundColor: "#f44336",
    },
    deleteButtonHover: {
      backgroundColor: "#e57373",
    },
    gridContainer: {
      backgroundColor: "#f8f9fa",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };

  const deleteJobById = (e, id) => {
    if (window.confirm(`Do you really want to delete product ID: "${id}"?`)) {
      dispatch(deleteSingleJobAction(id));
      if (deleteSuccess) {
        dispatch(jobLoadAction());
      }
    }
  };

  const viewJobById = (e, id) => {
    dispatch(jobLoadSingleAction(id));
  };

  const columns = [
    { field: "_id", headerName: "Job ID", width: 150 },
    { field: "title", headerName: "Role Name", width: 150 },
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
      width: 150,
      renderCell: (values) => "$" + values.row.salary,
    },
    {
      field: "Actions",
      width: 300,
      renderCell: (values) => (
        <div style={styles.actionsContainer}>
          <button
            style={{ ...styles.actionButton, ...styles.viewButton }}
            onClick={(e) => viewJobById(e, values.row._id)}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.viewButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                styles.viewButton.backgroundColor)
            }
          >
            <Link
              to={`/job/${values.row._id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              View
            </Link>
          </button>
          <button
            style={{ ...styles.actionButton, ...styles.editButton }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.editButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                styles.editButton.backgroundColor)
            }
          >
            <Link
              to={`/admin/edit/job/${values.row._id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Edit
            </Link>
          </button>
          <button
            style={{ ...styles.actionButton, ...styles.deleteButton }}
            onClick={(e) => deleteJobById(e, values.row._id)}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.deleteButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                styles.deleteButton.backgroundColor)
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 style={styles.header}>Jobs List</h2>
      <div style={styles.createButtonContainer}>
        <button
          style={styles.createButton}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.createButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor =
              styles.createButton.backgroundColor)
          }
        >
          <AddIcon style={{ marginRight: "8px" }} />
          <Link
            to="/admin/job/create"
            style={{ color: "white", textDecoration: "none" }}
          >
            Create Job
          </Link>
        </button>
      </div>
      <div style={styles.gridContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#127ce6",
                color:theme.palette.mode==="dark"?"white": "black",
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "uppercase",
              },
              "& .MuiDataGrid-row": {
                fontSize: "16px",
                backgroundColor:theme.palette.mode==="dark"?"black": "white",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e0f7fa",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashJobs;


