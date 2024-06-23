import { useRef, useState } from "react";
import Header from "./Header";
import checkValidData from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        if (errorIfAny) return; // if error in SignIn/SignUp data, don't proceed

        if (!isSignInForm) {
            // Sign-Up logic
            createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Adding User Name
                    updateProfile(user, { displayName: enteredName })
                        .then(() => {
                            // During signup, onAuthStateChanged side effect in Body component will be triggered.
                            // User object will contain email and password, but we also want to store the user's name in Redux store.
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(addUser({ uid, email, displayName }));
                            navigate("/browse");
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    setErrorMessage(`${error.code} - ${error.message}`);
                });
        } else {
            // Sign-In logic
            signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/browse");
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
