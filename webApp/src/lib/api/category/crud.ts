"use server"

import { prisma } from "@/lib/prisma/prisma";

export async function findMonthBudgetReport(familyId: string, monthId: string) {
  const categoryBudgetAndSpending = await prisma.category.findMany({
    include: {
      transactions: {
        where: {
          monthId: monthId,
        },
        select: {
          amount: true
        }
      },
      budget: true
    },
    where: {
      familyId: familyId
    }
  })

  return categoryBudgetAndSpending
}