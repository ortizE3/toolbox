import { Project } from "../../Models/Projects/Project"

import './ListedProject.css'
import { DeleteProject } from "../services/ProjectService/ProjectService"
import { useAppDispatch } from "../../main"
import { GetProjects } from "../../Actions/ProjectActions"
import { useSelector } from "react-redux"
import { AppState } from "../../Models/Reducer/AppState"
function ListedProject(props: Project) {

    const appDispatch = useAppDispatch();
    const user = useSelector((state: AppState) => state.user)
    const deleteProjectHandler = () => {
        if (props.projectId && user.id) {
            DeleteProject(props.projectId).then(() => {
                appDispatch(GetProjects(user.id))
            }).catch(() => {
                console.error('error deleting project by id')
            })
        }
    }

    return (
        <div className="listed-project-container ">
            <div>{props.title}</div>
            <div>{props.description}</div>
            <div>{props.projectId}</div>
            <div className="listed-project-button-group">
                <button>Edit</button>
                <button onClick={deleteProjectHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default ListedProject