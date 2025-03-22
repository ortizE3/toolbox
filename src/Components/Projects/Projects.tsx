import { useEffect, useState } from "react";
import { Project } from "../../Models/Projects/Project";
import { fetchProjectData } from "../services/ProjectService/ProjectService";

function Projects() {
    const [data, setData] = useState<Project[] | null>(null);
    useEffect(() => {
    }, []);

    return (
        <div>Projects</div>
    )
}

export default Projects