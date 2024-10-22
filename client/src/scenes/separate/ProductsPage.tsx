import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useGetProductsQuery } from "@/state/api";
import BoxHeader from "@/components/BoxHeader";

const ProductsPage = () => {
  const { palette } = useTheme();
  const { data: productData } = useGetProductsQuery();

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
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.75,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <BoxHeader title="Products" sideText={`${productData?.length} Products`} />

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
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
