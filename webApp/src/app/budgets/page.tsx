import { getMonth } from "@api/month";
import MonthSelectBar from "@ServerComponents/MonthSelectBar";
import { authOptions } from "@api/authOptions";
import { getFamilyByPersonEmail } from "@api/family";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { findMonthBudgetReport } from "@api/category";
import { MonthCode } from "@prisma/client";
import BudgetView from "@/lib/components/client/BudgetView";


export default async function Page() {

  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if(!email){
    return redirect("api/auth/signin")
  }

  const family = (await getFamilyByPersonEmail(email))!
  const currentMonth = await getMonth(family.id)
  const initialDataToShow = await findMonthBudgetReport(family.id, currentMonth.id)

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <BudgetView initialData={initialDataToShow}/>
    </Box>
  );
}
