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
      <div className="w-full h-screen bg-[#121212f5] flex flex-wrap justify-center items-center text-red-800">
        <form className="border border-black flex flex-col">
          <div>Sign in</div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
          />
          <label htmlFor="username">Username</label>
          <input
            type="name"
            name="username"
            aria-required="true"
            {...register("username")}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            aria-required="true"
            {...register("password")}
          />
          <label htmlFor="avatar">Upload Avatar</label>
          <input type="file" name="avatar" {...register("avatar")} />
          <label htmlFor="coverImage">Cover Image</label>
          <input type="file" name="coverImage" {...register("coverImage")} />
          <button onClick={handleSubmit(submitHandler)}>Register</button>
        </form>
      </div>
    </>
  );
}
export default Signup