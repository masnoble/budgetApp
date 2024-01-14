"use client";

import { updateOrCreateBudget } from "@api/budget";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  LinearProgressProps,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Budget } from "@prisma/client";
import { BudgetData, MonthIdentifyer } from "@types";
import { useState } from "react";

export default function BudgetItem({
  budgetData,
  month,
}: {
  budgetData: BudgetData;
  month: MonthIdentifyer;
}) {
  const spending = budgetData.transactions.reduce((s, t) => s + t.amount, 0);

  function ActiveProgressBar({ budget }: { budget: Budget }) {
    //TODO: Add rollover function and overage warning

    const normalizedValue = (spending * 100) / budget.budget;

    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={normalizedValue} />
        </Box>
        <Box sx={{ minWidth: 80 }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >{`$${spending} of $${budget.budget}`}</Typography>
        </Box>
      </Box>
    );
  }

  function AddBudgetArea() {
    const [submitted, setSubmitted] = useState<boolean>(false);
    return (
      <form
        action={async (formData: FormData) => {
          const newBudgetAmount = parseFloat(
            formData.get("amount")?.toString()!
          );
          const rollover = formData.get("rollover")?.toString() == "true";

          console.log(newBudgetAmount);
          console.log(rollover);
          const newBudget = await updateOrCreateBudget(
            budgetData.id,
            newBudgetAmount,
            rollover
          );
          setSubmitted(true);
        }}
      >
        {submitted ? (
          <Typography variant="caption">
            Refresh Page To See New Budget
          </Typography>
        ) : (
          <Box display="flex">
            <TextField
              label="$"
              type="number"
              name="amount"
              required={true}
              autoComplete="off"
              size="small"
              sx={{ flexGrow: 0.2, mr: 1 }}
            />
            <FormControlLabel
              label="Rollover Balance?"
              control={<Checkbox name="rollover" />}
              sx={{ flexGrow: 0.3 }}
            />
            <Button type="submit" sx={{ flexGrow: 0.5 }}>
              GO
            </Button>
          </Box>
        )}
      </form>
    );
  }

  const [editBudget, setEditBudget] = useState<boolean>(false);

  return (
    <Paper
      sx={{
        width: "90%",
        height: "5.3rem",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" flexGrow={1}>
          {budgetData.name}
        </Typography>
        <Button onClick={() => setEditBudget(!editBudget)}>Edit</Button>
      </Box>

      {budgetData.budget && !editBudget ? (
        <ActiveProgressBar budget={budgetData.budget} />
      ) : (
        <AddBudgetArea />
      )}
    </Paper>
  );
}
