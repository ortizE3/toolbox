import { useEffect, useState } from "react";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import { useSelector } from "react-redux";
import { GetProjects } from "../../Actions/ProjectActions";
import { Project } from "../../Models/Projects/Project";
import { AppState } from "../../Models/Reducer/AppState";
import { useAppDispatch } from "../../main";
import ListedProject from "../ListedProject/ListedProject";

import './Projects.css'

function Projects() {
    const [showCreateProject, setShowCreateProject] = useState<boolean>(false);
    const toggleOnCreateProject = () => {
        setShowCreateProject(true)
    }

    const user = useSelector((state: AppState) => state.user);
    const projects = useSelector((state: AppState) => state.projects);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (user && user.id) {
            appDispatch(GetProjects(user.id))
        }
    }, [user])

    return (
        <div>
            <button onClick={toggleOnCreateProject}>Create Project</button>
            {showCreateProject && <CreateProjectModal open={setShowCreateProject} />}
            {projects &&
                <div className="project-list-container">
                    {projects.map((project: Project) => {
                        return <ListedProject key={project.projectId} {...project}></ListedProject>
                    })
                    }
                </div>
            }
        </div>
    )
}

export default Projects