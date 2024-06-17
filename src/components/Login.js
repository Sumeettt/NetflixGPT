import { useState } from "react";
import Header from "./Header"

const Login = () => {
    const [isSignInForm, setIsSignInForm ] = useState(true);

    const toggleSignInFrom = () => {
        setIsSignInForm(!isSignInForm);
    }

    return(
        <div className="relative">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                alt="background img"
                className="brightness-50 absolute"
            />
             <Header/>
             <form className="absolute w-3/12  bg-black text-white my-36 mx-auto left-0 right-0 bg-opacity-60 p-11 ">
                <h1 className="text-3xl font-bold pb-5">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                
                {!isSignInForm &&
                    <input
                        placeholder="Full Name"
                        type="text"
                        className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent rounded"
                     />
                }
                <input
                    placeholder="Email Address"
                    type="text"
                    className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent rounded"
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent rounded"
                />
                <button
                    className="p-2 my-4 w-full bg-red-700 rounded"
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="pt-11">
                    <span className="text-gray-400">
                        {isSignInForm ? "New to Netflix? " : "Already a user? "}
                    </span>
                    <span className="cursor-pointer hover:underline" onClick={toggleSignInFrom}>
                        {isSignInForm ? "Sign Up Now" : "Sign In"}
                    </span>
                </p>
             </form>
        </div>
    )
}

export default Login;