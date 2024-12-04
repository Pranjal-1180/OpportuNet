import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

const SelectComponent = ({ handleChangeCategory, cat }) => {

    const { jobType } = useSelector(state => state.jobTypeAll);

    return (
        <Box sx={{ minWidth: 100 }}> 
          <FormControl fullWidth size="small"> 
            <InputLabel
              id="demo-simple-select-label"
              sx={{ fontSize: "14px" }} 
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cat}
              label="Category"
              onChange={handleChangeCategory}
              sx={{ fontSize: "14px", padding: "8px" }} 
            >
              <MenuItem value="" sx={{ fontSize: "14px" }}> 
                All
              </MenuItem>
              {jobType &&
                jobType.map((jt) => (
                  <MenuItem key={jt._id} value={jt._id} sx={{ fontSize: "14px" }}> 
                    {jt.jobTypeName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      );
    };
    
    export default SelectComponent;