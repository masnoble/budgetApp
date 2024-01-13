import { prisma } from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";

export async function initialSetup(email: string) {
  return prisma.person.upsert({
    where: {
      email: email,
    },
    update: {
      email: email,
      name: "Joshua",
      family: {
        connectOrCreate: {
          where: {
            name: "Nameless fam"
          },
          create: {}
        }
      },
    },
    create: {
      email: email,
      name: "Joshua",
      family: {
        connectOrCreate: {
          where: {
            name: "Nameless fam"
          },
          create: {}
        }
      },
    },
  });
}

export async function getPersonByEmail(email: string, familyFieldsToInclude: Prisma.FamilyInclude) {
  return prisma.person.findFirst({
    where: { email },
    include: {
      family: {
        include: familyFieldsToInclude
      },
    },
  });
}
