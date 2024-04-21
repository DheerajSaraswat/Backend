import { user } from "../services/apisVariable";
import { apiConnector } from "../services/axiosApiConnector";
import {setToken} from "../slices/authSlice.js";

const{LOGIN_API}= user

export const login = async(data,dispatch)=>{
    
    let result= null;
    try{

        const response = await apiConnector("POST",LOGIN_API,data);
        result = response;
           dispatch(setToken(response.data.token));
           dispatch(setUser(response.data.user));

           localStorage.setItem("token", JSON.stringify(response.data.token));
           localStorage.setItem("user", JSON.stringify(response.data.user));
        

    }catch(err){
        console.log(err);
    }
    return result
}