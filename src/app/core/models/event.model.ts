export interface Event{
    id:string | null,

    title:string | null,

    startTime:Date | null,

    //tickets:TicketType[],

    endTime:Date | null, 

    createdAt:Date | null,

    location:string | null,

    description:string | null,

    weatherImpact:boolean
}

// export interface TicketType{
//     name:string,
//     price:number,
//     descrption:string
// }