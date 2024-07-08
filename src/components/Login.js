import { useRef, useState } from "react";
import checkValidData from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import CopyButton from "./CopyButton";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [isDemoCredentials, setIsDemoCredentials] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
 

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const toggleDemoCredentials = () => {
        setIsDemoCredentials(!isDemoCredentials)
    }

    const handleButtonClick = () => {
        const enteredName = name.current ? name.current.value : "";
        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;

        const errorIfAny = checkValidData(enteredName, enteredEmail, enteredPassword, isSignInForm);
        setErrorMessage(errorIfAny);
        if (errorIfAny) return; // if error in Sign-In/Sign-Up data, don't proceed

        if (!isSignInForm) {
            // Sign-Up logic
            createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Adding User Name & photoURL
                    updateProfile(user, { displayName: enteredName, photoURL:USER_AVATAR })
                        .then(() => {
                            // During Sign-Up, onAuthStateChanged side effect in Header component will be triggered.
                            // User object will contain only email and password, so Redux could only store those data there,
                            // but we also want to store the user's name & photoURL in Redux store, so applying following logic.
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(addUser({ 
                                uid: uid,
                                email:email, 
                                displayName:displayName, 
                                photoURL:photoURL 
                            }));
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    if(error.code === "auth/email-already-in-use"){
                        setErrorMessage("This email address is already in use. Please use a different email address or sign in.");
                    }else{
                        setErrorMessage("An error occurred during sign-up. Please try again.");
                    }
                });
        } else {
            // Sign-In logic
            signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    //const user = userCredential.user;
                })
                .catch((error) => {
                    console.log(`${error.code} - ${error.message}`);
                    setErrorMessage("Incorrect Email or Password");
                });
        }
    };
    

    return (
        <div className="relative h-screen bg-black">
            <img 
                src= {BG_URL}
                alt="Background Img"
                className="brightness-50 absolute min-h-screen w-screen object-cover hidden md:block"
            />
            <form onSubmit={(e) => e.preventDefault()} className="absolute px-3 md:px-10 w-full md:w-6/12 xl:w-4/12 2xl:w-3/12 bg-black text-white my-24 xl:my-32 mx-auto left-0 right-0 md:bg-opacity-70 p-11">
                <h1 className="text-xl md:text-2xl font-bold md:pb-3">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        placeholder="Full Name"
                        type="text"
                        className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent outline-none rounded"
                        ref={name}
                    />
                )}
                <input
                    placeholder="Email Address"
                    type="text"
                    className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent outline-none rounded "
                    ref={email}
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent outline-none rounded"
                    ref={password}
                />
                <p className="text-red-600">{errorMessage}</p>
                <button className="p-2 my-2 w-full bg-red-700 rounded" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="pt-11 mb-2">
                    <span className="text-gray-400">{isSignInForm ? "New to Netflix? " : "Already a user? "}</span>
                    <span className="cursor-pointer hover:underline" onClick={toggleSignInForm}>
                        {isSignInForm ? "Sign Up Now" : "Sign In"}
                    </span>
                </p>
                <p>
                    <span className="text-gray-400">Demo Credentials? </span>
                    <span className="text-red-600 cursor-pointer hover:underline" onClick={toggleDemoCredentials}>{isDemoCredentials ? "Hide" : "Show"}</span>
                </p>
                {
                    isDemoCredentials && (
                        <div className="pt-5">
                            <p className="flex items-center">
                                <span className="text-gray-400 mr-2">Email Address: </span> 
                                <span className="mr-2">demo@netflix.com</span>
                                <CopyButton text={"demo@netflix.com"}/>
                            </p>
                            <p className="flex items-center">
                                <span className="text-gray-400 mr-2">Password: </span>
                                <span className="mr-2">Demo@123#987</span>
                                <CopyButton text={"Demo@123#987"}/>
                            </p>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default Login;
