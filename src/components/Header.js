import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { toggleGptSearchView } from "../redux/gptSlice";

const Header = ({isLoginPage}) => {
    const [dropDown, setDropDown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const isGptSearch = useSelector(store => store.gpt.showGptSearch);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ 
                    uid: uid,
                    email: email, 
                    displayName: displayName, 
                    photoURL: photoURL 
                }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // The onAuthStateChanged side effect will be triggered.
        }).catch((error) => {
            console.log("Sign-out Failed: " + error);
        });
    };

    const handleMouseEnter = () => {
        setDropDown(true);
    };

    const handleMouseLeave = () => {
        setDropDown(false);
    };

    const handleGptSearch = () => {
        dispatch(toggleGptSearchView());
    }

    useEffect(() => {
        const scrollHandler = () => {
            if(window.scrollY > 0) {
                setIsScrolled(true);
            }else {
                setIsScrolled(false);
            }
        }

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, []);

    return (
        <div className={`fixed top-0 px-24 py-1 w-screen flex justify-between items-center z-20 ${isScrolled ? "bg-black" : "bg-gradient-to-b from-black"} `}>
            <img src="/logo.png" alt="Logo" className={`${isLoginPage ? "w-44" : "w-36"}`} />
            {user && (
                <div className="flex justify-center items-center">
                    <button className="text-white mr-3 py-2 w-32 bg-blue-800 rounded font-medium hover:bg-blue-700"
                    onClick={handleGptSearch}
                    >
                        {isGptSearch ? "Home" : "GPT Search"}
                    </button>
                    <div 
                        className="relative"
                    >
                        <div 
                            className="flex items-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-10 h-10 mr-2 rounded"
                            />
                            {dropDown ? <i className="fa-solid fa-caret-down text-white"></i> : 
                        <i className="fa-solid fa-caret-up text-white"></i>}
                        </div>
                        
                        {dropDown && (
                            <div
                                className="absolute top-[40px] right-0  w-[200px] pt-5 "
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div 
                                    className="py-2 text-center bg-blue-500 bg-opacity-50 text-white"
                                >
                                    <p className="pb-2">Hello, {user.displayName}</p>
                                    <button onClick={handleSignOut} className="ml-2 hover:underline">
                                        Sign out of App
                                    </button>   
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
