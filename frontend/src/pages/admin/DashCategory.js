import React, { useEffect } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  jobTypeLoadAction,
  deleteJobTypeAction,
} from "../../redux/actions/jobTypeAction";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
const DashCategory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(jobTypeLoadAction()); 
  }, [dispatch]);

  const { jobType, loading } = useSelector((state) => state.jobTypeAll);

  let data = jobType && jobType.length > 0 ? jobType : [];

  // Delete job category by ID
  const deleteJobCategoryById = (e, id) => {
    if (
      window.confirm(`Are you sure you want to delete category ID: "${id}"?`)
    ) {
      dispatch(deleteJobTypeAction(id)); // Dispatch delete action
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "Category ID",
      width: 200,
    },
    {
      field: "jobTypeName",
      headerName: "Category",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "Actions",
      width: 250,
      renderCell: (values) => (
        <div style={styles.actionsContainer}>
          <button style={styles.editButton}>
            <Link
              style={styles.link}
              to={`/admin/edit/category/${values.row._id}`}
            >
              Edit
            </Link>
          </button>
          <button
            onClick={(e) => deleteJobCategoryById(e, values.row._id)}
            style={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const styles = {
    header: {
      color: "#127ce6",
      paddingBottom: "11px",
      fontSize: "1.3rem",
      fontWeight: "bold",
    },
    createButtonContainer: {
      display: "flex",
      justifyContent: "flex-start",
      paddingBottom: "14px",
    },
    createButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#2ecc71",
      color: "white",
      padding: "6px 12px",
      borderRadius: "8px",
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.8rem",
      transition: "background-color 0.3s",
    },
    createButtonHover: {
      backgroundColor: "#27ae60",
    },
    link: {
      color: "white",
      textDecoration: "none",
    },
    gridContainer: {
      backgroundColor: "#f8f9fa",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      height: "900px",
    },
    actionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "10px",
    },
    editButton: {
      padding: "6px 10px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.8rem",
    },
    deleteButton: {
      padding: "6px 10px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.8rem",
    },
  };

  return (
    <div>
      <h3 style={styles.header}>Job Categories</h3>
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
          <Link style={styles.link} to="/admin/category/create">
            Create Category
          </Link>
        </button>
      </div>
      <div style={styles.gridContainer}>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#127ce6",
                color:theme.palette.mode==="dark"?"white": "black",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              },
              "& .MuiDataGrid-row": {
                fontSize: "14px",
                backgroundColor:theme.palette.mode==="dark"?"black": "white",
              },
              "& .MuiTablePagination-displayedRows": {
                color: "#34495e",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashCategory;


