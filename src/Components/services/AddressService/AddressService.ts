import axios from "axios";
import { CreateAddressRequest } from "../../../Models/Address/CreateAddressRequest";

const API_BASE_URL = "https://localhost:7284";

export const PatchDefaultUserAddress = async (userId: string, request: CreateAddressRequest): Promise<void> => {
    try {
        await axios.patch(`${API_BASE_URL}/Address/${userId}`, request);
    } catch (error) {
        console.error("Error patching default user address:", error);
        throw error;
    }
};

export const RemoveDefaultUserAddress = async (userId: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/Address/${userId}`);
    } catch (error) {
        console.error("Error deleting default user address:", error);
        throw error;
    }
};
