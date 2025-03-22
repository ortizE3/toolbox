import { UserActions } from "../Models/Actions/UserActions";
import { ReducerAction } from "../Models/Reducer/ReducerAction";
import { User } from "../Models/User/User";

const initialState: User = {
    id: "",
    name: "",
    email: ""
}

const UserReducer = (user: User = initialState, action: ReducerAction<User>) => {
    switch (action.type) {
        case UserActions.getUser:
            return { ...user, ...action.payload }
        default:
            return user;
    }
};

export default UserReducer;