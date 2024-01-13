import { prisma } from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";


export async function getFamilyByPersonEmail(personEmail: string, familyFieldsToInclude: Prisma.FamilyInclude) {
    return prisma.family.findFirst({
        where: {
            people: {
                some: {
                    email: personEmail
                }
            }
        },
        include: familyFieldsToInclude
    })
}