export interface Event{
    id:string,

    title:string,

    startTime:Date,

    //tickets:TicketType[],

    endTime:Date,

    createdAt:Date,

    location:string,

    description:string,

    weatherImpact:boolean
}

// export interface TicketType{
//     name:string,
//     price:number,
//     descrption:string
// }