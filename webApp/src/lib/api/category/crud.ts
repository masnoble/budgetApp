import { prisma } from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";

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
