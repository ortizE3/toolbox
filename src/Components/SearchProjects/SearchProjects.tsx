import { useEffect, useState } from 'react'
import GoogleAutoComplete from '../GoogleAutoComplete/GoogleAutoComplete'
import { Address } from '../../Models/Address/Address';
import { QueryProjects } from '../services/ProjectService/ProjectService';
import { QueryProjectsRequest } from '../../Models/Projects/QueryProjectRequest';
import { Project } from '../../Models/Projects/Project';
import ListedProject from '../ListedProject/ListedProject';

function SearchProjects() {
    const [radius, setRadius] = useState<number>(40);
    const [address, setAddress] = useState<Address>(new Address());
    const [projects, setProjects] = useState<Project[]>();

    useEffect(() => {
        if (address) {
            let request: QueryProjectsRequest = {
                radius: radius,
                userLatitude: address.latitude,
                userLongitude: address.longitude
            }

            QueryProjects(request).then((projects: Project[]) => {
                setProjects(projects)
            }).then(() => {
                console.error('project search failed')
            })
        }
    }, [address])

    const handAddressChange = (address: Address) => {
        if (address) {
            setAddress(address)
        }
    }

    return (
        <div>
            <label htmlFor="address" >Search Radius</label>
            <GoogleAutoComplete address={address} setAddress={handAddressChange} />
            {projects &&
                <div className="project-list-container">
                    {projects.map((project: Project) => {
                        return <ListedProject key={project.projectId} {...project}></ListedProject>
                    })}
                </div>
            }
        </div>
    )
}

export default SearchProjects