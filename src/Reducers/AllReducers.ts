import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import ProjectReducer from "./ProjectReducer";

const AllReducers = combineReducers({
    user: UserReducer,
    projects: ProjectReducer
})

export default AllReducers