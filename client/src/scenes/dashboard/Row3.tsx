// src/components/Row3.tsx
import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";
import { Link } from "react-router-dom"; // For creating navigation links
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  // Process pie chart data while filtering out 0% expense categories
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory)
        .filter(([, value]) => value > 0) // Filter out categories with 0% expense
        .map(([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
    return [];
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
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
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      {/* Link to Products Page */}
      <DashboardBox
        gridArea="g"
        component={Link}
        to="/products"
        style={{
          textDecoration: "none",
          color: "inherit",
          transition: "background-color 0.3s ease",
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary[900],
          },
        }}
      >
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
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
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* Link to Orders Page */}
      <DashboardBox
        gridArea="h"
        component={Link}
        to="/orders"
        style={{
          textDecoration: "none",
          color: "inherit",
          transition: "background-color 0.3s ease",
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary[900],
          },
        }}
      >
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
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
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      {/* Link to Expense Breakdown Page */}
      <DashboardBox
        gridArea="i"
        component={Link}
        to="/expenses"
        style={{
          textDecoration: "none",
          color: "inherit",
          transition: "background-color 0.3s ease",
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary[900],
          },
        }}
      >
        <BoxHeader title="Expense Breakdown By Category" sideText=" " />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* Link to Summary and Explanation Page */}
      <DashboardBox
        gridArea="j"
        component={Link}
        to="/summary" // Link to the new Summary and Explanation page
        style={{
          textDecoration: "none",
          color: "inherit",
          transition: "background-color 0.3s ease",
        }}
        sx={{
          "&:hover": {
            backgroundColor: palette.primary[900],
          },
        }}
      >
        <BoxHeader
          title="Summary and Explanation"
          sideText="Edit/Update"
        />
        <Box>
          <Typography variant="h6">
            Add your summary and explanation for the data here.
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
