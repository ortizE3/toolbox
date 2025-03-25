import { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { GetAllProjects } from "../Components/services/ProjectService/ProjectService";
import { ProjectActions } from "../Models/Actions/ProjectsActions";
import { Project } from "../Models/Projects/Project";
import { AppState } from "../Models/Reducer/AppState";

export const GetProjects = (userId: string): ThunkAction<void, AppState, unknown, AnyAction> => {
    return (dispatch) => {
        GetAllProjects(userId).then((projects: Project[]) => {
            dispatch(GetProjectsCompleted(projects))
        }).catch(() => {
            console.log('error')
        })
    }
}

export const GetProjectsCompleted = (projects: Project[]) => ({ type: ProjectActions.GET_PROJECTS_COMPLETED, payload: projects });