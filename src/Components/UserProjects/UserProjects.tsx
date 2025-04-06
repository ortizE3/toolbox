import { useSelector } from "react-redux";
import { AppState } from "../../Models/Reducer/AppState";
import ListedProject from "../ListedProject/ListedProject";
import { Project } from "../../Models/Projects/Project";

function UserProjects() {
    const userProjects = useSelector((state: AppState) => state.projects);

    return (
        <>
            {userProjects &&
                <div className="project-list-container">
                    {userProjects.map((project: Project) => {
                        return <ListedProject key={project.projectId} {...project}></ListedProject>
                    })}
                </div>
            }
        </>
    )
}

export default UserProjects