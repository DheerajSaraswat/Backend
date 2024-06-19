// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import {useNavigate} from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {signup} from "../apiRequests/signup.js"

// function Signup() {
//     const navigate = useNavigate();
//     // const [data, setData] = useState("");
//     const dispatch = useDispatch();
//     const {register, handleSubmit, watch} = useForm();

//     const data = watch();
//     // console.log(typeof data)
//     // const [error, setError] = useState("")

//     // const createAccount = async(data) => {
//     //     setError("")
//     //     try {
//     //         const res = await signup(data, dispatch)
//     //         console.log("SUCCESSFULLY REGISTERED")
//     //         console.log(res);
//     //     } catch (error) {
//     //         setError(error.message)
//     //     }
//     // }

//     async function submitHandler() {
//       const res = await signup(data, dispatch);
//       console.log("SUCCESSFULLY REGISTERED");
//       console.log(res);
//     }
//     const formSubmit = e => e.preventDefault();

//   return (
//     <>
//       <div className="w-full h-screen bg-[#121212f5] flex flex-wrap justify-center items-center text-red-800 ">
//         <form encType="multipart/form-data" onSubmit={formSubmit} className="border border-white flex flex-col gap-2 px-8 py-4">
//           <div className="text-center text-white text-4xl font-bold">
//             Sign in
//           </div>
//           <label htmlFor="name" className="text-[#AE7AFF]">
//             Full Name
//           </label>
//           <input
//             required
//             type="text"
//             name="name"
//             {...register("name", { required: true })}
//             placeholder="Full Name"
//             className=" text-black px-2 py-1 outline-none"
//           />
//           <label htmlFor="username" className="text-[#AE7AFF]">
//             Username
//           </label>
//           <input
//             required
//             type="text"
//             name="username"
//             {...register("username", {required: true})}
//             placeholder="username"
//             className=" text-black px-2 py-1 outline-none"
//           />
//           <label htmlFor="email" className="text-[#AE7AFF]">
//             Email
//           </label>
//           <input
//             required
//             type="email"
//             name="email"
//             placeholder="example@gmail.com"
//             {...register("email", {
//               required: true,
//               pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             })}
//             className=" text-black px-2 py-1 outline-none"
//           />
//           <label htmlFor="password" className="text-[#AE7AFF]">
//             Password
//           </label>
//           <input
//             required
//             type="password"
//             name="password"
//             placeholder="*****"
//             {...register("password", {required: true})}
//             className=" text-blackpx-2 py-1 px-2 outline-none"
//           />
//           <label htmlFor="avatar" className="text-[#AE7AFF]">
//             Upload Avatar
//           </label>
//           <input
//             required
//             type="file"
//             name="avatar"
//             {...register("avatar", {required: true})}
//             className="text-white"
//           />
//           <label htmlFor="coverImage" className="text-[#AE7AFF]">
//             Cover Image
//           </label>
//           <input
//             required
//             type="file"
//             name="coverImage"
//             {...register("coverImage", {required: true})}
//             className="text-white"
//           />
//           <button id="but" onClick={handleSubmit(submitHandler)}  className=" py-2 px-6 text-[#Ae7aff] border border-[#ae7aff] bg-gray-900 font-semibold active:border-white active:text-white" >Register</button>
//         </form>
//       </div>
//     </>
//   );
// }
// export default Signup

import { useState } from "react";
// import { useDispatch } from "react-redux";
import { signup } from "../apiRequests/signup.js";
import { login } from "../apiRequests/login.js";
import { useDispatch } from "react-redux";

function Signup() {
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();

  function changePage() {
    setIsMember(!isMember);
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = [...formData.values()];
    const isEmpty = values.includes("");
    if (isMember) {
      if (isEmpty) {
        console.log("All field are required");
      }
    } else {
      const isAvatarEmpty = values[3].name === "";
      const isCoverImageEmpty = values[4].name === "";
      if (isEmpty || isAvatarEmpty || isCoverImageEmpty) {
        console.log("All fields are required");
      }
    }
    uploadData(formData)
  }

  async function uploadData(data) {
    console.log(data);
    if (!isMember) {
      const res = await signup(data, dispatch);
      console.log("SUCCESSFULLY REGISTERED");
      console.log(res);
    } else {
      const res = await login(data, dispatch);
      console.log("SUCCESSFULLY LOGINED");
      console.log(res);
    }
  }

  return (
    <section className="h-screen w-screen bg-[#121212f5] flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="form bg-[#121111f5] text-white h-auto w-[25rem] border-2 border-black px-8 py-6"
      >
        <h1 className=" text-center text-4xl sm:text-2xl md:text-2xl mb-5">
          {isMember ? "Login" : "Register"}
        </h1>
        {!isMember && (
          <div className="text-xl sm:text-lg md:text-lg flex flex-col mb-3">
            <label htmlFor="fullName" className="">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="outline-none text-black px-2 py-1"
            />
          </div>
        )}
        <div className="text-xl sm:text-lg md:text-lg flex flex-col mb-3">
          <label htmlFor="username" className="">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="outline-none text-black px-2 py-1"
          />
        </div>

        <div className="text-xl sm:text-lg md:text-lg flex flex-col mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="outline-none text-black px-2 py-1"
          />
        </div>
        <div className="text-xl sm:text-lg md:text-lg flex flex-col mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="outline-none text-black px-2 py-1"
          />
        </div>
        {!isMember && (
          <div className="mb-3">
            <label htmlFor="avatar">Avatar</label>
            <input type="file" name="avatar" id="avatar" />
          </div>
        )}
        {!isMember && (
          <div className="mb-5">
            <label htmlFor="coverImage">Cover Image</label>
            <input type="file" name="coverImage" id="coverImage" />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-800 w-full py-2 mb-3
        ]"
        >
          Submit
        </button>
        {isMember ? (
          <>
            <p className="text-center">
              Haven't registered yet?{" "}
              <span onClick={changePage} className="text-blue-600">
                Register Here
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="text-center">
              Already a User?{" "}
              <span onClick={changePage} className="text-blue-600">
                Login
              </span>
            </p>
          </>
        )}
      </form>
    </section>
  );
}
export default Signup;
