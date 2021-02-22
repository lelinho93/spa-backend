import { Request, Response } from "express";

export default function calculateHours (req: Request, res: Response) {

    try {

        if(!req.body.name || !req.body.startDate || !req.body.endDate || !req.body.startHour || !req.body.endHour) {
            throw new Error("Todos os campos devem ser preenchidos!")
        }
        const name = req.body.name
        const startHour = req.body.startHour
        const endHour = req.body.endHour
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const start = new Date(startDate + "T" + startHour + ":00").getTime()
        const end = new Date(endDate + "T" + endHour + ":00").getTime()

        if(start >= end)  {
            throw new Error("A hora/data de saída deve ser depois da entrada!")
        }      

        const diff =  ((end - start) / 1000) / 3600

        if(diff > 24) {
            throw new Error("O horário máximo permitido é de 24h.")
        }


        if((startHour.split(":")[0] >= 5 && startHour.split(":")[0] < 22) && (endHour.split(":")[0] >= 5 && endHour.split(":")[0] <= 22)){

            const hoursDiff =  new Date (end - start) 
            const hour = hoursDiff.getUTCHours()
            const minutes = hoursDiff.getMinutes()
            const diff = hour + ":" + minutes              

            res.status(200).send(`Olá ${name}, você trabalhou ${diff} horas diurnas.`)



        } else if ((startHour.split(":")[0] >= 22 || startHour.split(":")[0] < 5) && (endHour.split(":")[0] >= 22 || endHour.split(":")[0] <= 5)){
               
            const hoursDiff =  new Date (end - start) 
            const hour = hoursDiff.getUTCHours()
            const minutes = hoursDiff.getMinutes()
            const diff = hour + ":" + minutes 

            res.status(200).send(`Olá ${name}, você trabalhou ${diff} horas noturnas.`) 



        } else if ((startHour.split(":")[0] >= 5 && startHour.split(":")[0] < 22) && (endHour.split(":")[0] >= 22 || endHour.split(":")[0] < 5)){

            function hourDayDiff(start: any, end: any){
                const hoursDiff = new Date (end - start)
                const hour = hoursDiff.getUTCHours()
                const minutes = hoursDiff.getMinutes()
                const diff = hour + ":" + minutes 
                return diff
            }   
            const dayDiff = hourDayDiff(start, new Date (startDate + "T22:00:00"))

            
            function hourNightDiff(start: any, end: any){
                const hoursDiff = new Date (end - start)
                const hour = hoursDiff.getUTCHours()
                const minutes = hoursDiff.getMinutes()
                const diff = hour + ":" + minutes 
                return diff             
                
            } 
            const nightDiff = hourNightDiff( new Date(endDate + "T22:00:00"), end)

            res.status(200).send(`${name}, você trabalhou ${dayDiff} horas diurnas e ${nightDiff} horas noturnas.`)                       
            
            
           

            } else if ((startHour.split(":")[0] >= 22 || startHour.split(":")[0] < 5) && (endHour.split(":")[0] > 5 && endHour.split(":")[0] < 22)){

                function hourNightDiff(start: any, end: any){
                    const hoursDiff = new Date (end - start)
                    const hour = hoursDiff.getUTCHours()
                    const minutes = hoursDiff.getMinutes()
                    const diff = hour + ":" + minutes 
                    return diff                    
                    
                } 
                const nightDiff = hourNightDiff(start, new Date(startDate + "T05:00:00"))


                function hourDayDiff(start: any, end: any){
                    const hoursDiff = new Date (end - start)
                    const hour = hoursDiff.getUTCHours()
                    const minutes = hoursDiff.getMinutes()
                    const diff = hour + ":" + minutes 
                    return diff                     
                } 
                const dayDiff = hourDayDiff( new Date(endDate + "T05:00:00"), end)   
                
                res.status(200).send(`${name} você trabalhou ${nightDiff} horas noturnas e ${dayDiff} horas diurnas`)
            }   

    } catch(error) {
        res.status(400).send(error.message)
    }
}