"use server";

import { Family, MonthCode, Person, Prisma } from "@prisma/client";
import { addTransaction } from "@api/transaction";

export async function submitNewTransaction(
  formData: FormData,
  currentUser: Person
) {
  const vendorName = formData.get("vendor") as string;
  const categoryName = formData.get("category") as string;
  const methodName = formData.get("method") as string;
  const personName = formData.get("person") as string;

  const date = new Date(Date.now());
  const familyId = currentUser.familyId

  const newTransaction: Prisma.TransactionCreateInput = {
    amount: 0,
    date: date,
    person: {
      connect: {
        email: currentUser.email,
      },
    },
    month: {
      connectOrCreate: {
        where: {
          monthCode_year_familyId: {
            monthCode: Object.values(MonthCode)[date.getMonth()],
            year: date.getFullYear(),
            familyId,
          },
        },
        create: {
            monthCode: Object.values(MonthCode)[date.getMonth()],
            year: date.getFullYear(),
            familyId,
        }
      },
    },
    vendor: {
      connectOrCreate: {
        where: {
          name_familyId: {
            name: vendorName,
            familyId,
          },
        },
        create: {
          name: vendorName,
          familyId,
        },
      },
    },
    method: {
      connectOrCreate: {
        where: {
          name_familyId: {
            name: methodName,
            familyId,
          },
        },
        create: {
          name: methodName,
          familyId,
        },
      },
    },
    category: {
      connectOrCreate: {
        where: {
          name_familyId: {
            name: categoryName,
            familyId,
          },
        },
        create: {
          name: categoryName,
          familyId,
        },
      },
    },
  };

  return await addTransaction(newTransaction)
}