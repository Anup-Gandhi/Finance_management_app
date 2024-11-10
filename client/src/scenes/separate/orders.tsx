// src/scenes/separate/OrdersPage.tsx
import React from "react";
import { useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import BoxHeader from "@/components/BoxHeader";

const OrdersPage = () => {
  const { palette } = useTheme();
  const { data: transactionData, isLoading } = useGetTransactionsQuery();

  const transactionColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Product Count",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <BoxHeader 
        title={<Typography color="whitesmoke" fontWeight="bold">Orders</Typography>} 
        sideText={<Typography color="lightgray">{`${transactionData?.length || 0} Orders`}</Typography>}
      />
      <Box
        mt="1rem"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            color: "whitesmoke",
            border: "none",
            fontSize: "0.95rem",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[700]} !important`,
            padding: "0.5rem",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333333",               // Darker background for header
            color: "black",                          // Silver color for better readability
            fontSize: "1.05rem",
            fontWeight: "bold",                       // Bold font for column headers
            borderBottom: `2px solid ${palette.grey[700]} !important`,
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: palette.grey[800],
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: palette.grey[900],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#222222",               // Dark background for footer
            color: "whitesmoke",
          },
          "& .MuiTablePagination-root": {
            color: "whitesmoke",
          },
          "& .MuiSelect-select": {
            backgroundColor: "silver",
            color: "black",
          },
        }}
      >
        {isLoading ? (
          <Typography color="whitesmoke">Loading...</Typography>
        ) : (
          <DataGrid
            rows={transactionData || []}
            columns={transactionColumns}
            getRowId={(row) => row._id}
            columnHeaderHeight={45}                   // Increased header height for readability
            rowHeight={50}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;
