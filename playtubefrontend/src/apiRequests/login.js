import { user } from "../services/apisVariable";
import { apiConnector } from "../services/axiosApiConnector";
import {setLoginData, setToken} from "../slices/authSlice.js";

const{LOGIN_API}= user
const headers = {
  "Content-Type": "application/json",
};

export const login = async(data,dispatch)=>{
    let result= null;
    try{

        const response = await apiConnector("POST",LOGIN_API,data, headers);
        result = response;
           dispatch(setToken(response.data.data.accessToken));
           dispatch(setLoginData(response.data.data.user));

           localStorage.setItem(
             "token",
             JSON.stringify(response.data.data.accessToken)
           );
           localStorage.setItem(
             "user",
             JSON.stringify(response.data.data.user)
           );
        

    }catch(err){
        console.log(err);
    }
    return result
}