import { Customer } from "./customer.model"


export interface Cart{
    id?:Number,

    customer:Customer,

    cartEvents:Item[]
}

export interface Item {
    id:number,

    eventId:string,

    quantity:Number
}   

export interface addItem{
    eventId:string,

    quantity:Number
}