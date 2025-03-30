import React, { useEffect, useState } from 'react'
import GoogleAutoComplete from '../GoogleAutoComplete/GoogleAutoComplete'
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Coordinates } from '../../Models/Shared/Coordinates';
import { QueryProjects } from '../services/ProjectService/ProjectService';
import { QueryProjectsRequest } from '../../Models/Projects/QueryProjectRequest';
import { Project } from '../../Models/Projects/Project';
import ListedProject from '../ListedProject/ListedProject';

function SearchProjects() {
    const [radius, setRadius] = useState<number>(40);
    const [address, setAddress] = useState<string>('');
    const [coordinates, setCoordinates] = useState<Coordinates>();
    const [userProjects, setUserProjects] = useState<Project[]>();

    useEffect(() => {
        setCoordinatesHandler()
    }, [address])

    useEffect(() => {
        if (coordinates) {
            let request: QueryProjectsRequest = {
                radius: radius,
                userLatitude: coordinates.lat,
                userLongitude: coordinates.lng
            }

            QueryProjects(request).then((projects: Project[]) => {
                setUserProjects(projects)
            }).then(() => {
                console.error('project search failed')
            })
        }
    }, [coordinates])

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
    return (
        <div>
            <label htmlFor="address" >Search Radius</label>
            <GoogleAutoComplete setAddress={handAddressChange} />
            {userProjects &&
                <div className="project-list-container">
                    {userProjects.map((project: Project) => {
                        return <ListedProject key={project.projectId} {...project}></ListedProject>
                    })}
                </div>
            }
        </div>
    )
}

export default SearchProjects