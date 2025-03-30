import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetProjects } from "../../Actions/ProjectActions";
import { Project } from "../../Models/Projects/Project";
import { AppState } from "../../Models/Reducer/AppState";
import { useAppDispatch } from "../../main";
import ListedProject from "../ListedProject/ListedProject";
import ProjectModal from "../ProjectModal/ProjectModal";
import Tabs from "../UI-components/Tabs/Tabs";

import './Projects.css'
import Tab from "../UI-components/Tab/Tab";
import { ProjectMode } from "../../Models/Projects/ProjectMode";
import UserProjects from "../UserProjects/UserProjects";
import SearchProjects from "../SearchProjects/SearchProjects";

function Projects() {
    const [showCreateProject, setShowCreateProject] = useState<boolean>(false);
    const [projectMode, setProjectMode] = useState<ProjectMode>(ProjectMode.Project);
    const user = useSelector((state: AppState) => state.user);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (user && user.id) {
            appDispatch(GetProjects(user.id))
        }
    }, [user])

    const toggleOnCreateProject = () => {
        setShowCreateProject(true)
    }

    return (
        <div>
            <div className="project-header">
                <Tabs>
                    <Tab onClick={() => { setProjectMode(ProjectMode.Project) }} title={'Projects'}></Tab>
                    <Tab onClick={() => { setProjectMode(ProjectMode.YourProjects) }} title={'Your Projects'}></Tab>
                    <Tab onClick={() => { setProjectMode(ProjectMode.Contractors) }} title={'Contractors'}></Tab>
                </Tabs>
                <button onClick={toggleOnCreateProject}>Create Project</button>
            </div>

            <ProjectModal open={showCreateProject} isEdit={false} openHandler={setShowCreateProject} />
            {projectMode === ProjectMode.YourProjects && <UserProjects />}
            {projectMode === ProjectMode.Project && <SearchProjects />}
        </div>
    )
}

export default Projects