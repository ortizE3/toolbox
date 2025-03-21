import axios from "axios";
import { User } from "../../../Models/User/User";
import { CreateUserRequest } from "../../../Models/User/CreateUserRequest";

const API_BASE_URL = "https://localhost:7284";

export const GetUser = async (id: string): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}/User?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching User data:", error);
        throw error;
    }
};

export const CreateUser = async (user: CreateUserRequest): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_BASE_URL}/User`, user);
        return response.data;
    } catch (error) {
        console.error("Error Creating User:", error);
        throw error;
    }
};