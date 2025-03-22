import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";

const AllReducers = combineReducers({
    user: UserReducer,
})

export default AllReducers