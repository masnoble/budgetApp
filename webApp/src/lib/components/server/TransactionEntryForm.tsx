"use client";

import { TransactionEntryOptions } from "@types";
import { submitNewTransaction } from "@api/actions";
import { Autocomplete, Button, InputBaseComponentProps, Stack, TextField } from "@mui/material";
import { Category, Method, Vendor } from "@prisma/client";
import { useState } from "react";

export default function TransactionEntryForm({
  passedOptions,
}: {
  passedOptions: TransactionEntryOptions;
}) {
  const [formOptions, setFormOptions] =
    useState<TransactionEntryOptions>(passedOptions);
  const [category, setCategory] = useState<string>("");
  const [vendor, setVendor] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  return (
    <form
      id="transactionEntryForm"
      action={async (formData: FormData) => {
        if (
          !formOptions.categories.some(
            (v) => v.name === formData.get("category")
          )
        ) {
          formOptions.categories.push({
            name: formData.get("category")!.toString(),
          } as Category);
        }

        if (
          !formOptions.methods.some((v) => v.name === formData.get("method"))
        ) {
          formOptions.methods.push({
            name: formData.get("method")!.toString(),
          } as Method);
        }

        if (
          !formOptions.vendors.some((v) => v.name === formData.get("vendor"))
        ) {
          formOptions.vendors.push({
            name: formData.get("vendor")!.toString(),
          } as Vendor);
        }

        setCategory("");
        setMethod("");
        setVendor("");
        setAmount("");

        setFormOptions(formOptions);

        submitNewTransaction(formData, passedOptions.currentUser);
      }}
    >
      <Stack spacing={2} sx={{ width: 300 }}>
        <TextField 
          label="Amount"
          type="number"
          name="amount"
          required={true}
          value={amount}
          onChange={(e)=> {
            // const val = parseFloat(e.target.value)
            // if (isNaN(val)) return

            setAmount(e.target.value)
          }}
        />
        <Autocomplete
          freeSolo
          options={formOptions.categories.map((v) => v.name)}
          value={category}
          onChange={(e, v) => setCategory(v!)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              type="text"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            />
          )}
        />
        <Autocomplete
          freeSolo
          options={formOptions.methods.map((v) => v.name)}
          value={method}
          onChange={(e, v) => setMethod(v!)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Method"
              type="text"
              name="method"
              onChange={(e) => setMethod(e.target.value)}
            />
          )}
        />
        <Autocomplete
          freeSolo
          options={formOptions.vendors.map((v) => v.name)}
          value={vendor}
          onChange={(e, v) => setVendor(v!)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Vendor"
              type="text"
              name="vendor"
            //   value={params.inputProps.value}
              onChange={(e) => setVendor(e.target.value)}
            />
          )}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}