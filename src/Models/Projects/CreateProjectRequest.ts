import { Address } from "../Address/Address";

export class CreateProjectRequest {
    userId: string = '';
    description: string = '';
    title: string = '';
    addressRequest: Address = new Address();
}