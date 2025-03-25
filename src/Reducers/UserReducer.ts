import { UserActions } from "../Models/Actions/UserActions";
import { ReducerAction } from "../Models/Reducer/ReducerAction";
import { User } from "../Models/User/User";

const initialState: User = {
    id: '',
    email: '',
    name: ''
}

const UserReducer = (state: User = initialState, action: ReducerAction<User>) => {
    switch (action.type) {
        case UserActions.getUser:
            return action.payload
        default:
            return state;
    }
};

export default UserReducer;