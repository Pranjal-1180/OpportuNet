// import React from "react";

// const StatComponent = ({ value, icon, description, money }) => {
//   return (
//     <div
//       style={{
//         backgroundColor: "#2C3E50",
//         width: "100%",
//         padding: "16px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           marginBottom: "16px",
//           backgroundColor: "#2980B9",
//           padding: "8px",
//           borderRadius: "50%",
//         }}
//       >
//         {icon}
//       </div>
//       <h4 style={{ color: "#fafafa", marginBottom: "4px", fontWeight: "700" }}>
//         {money !== "" ? money + value : value}
//       </h4>
//       <p style={{ color: "#2980B9", marginBottom: "0" }}>{description}</p>
//     </div>
//   );
// };

// export default StatComponent;

import React from "react";

const StatComponent = ({ value, icon, description, money }) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "600px",
        height:"300px",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          backgroundColor: "#f0f0f0",
          padding: "12px",
          borderRadius: "50%",
          
        }}
      >
        <span style={{ fontSize: "24px", color: "#34495e" }}>{icon}</span>
      </div>
      <h4 style={{ color: "#2c3e50", marginBottom: "4px", fontWeight: "700" }}>
        {money !== "" ? money + value : value}
      </h4>
      <p style={{ color: "#7f8c8d", marginBottom: "0" }}>{description}</p>
    </div>
  );
};

export default StatComponent;

