import { ChangeEvent, useEffect, useState } from 'react';
import { CreateProjectProps } from '../../Models/ComponentProps/CreateProjectProps'
import Modal from '../UI-components/Modal/Modal'
import ERROR from '../../Constants/ConstantErrors';
import { CreateProject } from '../services/ProjectService/ProjectService';
import { Project } from '../../Models/Projects/Project';
import { useSelector } from 'react-redux';

import './CreateProjectModal.css'
import { AppState } from '../../Models/Reducer/AppState';
import { CreateProjectRequest } from '../../Models/Projects/CreateProjectRequest';

function CreateProjectModal(props: CreateProjectProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [titleError, setTitleError] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<string>("");
    const [canCreate, setCanCreate] = useState<boolean>(false);
    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (!titleError && !descriptionError &&
            description !== '' && title !== '') {
            setCanCreate(true)
        } else {
            setCanCreate(false)
        }
    }, [titleError, descriptionError, title, description])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);

        if (title.length < 10 || title.length > 150) {
            setTitleError(ERROR.CREATE_PROJECT_ERROR.TITLE_LENGTH)
        } else {
            setTitleError("")
        }
    };

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);

        if (description.length < 10 || description.length > 300) {
            setDescriptionError(ERROR.CREATE_PROJECT_ERROR.DESCRIPTION_LENGTH)
        } else {
            setDescriptionError("")
        }
    };

    const createProject = () => {
        if (canCreate) {
            let request: CreateProjectRequest = {
                title: title,
                description: description,
                userId: user.id
            };

            CreateProject(request)
        }
    }

    return (
        <Modal open={props.open}>
            <div className="project-create-container">
                <h2 className='create-project-header'>Create A Project</h2>
                <hr />
                <div className='input-container'>
                    <label htmlFor="name">Title of the project</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={title}
                        onChange={handleInputChange}
                        required
                    />
                    <div className='input-error'>{titleError}</div>
                </div>
                <div className='input-container'>
                    <label htmlFor="description">Enter your description of your project here</label>
                    <div className='input-error'>{descriptionError}</div>
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleTextareaChange}
                    >Example: Project includes drywall work, paint touch ups and installation of a door
                    </textarea>
                </div>
                <hr />
                <div className='button-container'>
                    <button disabled={!canCreate} onClick={createProject}>Create Project</button>
                    <button onClick={() => props.open(false)}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateProjectModal