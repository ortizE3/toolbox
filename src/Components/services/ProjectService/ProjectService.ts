import axios from "axios";
import { Project } from "../../../Models/Projects/Project";

const API_BASE_URL = "https://localhost:7284";

export const fetchProjectData = async (): Promise<Project[]> => {
    try {
        const response = await axios.get<Project[]>(`${API_BASE_URL}/Project`);
        return response.data;
    } catch (error) {
        console.error("Error fetching project data:", error);
        throw error;
    }
};