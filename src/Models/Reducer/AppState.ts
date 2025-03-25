import { Project } from "../Projects/Project"
import { User } from "../User/User"

const initialState: User = {
    id: "",
    name: "",
    email: ""
}



export class AppState {
    user: User = initialState;
    projects: Project[] = [];
}