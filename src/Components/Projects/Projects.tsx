import { useState } from "react";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";

function Projects() {
    const [showCreateProject, setShowCreateProject] = useState<boolean>(false);

    const toggleOnCreateProject = () => {
        setShowCreateProject(true)
    }

    return (
        <div>
            <button onClick={toggleOnCreateProject}>Create Project</button>
            {showCreateProject && <CreateProjectModal open={setShowCreateProject} />}
        </div>
    )
}

export default Projects