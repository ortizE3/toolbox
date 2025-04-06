import { Address } from "../Address/Address";

export class Project {
    projectId: string = '';
    userId: string = '';
    description: string = '';
    title: string = '';
    address: Address = new Address();
    addressId?: string = '';
}