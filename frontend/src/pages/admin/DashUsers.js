import React, { useEffect } from "react";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction, deleteUserAction } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
const DashUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUsers);
  const { loading, success, error } = useSelector((state) => state.deleteUser); 
  let data = users && users.length > 0 ? users : [];

  const ViewProfileById=(e,id)=>{
    // dispatch((id));
    console.log(id)
  }
  // Handle user deletion
  const deleteUserById = (e, id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id)); // Dispatch deleteUser action
    }
  };

  // Handle success/error feedback
  useEffect(() => {
    if (success) {
      toast.success("User deleted successfully");
      dispatch(allUserAction()); // Re-fetch users after successful deletion
    }
    if (error) {
      toast.error("Failed to delete user");
    }
  }, [success, error, dispatch]);


  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "E_mail",
      width: 150,
    },
    {
      field: "role",
      headerName: "User status",
      width: 150,
      renderCell: (params) =>
        params.row.role === 1 ? "Admin" : "Regular user",
    },
    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <button onClick={(e) => ViewProfileById(e, values.row._id)}
            style={{
              backgroundColor: "#3f51b5",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
          >
            <Link
              to={`/admin/user/profile/${values.row._id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              View Profile
            </Link>
          </button>
          <button
            onClick={(e) => deleteUserById(e, values.row._id)}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "5px 10px",
               
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{  }}>
        <h2 style={{ color: "#127ce6", paddingBottom: "20px" }}>All users</h2>
        <div
          style={{
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          
        </div>
        <div
          style={{
            backgroundColor: "#2c387e",
            padding: "20px",
            borderRadius: "4px",
          }}
        >
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "white",
                },
                color: "white",
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) => theme.palette.secondary.main,
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(0, 0, 0, 0.87)", // Set background color for header
                  color: "black", // Set text color for header
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashUsers;
