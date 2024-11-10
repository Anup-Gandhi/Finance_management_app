// src/components/ExpenseBreakdown.tsx
import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import BoxHeader from "@/components/BoxHeader";
import { useGetKpisQuery } from "@/state/api";

const ExpenseBreakdown = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.secondary[500]];

  const { data: kpiData } = useGetKpisQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory)
        .filter(([, value]) => value > 0) // Filter out zero-value categories
        .map(([key, value]) => {
          return [
            {
              name: key,
              value: value,
              percentage: ((value / totalExpenses) * 100).toFixed(2) + "%",
            },
            {
              name: "Other",
              value: totalExpenses - value,
              percentage: ((totalExpenses - value) / totalExpenses * 100).toFixed(2) + "%",
            },
          ];
        });
    }
    return [];
  }, [kpiData]);
  const BoxHeader = ({ title, sideText, titleSize = "h3", sideTextSize = "body1" }) => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant={titleSize}>{title}</Typography>
        <Typography variant={sideTextSize} color="primary">{sideText}</Typography>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" padding="2rem">
      <BoxHeader title="Expense Breakdown By Category" sideText={`Total: $${kpiData?.[0].totalExpenses || 0}`} />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="2rem"
        mt="2rem"
      >
        {pieChartData.map((data, i) => (
          <Box key={`${data[0].name}-${i}`} display="flex" flexDirection="column" alignItems="center">
            <PieChart width={200} height={200}>
              <Pie
                stroke="none"
                data={data}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
            <Typography variant="h3" color="white" mt="0.5rem">
              {data[0].name} ({data[0].percentage})
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseBreakdown;
