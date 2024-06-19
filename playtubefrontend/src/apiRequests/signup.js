import { user } from "../services/apisVariable";
import { apiConnector } from "../services/axiosApiConnector";
import { setLoading } from "../slices/authSlice";

const {REGISTER_API} = user
const headers = {
  "Content-Type": "multipart/form-data",
};

export const signup = async (data, dispatch)=>{
    let result = null;
    console.log(data);
    dispatch(setLoading(true))
    try {
        const res = await apiConnector("POST", REGISTER_API, data, headers);
        result = res
    } catch (error) {
        console.log(error);
    }
    console.log(result);
    dispatch(setLoading(false))
}