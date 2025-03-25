import { ProjectActions } from "../Models/Actions/ProjectsActions";
import { Project } from "../Models/Projects/Project";
import { ReducerAction } from "../Models/Reducer/ReducerAction";

const ProjectReducer = (state: Project[] = [], action: ReducerAction<Project[]>) => {
    switch (action.type) {
        case ProjectActions.GET_PROJECTS_COMPLETED:
            return action.payload
        default:
            return state;
    }
};

export default ProjectReducer;