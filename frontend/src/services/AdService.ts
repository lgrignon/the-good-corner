import { BACKEND_URL } from "@/constants";
import axios from "axios";

export interface CreateAdData {
    title: string;
    price?: number;
    owner: string;
    description?: string;
    picture?: string;
    location?: string;
}

export class AdService {

    async createAd(data: CreateAdData) {
        console.log("create ad for data ", data)
        const response = await axios.post(BACKEND_URL + '/ads', data);
        console.log('create ad DONE ', response)
    }

}

export const adService = new AdService();