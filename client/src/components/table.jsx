import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { mock_data_temp } from "/src/montly_mock_data.js";
import { ChevronUp, ChevronDown } from "lucide-react";

// Define columns based on mock_data structure
const columns = [
  {
    id: "up",
    label: "Up",
    minWidth: 30,
    align: "left",
    format: (value) =>
      value ? <ChevronUp color="#820000" /> : <ChevronDown color="#118826" />,
  },
  { id: "rank", label: "Rank", minWidth: 50 },
  { id: "username", label: "Username", minWidth: 150 },

  {
    id: "averageWinRate",
    label: "Average Win Rate (%)",
    minWidth: 150,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "averageROI",
    label: "Average ROI (%)",
    minWidth: 150,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "totalTradingVolume",
    label: "Total Volume Traded",
    minWidth: 150,
    align: "left",
    format: (value) =>
      value.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
];

// Mock data
export const mock_data = mock_data_temp;

export default function TradingVolumeTable() {
  const [page, setPage] = React.useState(1); // Start from 1
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1); // Reset page to 1 on rows per page change
  };

  const paginatedData = mock_data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getRowColor = (rank) => {
    switch (rank) {
      case 1:
        return "#FEEFAD"; // Gold for 1st
      case 2:
        return "#C9FCE5"; // Silver for 2nd
      case 3:
        return "#EBFECA"; // Bronze for 3rd
      default:
        return "transparent";
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{ height: "100%", borderRadius: "15px", overflow: "hidden" }}
      >
        <Table
          stickyHeader
          aria-label="trading volume table"
          sx={{
            tableLayout: "fixed",
            borderCollapse: "separate", // Ensure border-spacing applies
            borderSpacing: "0 15px", // Vertical spacing between rows
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.minWidth }}
                  sx={{
                    color: "#272932",
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                    border: "none", // Border for table headers
                    padding: "15px",
                    textTransform: "uppercase",
                    textAlign: column.align,
                    fontSize: "16px", // Font size for header cells
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.rank}
                sx={{
                  backgroundColor: getRowColor(row.rank),
                  borderBottom: "none", // Remove row borders
                  borderRadius: "20px",
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        backgroundColor: getRowColor(row.rank),
                        border: "none", // Remove cell borders
                        padding: "15px", // Padding within the cells
                        fontSize: "20px", // Font size for cell text
                        lineHeight: "45px",
                      }}
                    >
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(mock_data.length / rowsPerPage)} // Total pages
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        color="default"
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: 4,
          ".MuiPaginationItem-page.Mui-selected": {
            // Customize selected item styles
            backgroundColor: "#FF9141", // Background color for selected item
            color: "white", // Text color for selected item
          },
        }}
      />
    </Paper>
  );
}
