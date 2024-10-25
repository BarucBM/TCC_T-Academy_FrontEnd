import { Customer } from "./customer.model"


export interface Cart{
    id?:Number,

    customer:Customer,

    item:Item[]
}

export interface Item {
    id?:Number,

    eventId:String,

    quantity:Number
}   