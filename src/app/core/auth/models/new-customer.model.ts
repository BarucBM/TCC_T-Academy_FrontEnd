
import { User } from "../../models/user.model";
import { Customer } from "./customer.model";

export interface NewCustomer {
    user: User
    customer: Customer
}