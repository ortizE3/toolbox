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
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Coordinates } from '../../Models/Shared/Coordinates'

import './ProjectModal.css'
import { Project } from '../../Models/Projects/Project';

function ProjectModal(props: ProjectModalProps) {

    const [title, setTitle] = useState<string>(props.project?.title ?? '');
    const [description, setDescription] = useState<string>(props.project?.description ?? '');
    const [address, setAddress] = useState<string>(props.project?.address ?? '');
    const [coordinates, setCoordinates] = useState<Coordinates>();
    const user = useSelector((state: AppState) => state.user);

    const [titleError, setTitleError] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<string>("");
    const [coordinatesError, setCoordinatesError] = useState<string>("");
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
        if (!address || !coordinates || !coordinates.lat || !coordinates.lng) {
            setCoordinatesError(ERROR.CREATE_PROJECT_ERROR.LOCATION_EMPTY)
        } else {
            setCoordinatesError("")
        }
    }, [coordinates])

    useEffect(() => {
        setCanCreate(!titleError && !descriptionError && description !== '' && title !== '')
    }, [titleError, descriptionError, title, description])

    useEffect(() => {
        setCoordinatesHandler()
    }, [address])


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handAddressChange = (event: any) => {
        if (event && event.length > 0) {
            setAddress(event[0].formatted_address)
        }
    }

    const setCoordinatesHandler = async () => {
        if (address) {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setCoordinates(prev => ({ ...prev, lat, lng }));
            console.log(lat, lng, address)
        }
    }

    const createProjectHandler = () => {
        if (canCreate && coordinates && address) {
            let request: CreateProjectRequest = {
                title: title,
                description: description,
                userId: user.id,
                latitude: coordinates?.lat,
                longitude: coordinates?.lng,
                address: address
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
        if (canCreate && coordinates && address && props?.project?.projectId) {
            let request: Project = {
                projectId: props.project?.projectId,
                title: title,
                description: description,
                userId: user.id,
                latitude: coordinates?.lat,
                longitude: coordinates?.lng,
                address: address
            };

            UpdateProject(request).then(() => {
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
                            <GoogleAutoComplete text={address} setAddress={handAddressChange} />
                            <div className='input-error'>{coordinatesError}</div>
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