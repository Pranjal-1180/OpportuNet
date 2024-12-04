

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.divider}`, 
    borderRadius: "6px", 
    boxShadow: `0 1px 6px ${theme.palette.shadow}`, 
    marginBottom: "16px", 
    marginTop: "16px", 
    padding: "15px", 
    transition: "transform 0.2s, box-shadow 0.2s",
    backgroundColor: theme.palette.background.paper, 
    "&:hover": {
      transform: "scale(1.01)", 
      boxShadow: `0 3px 12px ${theme.palette.shadow}`, 
    },
  },
  location: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary, 
    fontSize: "12px", 
    marginBottom: "8px", 
  },
  title: {
    fontSize: "16px", 
    fontWeight: "600",
    color: theme.palette.text.primary, 
    marginBottom: "4px", 
  },
  category: {
    color: theme.palette.text.disabled, 
    marginBottom: "8px", 
    fontSize:"14px",
  },
  description: {
    color: theme.palette.text.secondary, 
    marginBottom: "8px", 
    fontSize:"14px",
  },
  button: {
    backgroundColor: theme.palette.primary.main, 
    color: theme.palette.primary.contrastText, 
    padding: "4px 8px", 
    border: "none",
    borderRadius: "3px", 
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "14px", 
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
        <LocationOnIcon style={{ marginRight: "4px", fontSize: "16px" }} /> {/* Reduced icon size */}
        {location}
      </div>
      <div className={classes.title}>{jobTitle}</div>
      <div className={classes.category}>Category: {category}</div>
      <div className={classes.description}>
        Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
      </div>
      {applied && <p style={{ color: "green", fontWeight: "bold", fontSize: "14px" }}>Applied</p>}
      <Link
        to={fromUserJobsHistory ? `/job/${id}/appliedJobDetail` : `/job/${id}`}
        style={{ textDecoration: "none" }}
      >
        <div className={classes.button}>
          <AddIcon style={{ marginRight: "4px", fontSize: "16px" }} />
          More Details
        </div>
      </Link>
    </div>
  );
};

export default CardElement;

