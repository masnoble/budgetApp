"use server"

import { prisma } from "@/lib/prisma/prisma";

export async function updateOrCreateBudget(categoryId: string, amount: number, hasRollover: boolean){
  return prisma.budget.upsert({
    where: {
      categoryId: categoryId
    },
    create: {
      categoryId: categoryId,
      hasRollover: hasRollover,
      budget: amount
    },
    update: {
      hasRollover: hasRollover,
      budget: amount
    }
  }
  )
}