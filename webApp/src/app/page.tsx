import { getPersonByEmail, initialSetup } from "@/lib/api/person";
import TransactionEntryForm from "@/lib/components/server/TransactionEntryForm";
import { TransactionEntryOptions } from "@/lib/types";
import { Box, Grid, Stack } from "@mui/material";
import { MonthCode, Person } from "@prisma/client";

export default async function Page() {
  // TODO: use some kind of google auth and store this email in session.

  const ignore = await initialSetup("jnthomas522@gmail.com")

  const personAndFamily = await getPersonByEmail("jnthomas522@gmail.com");
  const person: Person = { 
    id: personAndFamily? personAndFamily.id : "",
    email: personAndFamily? personAndFamily.email : "",
    name: personAndFamily? personAndFamily.name: "",
    familyId: personAndFamily? personAndFamily.familyId: ""
  }

  const family = personAndFamily!.family
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
    <Grid
      container
      justifyContent="center"
      alignItems="stretch"
      > 
      <TransactionEntryForm passedOptions={transactionEntryOptions} />
    </Grid>
      </Box>
  );
}
