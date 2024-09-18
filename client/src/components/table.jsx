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
import Avatar from "@mui/material/Avatar";
// Define columns based on mock_data structure
const columns = [
  {
    id: "up",
    label: (
      <div className="flex flex-col -inset-1 space-y-0 relative">
        <div className="absolute -top-4">
          {" "}
          <ChevronUp color="#118826" />
        </div>
        <div className="absolute -top-1">
          <ChevronDown color="#820000" />
        </div>
      </div>
    ),
    minWidth: 30,
    align: "left",
    format: (value) =>
      value ? <ChevronUp color="#118826" /> : <ChevronDown color="#820000" />,
  },
  { id: "rank", label: "Rank", minWidth: 90, align: "center" },
  { id: "username", label: "Username", minWidth: 220 },

  {
    id: "averageWinRate",
    label: "Average Win Rate (%)",
    minWidth: 165,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "averageROI",
    label: "Average ROI (%)",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "totalTradingVolume",
    label: "Total Volume Traded",
    minWidth: 190,
    align: "left",
    format: (value) =>
      value.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
];

// Mock data
const mock_data = mock_data_temp;

export default function TradingVolumeTable({ select }) {
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

  const formatRank = (rank) => (rank < 10 ? `0${rank}` : rank);

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
    <>
      <TableContainer
        sx={{
          height: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
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
                  borderTop: "2px solid gray", // Top border
                  borderLeft: "2px solid gray", // Left border
                  borderRight: "2px solid gray", // Right border
                  borderBottom: "none", // Optional: remove bottom border if not needed
                  borderRadius: "20px",
                }}
              >
                {columns.map((column) => {
                  const value =
                    column.id === "rank"
                      ? formatRank(row[column.id])
                      : row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        backgroundColor: getRowColor(row.rank),
                        padding: "15px",
                        fontSize: "20px",
                        lineHeight: "45px",
                      }}
                    >
                      {column.id === "username" ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            className={`border-gray-500 border-2 rounded-full ${getRowColor(
                              row.rank
                            )}`}
                          >
                            <Avatar
                              alt={row.username}
                              src={`https://i.pravatar.cc/150?u=${row.username}`}
                              sx={{
                                border: `3px solid ${getRowColor(row.rank)}`,
                                borderRadius: "50%",
                                width: 40,
                                height: 40,
                                backgroundColor: "#fff",
                              }}
                            />
                          </div>
                          <span style={{ marginLeft: 10 }}>{row.username}</span>
                        </div>
                      ) : column.format ? (
                        column.format(value)
                      ) : (
                        value
                      )}
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
    </>
  );
}
