import { useEffect, useState } from "react";
import { Project } from "../../Models/Projects/Project";
import { fetchProjectData } from "../services/ProjectService/ProjectService";

function Projects() {
    const [data, setData] = useState<Project[] | null>(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchProjectData();
                console.log(result)
                setData(result);
            } catch (err) {
                console.log(err)
            }
        };
        getData();
    }, []);

    return (
        <div>Projects</div>
    )
}

export default Projects