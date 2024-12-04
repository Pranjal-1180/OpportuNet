import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar"; 

const Layout = (WrappedComponent) => {
  return function WithLayout(props) {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
      setSidebarCollapsed((prev) => !prev); // Properly toggle state
    };

    // Determine if the screen width is small for responsive design
    const isMobile = window.innerWidth <= 768; 

    const layoutStyles = {
      display: "flex",
      minHeight: "100vh",
      flexDirection: isMobile ? "column" : "row", 
    };

    const sidebarStyles = {
      width: isSidebarCollapsed ? "120px" : "160px",
      transition: "width 0.3s",
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 1000,
      overflowY: "auto", 
      ...(isMobile && { width: "0", display: "none" }), 
    };

    const contentStyles = {
      flexGrow: 1,
      backgroundColor: "#edeff0",
      marginLeft: isSidebarCollapsed ? "120px" : "160px",
      transition: "margin-left 0.3s",
      paddingTop: "66px", 
      padding: "16px",
      width: "100%",
      ...(isMobile && { marginLeft: 0 }), 
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




