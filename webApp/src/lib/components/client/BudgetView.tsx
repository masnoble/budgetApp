"use client";

import { BudgetData } from "@/lib/types";
import { Box } from "@mui/material";
import { Month, Prisma } from "@prisma/client";
import { useState } from "react";

export default function BudgetView({
  initialData,
}: {
  initialData: BudgetData;
}) {
  const [budgetData, setBudgetData] = useState<BudgetData>(initialData);
  const [selectedMonth, setSelectedMonth] =
    useState<
      Prisma.MonthGetPayload<{ select: { monthCode: true; year: true } }>
    >();

  return(
    <>
    {budgetData.map(m => 
        <Box key={m.id}>Total Spending for {m.name}:  {m.transactions.reduce((s, t) => s + t.amount, 0)}</Box>
    )}
    </>
);
}
