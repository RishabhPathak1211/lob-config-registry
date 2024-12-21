import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface BasicTableProps {
  columns: string[]; // List of column names
  columnsWithValues: Record<string, Record<string, any>>; // Values for each column and LoB
}

export default function BasicTable({ columns, columnsWithValues }: BasicTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>LOB NAME</TableCell>
            {columns.map((column) => (
              <TableCell key={column} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(columnsWithValues[columns[0]] || {}).map((lobKey) => (
            <TableRow key={lobKey}>
              <TableCell component="th" scope="row">
                {lobKey}
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column} align="center">
                  {JSON.stringify(columnsWithValues[column][lobKey]) ?? "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
