// import React from "react";
// import headerImage from "../images/jobbg.jpg";
// import SearchInputEl from "./SearchInputEl";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// const Header = () => {
//     const {userInfo}=useSelector((state)=>state.signIn)
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     minHeight: "400px",
//     backgroundImage: `url(${headerImage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundColor: "#f5f5f5", // Fallback background color
//   };

//   return (
//     <div>
//       <div style={headerStyle}>
//         <SearchInputEl />
//       {userInfo?(
//         <div>
//         <Link to="/admin/dashboard">
//           <button style={{ color: "blue" }}>HIRE NOW</button>
//         </Link>
//       </div>
//       ):(
//         alert("You must be logged in to access this page ")
//       )

// }
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import headerImage from "../images/jobbg.jpg";
import SearchInputEl from "./SearchInputEl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const navigate = useNavigate();

  const handleRestrictedAccess = (path, roleRequired) => {
    if (!userInfo) {
      alert("You must be logged in to access this page.");
      navigate("/login");
    } else if (userInfo.role !== roleRequired) {
      alert(
        roleRequired === 1
          ? "Only admins can access this feature."
          : "Only candidates can access this feature."
      );
    } else {
      navigate(path);
    }
  };
  

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        backgroundImage: `url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f5f5f5", // Fallback background color
        zIndex: 1,
        // marginTop: "70px",
        paddingTop: "40px",
      }}
    >
      <div style={{ position: "absolute", top: "70px", width: "80%" }}>
        <SearchInputEl />
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <button
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#87A2FF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => handleRestrictedAccess("/admin/dashboard",1)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#7E60BF";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#87A2FF";
            e.target.style.transform = "scale(1)";
          }}
        >
          Hire Now
        </button>
        <button
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#87A2FF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => handleRestrictedAccess("/user/dashboard",0)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#7E60BF";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#87A2FF";
            e.target.style.transform = "scale(1)";
          }}
        >
          Get a Job
        </button>
      </div>
    </div>
  );
};

export default Header;
