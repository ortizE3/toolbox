import { Project } from "../Projects/Project"
import { User } from "../User/User"

const initialState: User = {
    id: "",
    name: "",
    email: "",
    addressId: "",
    address: {
        name: "",
        latitude: 0,
        longitude: 0,
        addressId: "",
    },
}



export class AppState {
    user: User = initialState;
    projects: Project[] = [];
}