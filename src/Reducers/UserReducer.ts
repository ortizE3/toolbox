import { AppState } from "@auth0/auth0-react";
import { UserActions } from "../Models/Actions/UserActions";
import { ReducerAction } from "../Models/Reducer/ReducerAction";
import { User } from "../Models/User/User";

const initialState: AppState = {
    user: null
}

const UserReducer = (state: AppState = initialState, action: ReducerAction<User>) => {
    switch (action.type) {
        case UserActions.getUser:
            return { ...state, ...action.payload }
        default:
            return state;
    }
};

export default UserReducer;