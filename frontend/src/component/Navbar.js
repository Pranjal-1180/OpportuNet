import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../redux/actions/userAction";
import { toggleActionTheme } from '../redux/actions/themeAction';
import { DarkMode, LightMode, Person, Work } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

const Navbar = () => {
  const { mode } = useSelector((state) => state.mode);
  const { userInfo } = useSelector((state) => state.signIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);

  const handleOpenNavMenu = () => {
    setAnchorElNav(!anchorElNav);
  };

  const handleOpenUserMenu = () => {
    setAnchorElUser(!anchorElUser);
  };

  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const toggleTheme = () => {
    dispatch(toggleActionTheme());
  };

 

  return (
    <header
      style={{
        position: "fixed",
        backgroundColor: mode === "light" ? "#7E60BF" : "#333",
        padding: "10px 20px",
        display: "flex",
         width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        zIndex: 1000,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton style={{ color: "white" }}>
          <Work />
        </IconButton>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            OpportuNet
          </Link>
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={toggleTheme} style={{ color: "white" }}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

        <IconButton onClick={handleOpenUserMenu} style={{ color: "white", marginLeft: "10px" }}>
          <Person />
        </IconButton>

        <div
          style={{
            display: anchorElUser ? "block" : "none",
            backgroundColor: "white",
            position: "absolute",
            top: "50px",
            right: "50px",
            padding: "10px",
            borderRadius: "8px",
            
          }}
        >
          {/* <div style={{ padding: "10px 0" }}>
            <span
              onClick={() => handleRestrictedAccess("/admin/dashboard")}
              style={{ textDecoration: "none", color: "#1976d2", cursor: "pointer" }}
            >
              Hire Now
            </span>
          </div>

          <div style={{ padding: "10px 0" }}>
            <span
              onClick={() => handleRestrictedAccess("/user/dashboard")}
              style={{ textDecoration: "none", color: "#1976d2", cursor: "pointer" }}
            >
              User Dashboard
            </span>
          </div> */}

          {!userInfo ? (
            <>
              <div style={{ padding: "10px 0"}}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Log In
                </Link>
              </div>
              <div style={{ padding: "10px 0" }}>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <div
              style={{ padding: "10px 0", cursor: "pointer" }}
              onClick={logOutUser}
            >
              <span style={{ textDecoration: "none", color: "#1976d2" }}>
                Log Out
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { userLogoutAction } from "../redux/actions/userAction";
// import { toggleActionTheme } from '../redux/actions/themeAction';  // Import theme toggle action
// import { DarkMode, LightMode, Person, Work } from "@mui/icons-material";  // Import Material-UI icons
// import IconButton from '@mui/material/IconButton';  // Import IconButton

// const Navbar = () => {
//   const { mode } = useSelector((state) => state.mode);  // Access the mode state from Redux
//   const { userInfo } = useSelector((state) => state.signIn);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [anchorElNav, setAnchorElNav] = React.useState(false);
//   const [anchorElUser, setAnchorElUser] = React.useState(false);

//   const handleOpenNavMenu = () => {
//     setAnchorElNav(!anchorElNav);
//   };

//   const handleOpenUserMenu = () => {
//     setAnchorElUser(!anchorElUser);
//   };

//   const logOutUser = () => {
//     dispatch(userLogoutAction());
//     window.location.reload(true);
//     setTimeout(() => {
//       navigate("/");
//     }, 500);
//   };

//   // Toggle theme
//   const toggleTheme = () => {
//     dispatch(toggleActionTheme());
//   };

//   return (
//     <header
//       style={{
//         backgroundColor: mode === "light" ? "#1976d2" : "#333", // Use the mode from Redux
//         padding: "10px 20px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         color: "white",
       
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <IconButton style={{ color: "white" }}>
//           <Work />
//         </IconButton>
//         <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
//           <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//           OpportuNet 
//           </Link>
//         </h1>
//       </div>

//       <div style={{ display: "flex", alignItems: "center" }}>
//         <IconButton onClick={toggleTheme} style={{ color: "white" }}>
//           {mode === "light" ? <DarkMode /> : <LightMode />}
//         </IconButton>

//         <IconButton onClick={handleOpenUserMenu} style={{ color: "white", marginLeft: "10px" }}>
//           <Person />
//         </IconButton>

//         <div
//           style={{
//             display: anchorElUser ? "block" : "none",
//             backgroundColor: "white",
//             position: "absolute",
//             top: "50px",
//             right: "50px",
//             padding: "10px",
//             borderRadius: "8px",
//           }}
//         >
//           <div style={{ padding: "10px 0" }}>
//             <Link
//               to="/admin/dashboard"
//               style={{ textDecoration: "none", color: "#1976d2" }}
//             >
//               Hire Now
//             </Link>
//           </div>

//           <div style={{ padding: "10px 0" }}>
//             <Link
//               to="/user/dashboard"
//               style={{ textDecoration: "none", color: "#1976d2" }}
//             >
//               User Dashboard
//             </Link>
//           </div>

//           {!userInfo ? (
//             <>
//               <div style={{ padding: "10px 0" }}>
//                 <Link
//                   to="/login"
//                   style={{ textDecoration: "none", color: "#1976d2" }}
//                 >
//                   Log In
//                 </Link>
//               </div>
//               <div style={{ padding: "10px 0" }}>
//                 <Link
//                   to="/register" // Change this to the route for the sign-up page
//                   style={{ textDecoration: "none", color: "#1976d2" }}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <div
//               style={{ padding: "10px 0", cursor: "pointer" }}
//               onClick={logOutUser}
//             >
//               <span style={{ textDecoration: "none", color: "#1976d2" }}>
//                 Log Out
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
