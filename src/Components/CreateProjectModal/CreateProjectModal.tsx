import { ChangeEvent, useEffect, useState } from 'react';
import { CreateProjectProps } from '../../Models/ComponentProps/CreateProjectProps'
import Modal from '../UI-components/Modal/Modal'
import ERROR from '../../Constants/ConstantErrors';
import { CreateProject } from '../services/ProjectService/ProjectService';
import { useSelector } from 'react-redux';
import { AppState } from '../../Models/Reducer/AppState';
import { CreateProjectRequest } from '../../Models/Projects/CreateProjectRequest';
import { GetProjects } from '../../Actions/ProjectActions';
import { useAppDispatch } from '../../main';
import GoogleAutoComplete from '../GoogleAutoComplete/GoogleAutoComplete';

import './CreateProjectModal.css'
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Coordinates } from '../../Models/Shared/coordinates';

function CreateProjectModal(props: CreateProjectProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>();
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

    const createProject = () => {
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
                props.open(false);
                appDispatch(GetProjects(user.id))
            }).catch(() => {
                console.log('project creation failed')
            })
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
                    <GoogleAutoComplete setAddress={handAddressChange} />
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
                    <button disabled={!canCreate} onClick={createProject}>Create Project</button>
                    <button onClick={() => props.open(false)}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateProjectModal