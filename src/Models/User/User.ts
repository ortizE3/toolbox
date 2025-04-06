import { Address } from "../Address/Address";

export class User {
    id: string = '';
    email: string = '';
    name: string = '';
    addressId?: string = '';
    address: Address = new Address();
}