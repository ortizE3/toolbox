import { Project } from "../../Models/Projects/Project"
import { DeleteProject } from "../services/ProjectService/ProjectService"
import { useAppDispatch } from "../../main"
import { GetProjects } from "../../Actions/ProjectActions"
import { useSelector } from "react-redux"
import { AppState } from "../../Models/Reducer/AppState"

import './ListedProject.css'
import { useState } from "react"
import ProjectModal from "../ProjectModal/ProjectModal"

function ListedProject(props: Project) {
    const [openEdit, setOpenEdit] = useState<boolean>(false);
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

    const editProjectHandler = () => {
        setOpenEdit(true)
    }

    return (
        <div className="listed-project-container ">
            <div>{props.title}</div>
            <div>{props.description}</div>
            <div>{props.projectId}</div>
            <div>{props.address}</div>
            <div className="listed-project-button-group">
                <button onClick={editProjectHandler}>Edit</button>
                <button onClick={deleteProjectHandler}>Cancel</button>
            </div>
            <ProjectModal open={openEdit} openHandler={setOpenEdit} isEdit={true} project={props} />
        </div>
    )
}

export default ListedProject