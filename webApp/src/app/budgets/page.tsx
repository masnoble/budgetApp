import { getMonth } from "@api/month";
import { authOptions } from "@api/authOptions";
import { getFamilyByPersonEmail } from "@api/family";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { findMonthBudgetReport } from "@api/category";
import BudgetView from "@ClientComponents/BudgetView";
import { BudgetData } from "@types";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return redirect("api/auth/signin");
  }

  const family = (await getFamilyByPersonEmail(email))!;
  const currentMonth = await getMonth(family.id);
  const initialDataToShow = currentMonth
    ? await findMonthBudgetReport(family.id, currentMonth.id)
    : ([] as BudgetData[]);

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <BudgetView initialData={initialDataToShow} />
    </Box>
  );
}
