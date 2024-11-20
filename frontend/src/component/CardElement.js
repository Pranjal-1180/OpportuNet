import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";

// Styles using makeStyles from @mui/styles
const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    marginTop: "20px",
    padding: "20px",
    transition: "transform 0.2s, box-shadow 0.2s",
    backgroundColor: "#fff",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    },
  },
  location: {
    display: "flex",
    alignItems: "center",
    color: "#757575",
    fontSize: "14px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
  },
  category: {
    color: "#9e9e9e",
    marginBottom: "10px",
  },
  description: {
    color: "#555",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#87A2FF",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#7E60BF",
    },
  },
}));

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  applied,
  fromUserJobsHistory,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.location}>
        <LocationOnIcon style={{ marginRight: "5px", fontSize: "18px" }} />
        {location}
      </div>
      <div className={classes.title}>{jobTitle}</div>
      <div className={classes.category}>Category: {category}</div>
      <div className={classes.description}>
        Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
      </div>
      {applied && <p style={{ color: "green", fontWeight: "bold" }}>Applied</p>}
      <Link
        to={fromUserJobsHistory ? `/job/${id}/appliedJobDetail` : `/job/${id}`}
        style={{ textDecoration: "none" }}
      >
        <div className={classes.button}>
          <AddIcon style={{ marginRight: "5px" }} />
          More Details
        </div>
      </Link>
    </div>
  );
};

export default CardElement;
