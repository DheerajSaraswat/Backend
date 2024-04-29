import { useForm } from "react-hook-form";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("")

    const createAccount = async(data) => {
        setError("")
        try {
            
        } catch (error) {
            setError(error.message)
        }
    }

    const submitHandler = data => setData( () => data )
    console.log(data);

  return (
    <>
      <div className="w-full h-screen bg-[#121212f5] flex flex-wrap justify-center items-center text-red-800 ">
        <form className="border border-white flex flex-col gap-2 px-8 py-4 ">
          <div className="text-center text-white text-4xl font-bold">
            Sign in
          </div>
          <label htmlFor="name" className="text-[#AE7AFF]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            className="bg-[#bba7da] text-black px-2 py-1 outline-none"
          />
          <label htmlFor="username" className="text-[#AE7AFF]">
            Username
          </label>
          <input
            type="name"
            name="username"
            aria-required="true"
            {...register("username")}
            className="bg-[#bba7da] text-black px-2 py-1 outline-none"
          />
          <label htmlFor="email" className="text-[#AE7AFF]">
            Email
          </label>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
            className="bg-[#bba7da] text-black px-2 py-1 outline-none"
          />
          <label htmlFor="password" className="text-[#AE7AFF]">
            Password
          </label>
          <input
            type="password"
            name="password"
            aria-required="true"
            {...register("password")}
            className="bg-[#bba7da] text-blackpx-2 py-1 outline-none"
          />
          <label htmlFor="avatar" className="text-[#AE7AFF]">
            Upload Avatar
          </label>
          <input
            type="file"
            name="avatar"
            {...register("avatar")}
            className="text-white"
          />
          <label htmlFor="coverImage" className="text-[#AE7AFF]">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            {...register("coverImage")}
            className="text-white"
          />
          <button onClick={handleSubmit(submitHandler)} className=" py-2 px-6 text-[#Ae7aff] border border-[#ae7aff] bg-gray-900 font-semibold" >Register</button>
        </form>
      </div>
    </>
  );
}
export default Signup