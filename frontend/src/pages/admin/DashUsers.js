import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction, deleteUserAction } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
const DashUsers = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUsers);
  const { success, error } = useSelector((state) => state.deleteUser);
  const data = users && users.length > 0 ? users : [];

  const ViewProfileById = (e, id) => {
    console.log(id);
  };

  const deleteUserById = (e, id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("User deleted successfully");
      dispatch(allUserAction());
    }
    if (error) {
      toast.error("Failed to delete user");
    }
  }, [success, error, dispatch]);

  const buttonStyles = {
    base: {
      border: "none",
      padding: "10px 18px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      transition: "background-color 0.3s, transform 0.2s",
    },
    view: { backgroundColor: "#4caf50", color: "#fff" },
    delete: { backgroundColor: "#f44336", color: "#fff" },
  };

  const columns = [
    { field: "_id", headerName: "User ID", flex: 1, minWidth: 150, editable: true },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "role", headerName: "User Status", flex: 1, renderCell: (params) => (params.row.role === 1 ? "Recruiter" : "Candidate") },
    {
      field: "createdAt",
      headerName: "Creation Date",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "Actions",
      flex: 1,
      renderCell: (values) => (
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            gap: "12px",
          }}
        >
          <button
            onClick={(e) => ViewProfileById(e, values.row._id)}
            style={{ ...buttonStyles.base, ...buttonStyles.view }}
          >
            <Link to={`/admin/user/profile/${values.row._id}`} style={{ color: "white", textDecoration: "none" }}>
              View Profile
            </Link>
          </button>
          <button
            onClick={(e) => deleteUserById(e, values.row._id)}
            style={{ ...buttonStyles.base, ...buttonStyles.delete }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: window.innerWidth < 768 ? "10px" : "0px",
        maxWidth: "100%",
        overflowX: "auto", 
        // backgroundColor:theme.palette.mode==="dark"?"black":"#edeff0"
      }}
    >
      <h2 style={{ color: "#127ce6",marginTop:20,marginLeft:0}}>All Users</h2>
      <div style={{ height: "550px", width: "100%", overflow: "auto" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#127ce6",
              color: theme.palette.mode === "dark" ? "white" : theme.palette.text.primary,
              fontSize: "20px",
              fontWeight: "bold",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-cell": { fontSize: "16px", padding: "10px",backgroundColor:theme.palette.mode==="dark"?"black":"white" },
            "& .MuiDataGrid-row:hover": { backgroundColor: "#e0f7fa" },
            "& .MuiDataGrid-footerContainer": { backgroundColor: "#f3e5f5" },
            "@media (max-width: 600px)": {
              "& .MuiDataGrid-columnHeaders": { fontSize: "14px" },
              "& .MuiDataGrid-cell": { fontSize: "12px" },
            },
          }}
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};

export default DashUsers;




