"use client";

import { BudgetData, MonthIdentifyer } from "@/lib/types";
import { useEffect, useState } from "react";
import BudgetItem from "./BudgetItem";
import { MonthCode } from "@prisma/client";
import { Box, Stack } from "@mui/material";

export default function BudgetView({
  initialData,
}: {
  initialData: BudgetData[];
}) {
  const [spendingWithBudget, setSpendingWithBudget] = useState<BudgetData[]>(
    []
  );
  const [spendingWithoutBudget, setSpendingWithoutBudget] = useState<
    BudgetData[]
  >([]);

  const date = new Date(Date.now());
  const [selectedMonth, setSelectedMonth] = useState<MonthIdentifyer>({
    monthCode: Object.values(MonthCode)[date.getMonth()],
    year: date.getFullYear(),
  });

  useEffect(() => {
    setSpendingWithBudget(initialData.filter((v) => v.budget !== null));
    setSpendingWithoutBudget(initialData.filter((v) => v.budget === null));
  }, []);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {spendingWithBudget.map((m) => (
        <BudgetItem key={m.id} budgetData={m} month={selectedMonth} />
      ))}
      {spendingWithoutBudget.map((m) => (
        <BudgetItem key={m.id} budgetData={m} month={selectedMonth} />
      ))}
    </Stack>
  );
}
