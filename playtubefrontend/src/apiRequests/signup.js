import { user } from "../services/apisVariable";
import { apiConnector } from "../services/axiosApiConnector";
import { setLoading } from "../slices/authSlice";

const {REGISTER_API} = user
const header = 'multipart/form-data';

export const signup = async (data)=>{
    let result = null;
    console.log(data);
    // dispatch(setLoading(true))
    try {
        const res = await apiConnector("POST", REGISTER_API, data, header);
        result = res
    } catch (error) {
        console.log(error);
    }
    console.log(result);
    // dispatch(setLoading(false))
}