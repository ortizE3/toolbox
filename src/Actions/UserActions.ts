import { UserActions } from "../Models/Actions/UserActions";
import { User } from "../Models/User/User";

export const GetUserCompleted = (data: User) => ({
    type: UserActions.getUser,
    payload: data,
});