import { ThunkAction } from "redux-thunk";
import { UserActions } from "../Models/Actions/UserActions";
import { User } from "../Models/User/User";
import { AppState } from "../Models/Reducer/AppState";
import { AnyAction } from "@reduxjs/toolkit";
import { GetUser } from "../Components/services/UserService.ts/UserService";

export const GetUserCompleted = (data: User) => ({
    type: UserActions.getUser,
    payload: data,
});

export const RefreshUser = (userId: string): ThunkAction<void, AppState, unknown, AnyAction> => {
    return (dispatch) => {
        GetUser(userId).then((projects: User) => {
            dispatch(GetUserCompleted(projects))
        }).catch(() => {
            console.log('error')
        })
    }
}