import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useGetProductsQuery } from "@/state/api";
import BoxHeader from "@/components/BoxHeader";

interface Product {
  _id: string;
  expense: string; // Now a string to match schema
  price: string;   // Now a string to match schema
  transactions: string[]; // Array of transaction IDs
}

const Products = () => {
  const { palette } = useTheme();
  const { data: productData, isLoading, error } = useGetProductsQuery();
  console.log("Product Data: ", productData);

  const productColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => params.value,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => params.value,
    },
    {
      field: "transactions",
      headerName: "Transactions",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Box>
          {params.value.length > 0 ? (
            <ul>
              {params.value.map((transactionId) => (
                <li key={transactionId}>{transactionId}</li> // Each transaction as a list item
              ))}
            </ul>
          ) : (
            <Typography>No transactions</Typography>
          )}
        </Box>
      ),
    },
  ];

  // Handling loading and error states
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
        <Typography variant="h6" color="error">
          Error loading products.
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <BoxHeader title="Products" sideText={`${productData?.length || 0} Products`} sx={{ mb: 4 }} />

      <Box
        mt="1.5rem"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            color: palette.grey[300],
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
        }}
      >
        <DataGrid
          columnHeaderHeight={40}
          rowHeight={60}
          rows={productData || []}
          columns={productColumns}
          pageSize={10}
          getRowId={(row: Product) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Products;
