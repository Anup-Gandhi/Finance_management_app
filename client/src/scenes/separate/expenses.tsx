// src/components/ExpenseBreakdown.tsx
import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";
import FlexBetween from "@/components/FlexBetween";
import BoxHeader from "@/components/BoxHeader";
import { useGetKpisQuery } from "@/state/api";

const ExpenseBreakdown = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
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
        }
      );
    }
  }, [kpiData]);

  return (
    <Box gridArea="i">
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
    </Box>
  );
};

export default ExpenseBreakdown;
