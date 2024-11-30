

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from '@mui/material/styles'; // Import useTheme from MUI

// Styles using makeStyles from @mui/styles
const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.divider}`, 
    borderRadius: "8px",
    boxShadow: `0 2px 8px ${theme.palette.shadow}`, 
    marginBottom: "20px",
    marginTop: "20px",
    padding: "20px",
    transition: "transform 0.2s, box-shadow 0.2s",
    backgroundColor: theme.palette.background.paper, 
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: `0 4px 16px ${theme.palette.shadow}`, 
    },
  },
  location: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary, 
    fontSize: "14px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: theme.palette.text.primary, 
    marginBottom: "5px",
  },
  category: {
    color: theme.palette.text.disabled, 
    marginBottom: "10px",
  },
  description: {
    color: theme.palette.text.secondary, 
    marginBottom: "15px",
  },
  button: {
    backgroundColor: theme.palette.primary.main, 
    color: theme.palette.primary.contrastText, 
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main, 
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
  const theme = useTheme(); 
  const classes = useStyles(theme); 

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
