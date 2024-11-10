// src/pages/SummaryPage.tsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // To navigate back to the dashboard

const SummaryPage = () => {
  const [summary, setSummary] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const navigate = useNavigate();

  const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  const handleExplanationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExplanation(event.target.value);
  };

  const handleSave = () => {
    // Save summary and explanation (you can save it in localStorage, a backend, etc.)
    // For now, logging to console
    console.log("Summary Saved:", summary);
    console.log("Explanation Saved:", explanation);

    // Redirect back to dashboard after saving
    navigate("/");
  };

  return (
    <Box p="2rem">
      <Typography variant="h4">Add Summary and Explanation</Typography>
      <TextField
        label="Enter Summary"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={summary}
        onChange={handleSummaryChange}
        sx={{ marginTop: "1rem" }}
      />
      <TextField
        label="Enter Explanation"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={explanation}
        onChange={handleExplanationChange}
        sx={{ marginTop: "1rem" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: "1rem" }}
      >
        Save Summary and Explanation
      </Button>
    </Box>
  );
};

export default SummaryPage;
