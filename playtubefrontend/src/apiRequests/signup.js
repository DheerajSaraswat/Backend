import { user } from "../services/apisVariable";
import { apiConnector } from "../services/axiosApiConnector";


const {REGISTER_API} = user

export const signin = async( (data, dispatch)=>{
    try {
        const response = await apiConnector("POST", REGISTER_API, data);
    } catch (error) {
        
    }
} 