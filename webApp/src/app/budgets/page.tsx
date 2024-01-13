import { fillInMonths } from "@api/month";
import MonthSelectBar from "@ServerComponents/MonthSelectBar";
import { authOptions } from "@api/authOptions";
import { getFamilyByPersonEmail } from "@api/family";
import { Box } from "@mui/material";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if(!email){
    return redirect("api/auth/signin")
  }

  // Just get months here and populate "month view" in child components
  const familyFieldsToInclude: Prisma.FamilyInclude = {
    months: true
  }

  let months = (await getFamilyByPersonEmail(email, familyFieldsToInclude))!.months

  // Some backend initialization if there aren't many months in db
  if (months.length < 12) { 
    fillInMonths(12-months.length)
  }

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
    >
      <MonthSelectBar months={months}/>
    </Box>
  );
}
