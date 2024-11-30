import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInputEl = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // State to manage search input
  const [error, setError] = useState(""); // State to manage error message

  // Handle input change
  const handleChange = (e) => {
    setSearch(e.target.value);
    setError(""); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!search.trim()) {
      navigate("/");
    } else {
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "50%", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="ex: developer, front end"
          value={search}
          onChange={handleChange}
          style={{
            backgroundColor: "white",
            padding: "10px",
            flexGrow: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#87A2FF", // Primary color
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.1s ease", 
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#7E60BF"; 
            e.target.style.transform = "scale(1.1)"; 
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#87A2FF"; 
            e.target.style.transform = "scale(1)"; 
          }}
        >
          Search
        </button>
      </div>
      {/* Display error message if validation fails */}
      {error && (
        <div style={{ color: "orange", marginTop: "5px" }}>{error}</div>
      )}
    </form>
  );
};

export default SearchInputEl;
