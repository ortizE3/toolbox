import axios from "axios";
import { Project } from "../../../Models/Projects/Project";
import { CreateProjectRequest } from "../../../Models/Projects/CreateProjectRequest";

const API_BASE_URL = "https://localhost:7284";

export const CreateProject = async (request: CreateProjectRequest): Promise<Project> => {
    try {
        const response = await axios.post<Project>(`${API_BASE_URL}/Project`, request);
        return response.data;
    } catch (error) {
        console.error("Error Creating project data:", error);
        throw error;
    }
};