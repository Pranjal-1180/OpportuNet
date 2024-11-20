// import React, { useState } from 'react';
// import HeaderTop from './HeaderTop';
// import SidebarAdm from './Sidebar';  // assuming SidebarAdm is the sidebar component

// const Layout = (WrappedComponent) => {
//     // The HOC still needs to return a component that uses hooks properly
//     return function WithLayout(props) {
//         const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

//         const toggleSidebar = () => {
//             setSidebarCollapsed(!isSidebarCollapsed);
//         };

//         return (
//             <div style={{ display: 'flex', minHeight: '100vh' }}>
//                 <SidebarAdm
//                     style={{
//                         width: isSidebarCollapsed ? '80px' : '250px',
//                         backgroundColor: '#003366',
//                         transition: 'width 0.3s',
                        
//                     }}
//                 />
//                 <div style={{ width: '100%', backgroundColor: '#edeff0' ,marginLeft: isSidebarCollapsed ? "80px" : "250px", }}>
//                     <HeaderTop onSidebarToggle={toggleSidebar} />
//                     <div style={{ padding: '16px',paddingTop: "50px", }}>
//                         {/* Render the WrappedComponent here */}
//                         <WrappedComponent {...props} />
//                     </div>
//                 </div>
//             </div>
//         );
//     };
// };

// export default Layout;

import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar"; // assuming SidebarAdm is the sidebar component

const Layout = (WrappedComponent) => {
  return function WithLayout(props) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
      setSidebarCollapsed((prev) => !prev); // Properly toggle state
    };

    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Pass the collapse state to SidebarAdm */}
        <SidebarAdm
          isCollapsed={isSidebarCollapsed}
          style={{
            width: isSidebarCollapsed ? "80px" : "250px",
            transition: "width 0.3s", // Smooth collapse effect
          }}
        />
        <div
          style={{
            flexGrow: 1, // Make this take up the remaining space
            backgroundColor: "#edeff0",
            marginLeft: isSidebarCollapsed ? "80px" : "250px", // Adjust margin dynamically
            transition: "margin-left 0.3s", // Smooth margin adjustment
          }}
        >
          <HeaderTop onSidebarToggle={toggleSidebar} />
          <div style={{ padding: "16px", paddingTop: "50px" }}>
            {/* Render the WrappedComponent here */}
            <WrappedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };
};

export default Layout;
