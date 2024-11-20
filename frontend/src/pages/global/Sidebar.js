// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logoDashboard from "../../images/hr-project.png"; // Adjust the path as needed
// import { useDispatch } from "react-redux";
// import { userLogoutAction } from "../../redux/actions/userAction";

// const SidebarAdm = ({ isCollapsed, userInfo }) => {
//   const [selectedItem, setSelectedItem] = useState(null); // Track selected item
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleItemClick = (item) => {
//     setSelectedItem(item); // Update selected item
//   };

//   const logOut = () => {
//     dispatch(userLogoutAction());
//     setTimeout(() => {
//       navigate("/");
//     }, 500); // Redirect after logout
//   };

//   const width = isCollapsed ? "80px" : "250px";

//   return (
//     <div
//       style={{
//         width,
//         backgroundColor: "#7E60BF",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         overflowY: "hidden",
//         zIndex: 1000,
//         transition: "width 0.3s", // Smooth width transition
//       }}
//     >
//       {/* Logo Section */}
//       <div>
//         <div
//           style={{
//             paddingTop: "20px",
//             paddingBottom: "40px",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             style={{
//               width: isCollapsed ? "50px" : "100px", // Adjust logo size when collapsed
//               height: isCollapsed ? "50px" : "100px",
//               borderRadius: "50%",
//               transition: "all 0.3s", // Smooth transition for size
//             }}
//             src={logoDashboard}
//             alt="logo dashboard"
//           />
//         </div>

//         {/* Navigation Links */}
//         <ul
//           style={{
//             listStyle: "none",
//             paddingLeft: isCollapsed ? "10px" : "30px", // Adjust padding
//             paddingRight: "10px",
//           }}
//         >
//           {userInfo && userInfo.role === 1 ? (
//             <>
//               <li
//                 onClick={() => handleItemClick("admin-dashboard")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "admin-dashboard" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "admin-dashboard" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/admin/dashboard"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fa-solid fa-table-columns"></i>{" "}
//                   {!isCollapsed && <span>Dashboard</span>}
//                 </Link>
//               </li>
//               <li
//                 onClick={() => handleItemClick("admin-users")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "admin-users" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "admin-users" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/admin/users"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fas fa-users"></i>{" "}
//                   {!isCollapsed && <span>Users</span>}
//                 </Link>
//               </li>
//               <li
//                 onClick={() => handleItemClick("admin-jobs")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "admin-jobs" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "admin-jobs" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/admin/jobs"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fas fa-briefcase"></i>{" "}
//                   {!isCollapsed && <span>Jobs</span>}
//                 </Link>
//               </li>
//               <li
//                 onClick={() => handleItemClick("admin-category")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "admin-category" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "admin-category" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/admin/category"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fas fa-list-alt"></i>{" "}
//                   {!isCollapsed && <span>Category</span>}
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li
//                 onClick={() => handleItemClick("user-dashboard")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "user-dashboard" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "user-dashboard" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/user/dashboard"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fa-solid fa-table-columns"></i>{" "}
//                   {!isCollapsed && <span>Dashboard</span>}
//                 </Link>
//               </li>
//               <li
//                 onClick={() => handleItemClick("all-jobs")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "all-jobs" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "all-jobs" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/alljobs"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fas fa-briefcase"></i>{" "}
//                   {!isCollapsed && <span>All Jobs</span>}
//                 </Link>
//               </li>
//               <li
//                 onClick={() => handleItemClick("applied-jobs")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "applied-jobs" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "applied-jobs" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/user/jobs"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fas fa-history"></i>{" "}
//                   {!isCollapsed && <span>Applied Jobs</span>}
//                 </Link>
//               </li>
//               <li
//                 onClick={() => handleItemClick("personal-info")}
//                 style={{
//                   padding: "10px",
//                   color: "#fafafa",
//                   backgroundColor:
//                     selectedItem === "personal-info" ? "#5a45a5" : "transparent",
//                   borderRadius: "5px",
//                   transition: "background-color 0.3s",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#6b56b7")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor =
//                     selectedItem === "personal-info" ? "#5a45a5" : "transparent")
//                 }
//               >
//                 <Link
//                   to="/user/updateinfo"
//                   style={{ color: "#fafafa", textDecoration: "none" }}
//                 >
//                   <i className="fas fa-user"></i>{" "}
//                   {!isCollapsed && <span>Personal Info</span>}
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Logout Section */}
//       <div>
//         <li
//           style={{
//             padding: "10px",
//             color: "#fafafa",
//             textAlign: "center",
//             cursor: "pointer",
//           }}
//           onClick={logOut}
//         >
//           <i className="fas fa-sign-out-alt"></i>{" "}
//           {!isCollapsed && <span>Log Out</span>}
//         </li>
//       </div>
//     </div>
//   );
// };

// export default SidebarAdm;






import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogoutAction,
  userProfileAction,
} from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import logoDashboard from "../../images/hr-project.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SidebarAdm = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  // Log out
  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#7E60BF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed", // Make it fixed
        top: 0, // Align it to the top of the viewport
        left: 0, // Align it to the left of the viewport
        overflowY: "hidden", // Prevent scrolling inside the sidebar
        zIndex: 1000,
      }}
    >
      <div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "100px",
              height: "100px",
              textAlign: "center",
              borderRadius: "50%",
              transition: "all ease-out .5s",
              
            }}
            src={logoDashboard}
            alt="logo dashboard"
          />
        </div>

        <ul style={{ listStyle: "none", paddingLeft: "30px" }}>
          {userInfo && userInfo.role === 1 ? (
            <>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/dashboard"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fa-solid fa-table-columns"></i> Dashboard
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/users"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-users"></i> Users
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/jobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-briefcase"></i> Jobs
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/category"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-list-alt"></i> Category
                </Link>
              </li>
            </>
          ) : (
            <>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/user/dashboard"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fa-solid fa-table-columns"></i> Dashboard
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/alljobs" // Add this link for AllJobs
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-briefcase"></i> All Jobs
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/user/jobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-history"></i> Applied Jobs
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/user/info"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-user"></i> Personal Info
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div style={{ paddingBottom: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px", color: "#fafafa" }}>
            <span
              onClick={logOut}
              style={{ cursor: "pointer", color: "#fafafa" }}
            >
              <i className="fas fa-sign-out-alt"></i> Log out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdm;
