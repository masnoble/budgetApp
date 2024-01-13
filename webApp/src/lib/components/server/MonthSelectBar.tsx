import { Box } from "@mui/material";
import { Month } from "@prisma/client";


export default async function MonthSelectBar({months}:{months: Month[]}){
    return(
        <>
        {months.map(m => 
            <Box key={m.id}>{m.monthCode}</Box>
        )}
        </>
    )
}