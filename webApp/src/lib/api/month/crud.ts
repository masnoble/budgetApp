import { prisma } from "@/lib/prisma/prisma";
import { MonthCode, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";


export async function fillInMonths(monthsToAdd: number){
    const email = (await getServerSession(authOptions))?.user?.email!;
    const familyIdToUpdate = (await prisma.family.findFirst({
        where: {
            people: {
                some: {
                    email: email
                }
            }
        },
        select: {
            id: true
        }
    }))!.id;

    const latestMonth = (await prisma.month.findFirst({
        where: {
            familyId: familyIdToUpdate,
        },
        orderBy: [{
            year: "desc"
        },
        {
            monthCode: "desc"
        }],
        take: 1
    }))!

    // console.log(latestMonth)

    const monthCodeList = Object.values(MonthCode)
    const startFrom = monthCodeList.findIndex((m) => m == latestMonth.monthCode) + 1
    let yearToAdd = latestMonth.year
    // const promises: PrismaPromise = 
    const monthsCreateInputs: Prisma.MonthCreateManyInput[] = []

    for(let i = 0; i < monthsToAdd; i++){
        let monthNum = startFrom + i
        if (monthNum % 12 == 0) yearToAdd++
        
        monthsCreateInputs.push({
            familyId: familyIdToUpdate,
            monthCode: monthCodeList[monthNum%12],
            year: yearToAdd
        })
    }

    const addedMonths = await prisma.month.createMany({
        skipDuplicates: true,
        data: monthsCreateInputs
    })
}