import { User } from "../User/User"

const initialState: User = {
    id: "",
    name: "",
    email: ""
}



export class AppState {
    user: User = initialState
}