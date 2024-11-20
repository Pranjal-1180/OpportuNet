const ChartComponent = ({ children }) => {
  // Replace the MUI theme with a custom theme (if needed)
  const theme = {
    secondary: {
      midNightBlue: "#003366", // Your custom color
    },
  };

  return (
    <div
      style={{
        backgroundColor: theme.secondary.midNightBlue,
        width: "100%",
        borderRadius: "8px", // Optional: Styling to mimic the card
        padding: "16px", // Padding for inner content
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Adding a shadow
      }}
    >
      <div>
        {children} {/* Render the passed child components here */}
      </div>
    </div>
  );
};

export default ChartComponent;
