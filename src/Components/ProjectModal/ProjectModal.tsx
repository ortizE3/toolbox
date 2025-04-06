import { ChangeEvent, useEffect, useState } from 'react';
import { ProjectModalProps } from '../../Models/ComponentProps/ProjectModalProps'
import Modal from '../UI-components/Modal/Modal'
import ERROR from '../../Constants/ConstantErrors';
import { CreateProject, UpdateProject } from '../services/ProjectService/ProjectService';
import { useSelector } from 'react-redux';
import { AppState } from '../../Models/Reducer/AppState';
import { CreateProjectRequest } from '../../Models/Projects/CreateProjectRequest';
import { GetProjects } from '../../Actions/ProjectActions';
import { useAppDispatch } from '../../main';
import GoogleAutoComplete from '../GoogleAutoComplete/GoogleAutoComplete';
import { Address } from '../../Models/Address/Address'

import './ProjectModal.css'
import { Project } from '../../Models/Projects/Project';

function ProjectModal(props: ProjectModalProps) {

    const [title, setTitle] = useState<string>(props.project?.title ?? '');
    const [description, setDescription] = useState<string>(props.project?.description ?? '');
    const [address, setAddress] = useState<Address>(props.project?.address ?? new Address());
    const user = useSelector((state: AppState) => state.user);

    const [titleError, setTitleError] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<string>("");
    const [addressError, setAddressError] = useState<string>("");
    const [canCreate, setCanCreate] = useState<boolean>(false);

    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (title.length < 10 || title.length > 150) {
            setTitleError(ERROR.CREATE_PROJECT_ERROR.TITLE_LENGTH)
        } else {
            setTitleError("")
        }
    }, [title]);

    useEffect(() => {
        if (description.length < 10 || description.length > 200) {
            setDescriptionError(ERROR.CREATE_PROJECT_ERROR.DESCRIPTION_LENGTH)
        } else {
            setDescriptionError("")
        }
    }, [description]);

    useEffect(() => {
        if (!address || !address.latitude || !address.longitude || address.name === '') {
            setAddressError(ERROR.CREATE_PROJECT_ERROR.LOCATION_EMPTY)
        } else {
            setAddressError("")
        }
    }, [address])

    useEffect(() => {
        setCanCreate(!titleError && !descriptionError && description !== '' && title !== '')
    }, [titleError, descriptionError, title, description])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handAddressChange = (address: Address) => {
        if (address) {
            setAddress(address)
        }
    }

    const createProjectHandler = () => {
        if (canCreate && address) {
            let request: CreateProjectRequest = {
                title: title,
                description: description,
                userId: user.id,
                addressRequest: {
                    latitude: address.latitude,
                    longitude: address.longitude,
                    name: address.name,
                }
            };

            CreateProject(request).then(() => {
                console.log('project created')
                props.openHandler(false);
                appDispatch(GetProjects(user.id))
            }).catch(() => {
                console.log('project creation failed')
            })
        }
    }


    const UpdateProjectHandler = () => {
        if (canCreate && address && props?.project?.projectId) {
            let editProjectRequest: Project = props.project;
            editProjectRequest.title = title;
            editProjectRequest.description = description;
            editProjectRequest.address = {
                ...address,
                addressId: props.project?.addressId,
            };

            UpdateProject(editProjectRequest).then(() => {
                console.log('project updated')
                props.openHandler(false);
                appDispatch(GetProjects(user.id))
            }).catch(() => {
                console.log('project update failed')
            })
        }
    }

    const onClickHandler = () => {
        if (props && props.isEdit) {
            UpdateProjectHandler();
        } else {
            createProjectHandler();
        }
    }

    return (
        <>
            {props && props.open &&
                <Modal open={props.openHandler}>
                    <div className="project-create-container">
                        <h2 className='create-project-header'>{props.isEdit ? 'Edit' : 'Create A'} Project</h2>
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
                            <label htmlFor="address" >Location</label>
                            <GoogleAutoComplete address={address} setAddress={handAddressChange} />
                            <div className='input-error'>{addressError}</div>
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
                            <button disabled={!canCreate} onClick={onClickHandler}>{props.isEdit ? 'Edit' : 'Create'} Project</button>
                            <button onClick={() => props.openHandler(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            }
        </>

    )
}

export default ProjectModal