import { getPersonByEmail, initialSetup } from "@/lib/api/person";
import TransactionEntryForm from "@ClientComponents/TransactionEntryForm";
import { TransactionEntryOptions } from "@/lib/types";
import { Box, Grid} from "@mui/material";
import { Person } from "@prisma/client";
import { unstable_noStore } from "next/cache";
import { authOptions } from "@api/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  unstable_noStore();
  
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if(!email){
    return redirect("api/auth/signin")
  }


  const personAndFamily = await getPersonByEmail(email);
  const person: Person = {
    id: personAndFamily ? personAndFamily.id : "",
    email: personAndFamily ? personAndFamily.email : "",
    name: personAndFamily ? personAndFamily.name : "",
    familyId: personAndFamily ? personAndFamily.familyId : "",
  };

  const family = personAndFamily!.family;
  // const family = person!.family;

  const transactionEntryOptions: TransactionEntryOptions = {
    currentUser: person,
    people: family.people,
    vendors: family.vendors,
    categories: family.categories,
    methods: family.methods,
  };

  return (
    <Box display={"flex"} flexGrow={1} alignItems={"center"}>
      <Grid container justifyContent="center" alignItems="stretch">
        <TransactionEntryForm passedOptions={transactionEntryOptions} />
      </Grid>
    </Box>
  );
}
