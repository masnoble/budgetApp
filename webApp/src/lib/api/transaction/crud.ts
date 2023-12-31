import { prisma } from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";

export async function addTransaction(
  newTransaction: Prisma.TransactionCreateInput
) {
  return prisma.transaction.create({ data: newTransaction });
}

export async function findTransactionsByCategory(categoryId: string) {
  const categoryTransactions = (
    await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
      select: {
        transactions: true,
      },
    })
  )?.transactions;

  return categoryTransactions;
}

export async function findTransactionsByMonth(monthId: string) {
  const monthTransactions = (
    await prisma.month.findFirst({
      where: {
        id: monthId,
      },
      select: {
        transactions: true,
      },
    })
  )?.transactions;

  return monthTransactions;
}

export async function findTransactionsByVendor(vendorId: string){
  const vendorTransactions = (
    await prisma.vendor.findFirst({
      where: {
        id: vendorId
      },
      select: {
        transactions: true
      }
    })
  )?.transactions;

  return vendorTransactions;
}
