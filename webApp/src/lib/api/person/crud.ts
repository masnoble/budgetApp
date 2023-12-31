import { prisma } from "@/lib/prisma/prisma";

export async function getPersonByEmail(email: string) {
  return prisma.person.findFirst({
    where: { email },
    include: { family: {
      include: {
        people: true,
        categories: true,
        methods: true,
        vendors: true
      }
    } },
  });
}