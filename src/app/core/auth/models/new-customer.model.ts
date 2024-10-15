
import { Customer } from "./customer.model";
import { Login } from "./login.model";

export interface NewCustomer {
    user: Login
    customer: Customer
}