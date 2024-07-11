import { SignupInput } from "@yashvardhandhondge/medium";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate= useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  });
 async function sendRequest(){
 try{ 
    console.log("send");
    
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
     const jwt =response.data ;
    //  console.log();
     
     localStorage.setItem("token",jwt.jwt);
     navigate("/blogs")
}catch (e){

 } 
}

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col justify-center">
        <div className=" text-xl font-extrabold justify-center">Create an account</div>
        <br />
        <div className="text-slate-400 justify-center">
         {type==="signin"?"Don`t Have an account": "Already have an account?"}
          <Link to={type==="signin"?"/signup":"/signin"} className="pl-2 underline justify-center">
          { type==="signin"?"Sign up": "Sign in"}
          </Link>
        </div><br />
       { type ==="signup"? <LabeledInput
          label="Name"
          Placeholder="Yashvardhan Dhondge"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value
            });
          }}
        />:null}<br/>
          <LabeledInput
          label="Username"
          Placeholder="Yashvardhanhdondge@gmail.com"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value
            });
          }}
        /><br/>
          <LabeledInput
          label="Password"
          Placeholder={"Password"}
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            });
          }}
        /><br/>
       <button onClick={sendRequest} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{type=== "signup"?"Sign up ":"Sign in"}</button>
        </div>
      
    </div>
  );
};

interface LabeledInputType {
  label: string;
  Placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?:string
}

function LabeledInput({ type,label, Placeholder, onChange }: LabeledInputType) {
  return (
    <div>
      <label className=" justify-center block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type||"text"}
        id="first_name"
        className= "justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={Placeholder}
        required
      />
    </div>
  );
}
