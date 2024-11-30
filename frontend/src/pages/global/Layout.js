import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar"; // Assuming SidebarAdm is the sidebar component

const Layout = (WrappedComponent) => {
  return function WithLayout(props) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
      setSidebarCollapsed((prev) => !prev); // Properly toggle state
    };

    // Determine if the screen width is small for responsive design
    const isMobile = window.innerWidth <= 768; // You can adjust the breakpoint as needed

    const layoutStyles = {
      display: "flex",
      minHeight: "100vh",
      flexDirection: isMobile ? "column" : "row", // Stack vertically on small screens
    };

    const sidebarStyles = {
      width: isSidebarCollapsed ? "150px" : "250px",
      transition: "width 0.3s",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 1000,
      overflowY: "auto", // Ensure sidebar is scrollable if needed
      ...(isMobile && { width: "0", display: "none" }), // Hide sidebar on small screens
    };

    const contentStyles = {
      flexGrow: 1,
      backgroundColor: "#edeff0",
      marginLeft: isSidebarCollapsed ? "150px" : "250px",
      transition: "margin-left 0.3s",
      paddingTop: "66px", 
      padding: "16px",
      width: "100%",
      ...(isMobile && { marginLeft: 0 }), // Full width on small screens
    };

    return (
      <div style={layoutStyles}>
        {/* Sidebar */}
        <SidebarAdm
          isCollapsed={isSidebarCollapsed}
          style={sidebarStyles}
        />

        {/* Main Content */}
        <div style={contentStyles}>
          {/* HeaderTop with isSidebarCollapsed prop */}
          <HeaderTop
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <div style={{ padding: "0px", paddingTop: "35px" }}>
            <WrappedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };
};

export default Layout;




