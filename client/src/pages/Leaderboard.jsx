import React from "react";
import { FaCrown, FaArrowUp, FaArrowDown } from "react-icons/fa";
import TradingVolumeTable from "../components/table";
import { useState } from "react";

// FilterbY select
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import clsx from "clsx";
import TopPerformer from "../components/topPerformer";

const Leaderboard = () => {
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="m-12 mx-16 bg-white min-h-screen">
      <h1 className="text-4xl ml-4 mb-36">Leaderboard</h1>
      {/* Top Performers */}
      <TopPerformer />
      {/* Top Performers Table */}
      <div className="flex flex-col p-12 border-2  border-gray-300/30 shadow-4xl rounded-2xl">
        <div className="flex justify-between items-center mb-5 mt-0">
          <div className="flex flex-col ml-4">
            <p className="text-4xl">Top Performers</p> <br />{" "}
            <p className="text-lg -mt-2 text-[#FFAB6F]">
              Ranks are based on total volume of coins traded
            </p>{" "}
          </div>
          <div className="mr-5">
            <Box sx={{ minWidth: 140, backgroundColor: "white" }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  className="text-white"
                >
                  Filter By:
                </InputLabel>
                <Select
                  labelId="filter-select-label"
                  id="filter-select"
                  value={filter}
                  label="Filter By"
                  onChange={handleChange}
                >
                  <MenuItem value="winrate">Winrate</MenuItem>
                  <MenuItem value="total-volume">Total Volume Traded</MenuItem>
                  <MenuItem value="avg-roi">Average ROI </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        {/*Table */}
        <div className="p-4">
          <TradingVolumeTable select={filter} />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
