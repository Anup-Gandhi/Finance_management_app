import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Removed duplicate imports
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";
import Products from "./scenes/separate/Products";
import Revenue from "./scenes/separate/revenue";
import Profit from "./scenes/separate/profit";
import Operation from "@/scenes/separate/operation";
import Pricevs from "./scenes/separate/pricevs";
import Month from "./scenes/separate/month";
 import Orders from "@/scenes/separate/orders";      
 import ExpenseBreakdown from "@/scenes/separate/expenses";  
 import SummaryPage from "@/scenes/separate/SummaryPage";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem ">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
               path="/predictions"
               element={<Predictions/>} />
               <Route path="/products" element={<Products />} />
               <Route path="/operation" element={<Operation />} />
               <Route path="/price-vs-expenses" element={<Pricevs />} />
               <Route path="/Revenue" element={<Revenue />} />
               <Route path="/Profit" element={<Profit />} />
               <Route path="/Month" element={<Month />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/expenses" element={<ExpenseBreakdown />} />
              <Route path="/summary" element={<SummaryPage />} />
            </Routes>
            </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;