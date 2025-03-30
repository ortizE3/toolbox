import { AppState } from '../../Models/Reducer/AppState';
import { useSelector } from 'react-redux';
import ListedProject from '../ListedProject/ListedProject';
import { Project } from '../../Models/Projects/Project';

function UserProjects() {
    const projects = useSelector((state: AppState) => state.projects);

    return (
        <>
            {projects &&
                <div className="project-list-container">
                    {projects.map((project: Project) => {
                        return <ListedProject key={project.projectId} {...project}></ListedProject>
                    })}
                </div>
            }
        </>
    )
}

export default UserProjects