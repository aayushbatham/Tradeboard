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

const topPerformers = [
  {
    rank: 1,
    name: "Username",
    total: "$50,000",
    iconColor: "text-yellow-500",
    image: "path/to/image1.jpg",
  },
  {
    rank: 2,
    name: "Username",
    total: "$48,000",
    iconColor: "text-green-500",
    image: "path/to/image2.jpg",
  },
  {
    rank: 3,
    name: "Username",
    total: "$45,000",
    iconColor: "text-green-500",
    image: "path/to/image3.jpg",
  },
];

const Leaderboard = () => {
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="m-12 mx-16 bg-white min-h-screen">
      <h1 className="text-3xl ml-4 mb-8">Leaderboard</h1>
      {/* Top Performers */}
      <div className="flex justify-center items-center space-x-8 mb-10 p-28 m-auto w-2/3">
        {topPerformers.map((performer, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circle container with crown */}
            <div
              className={`relative mb-4 w-32 h-32 rounded-full border-4 ${performer.borderColor} flex items-center justify-center`}
            >
              <img
                src={performer.image}
                alt={performer.name}
                className="w-28 h-28 rounded-full object-cover"
              />
              {/* Crown icon */}
              <FaCrown
                className={`absolute -top-5 left-1/2 transform -translate-x-1/2 text-5xl ${performer.crownColor}`}
              />
            </div>
            {/* Rank number styling */}
            <p className={`text-lg font-bold ${performer.rankColor}`}>
              {performer.rank}
            </p>
            <p className="text-lg font-bold">{performer.name}</p>
            <p className="text-sm text-gray-500">{performer.total}</p>
          </div>
        ))}
      </div>
      {/* Top Performers Table */}
      <div className="flex flex-col p-8 border-1  border-gray-300 shadow-2xl rounded-md">
        <div className="flex justify-between items-center mb-10 mt-2">
          <div className="flex flex-col">
            <p className="text-2xl">Top Performers</p> <br />{" "}
            <p className="text-sm -mt-3 text-[#FFAB6F]">
              Ranks are based on total volume of coins traded
            </p>{" "}
          </div>
          <div>
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
        <TradingVolumeTable />
      </div>
    </div>
  );
};

export default Leaderboard;
