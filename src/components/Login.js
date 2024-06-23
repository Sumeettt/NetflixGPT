import { useRef, useState } from "react";
import Header from "./Header";
import checkValidData from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
 

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

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
                    const user = userCredential.user;
                })
                .catch((error) => {
                    console.log(`${error.code} - ${error.message}`);
                    setErrorMessage("Incorrect Email or Password");
                });
        }
    };

    return (
        <div className="relative">
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                alt="background img"
                className="brightness-50 absolute"
            />
            <Header />
            <form onSubmit={(e) => e.preventDefault()} className="absolute w-3/12 bg-black text-white my-36 mx-auto left-0 right-0 bg-opacity-60 p-11">
                <h1 className="text-3xl font-bold pb-5">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        placeholder="Full Name"
                        type="text"
                        className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent rounded"
                        ref={name}
                    />
                )}
                <input
                    placeholder="Email Address"
                    type="text"
                    className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent rounded"
                    ref={email}
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="p-2 my-2 w-full border-white border-[1px] border-solid bg-transparent rounded"
                    ref={password}
                />
                <p className="text-red-600">{errorMessage}</p>
                <button className="p-2 my-4 w-full bg-red-700 rounded" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="pt-11">
                    <span className="text-gray-400">{isSignInForm ? "New to Netflix? " : "Already a user? "}</span>
                    <span className="cursor-pointer hover:underline" onClick={toggleSignInForm}>
                        {isSignInForm ? "Sign Up Now" : "Sign In"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
