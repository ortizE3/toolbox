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

export const GetAllProjects = async (userId: string): Promise<Project[]> => {
    try {
        const response = await axios.get<Project[]>(`${API_BASE_URL}/Project?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error Getting All project data:", error);
        throw error;
    }
};

export const DeleteProject = async (projectId: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/Project?projectId=${projectId}`);
    } catch (error) {
        console.error(`Error Deleting project ${projectId}:`, error);
        throw error;
    }
};