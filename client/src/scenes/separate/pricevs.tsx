import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";


const Pricevs = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <> 
      <BoxHeader title="Product Prices vs Expenses" sideText=" " />
      <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 25,
                      bottom: 40,
                      left: -10,
                    }}
                  >
                    <CartesianGrid stroke={palette.grey[800]} />
                    <XAxis
                      type="number"
                      dataKey="price"
                      name="price"
                      axisLine={false}
                      tickLine={false}
                      style={{ fontSize: "10px" }}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <YAxis
                      type="number"
                      dataKey="expense"
                      name="expense"
                      axisLine={false}
                      tickLine={false}
                      style={{ fontSize: "10px" }}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <ZAxis type="number" range={[20]} />
                    <Tooltip formatter={(v) => `$${v}`} />
                    <Scatter
                      name="Product Expense Ratio"
                      data={productExpenseData}
                      fill={palette.tertiary[500]}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
    </>
  );
};

export default Pricevs;
