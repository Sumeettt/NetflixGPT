import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { toggleGptSearchView } from "../redux/gptSlice";

const Header = () => {
    const [dropDown, setDropDown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const isVideo = useSelector(store => store.movies.videoPlayerVideo);
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
    }, [dispatch, navigate]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // The onAuthStateChanged side effect will be triggered.
            setDropDown(false);
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

    const handleClick = () => {
        setDropDown(!dropDown)
    }

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

    const handleLogoClick = () => {
        if(user) navigate("/browse");
        
    };

    return (
        <div className={`fixed top-0 px-3 md:px-8 xl:px-16 py-2 w-screen flex justify-between items-center z-20 ${isScrolled ? "bg-black bg-opacity-80" : "bg-gradient-to-b from-black"} ${isVideo ? "hidden" : "block"} `}>
            <img onClick={handleLogoClick} src="/logo.png" alt="Logo" className={`hidden md:block ${user ? "w-36" : "w-44"}`} />
            <img onClick={handleLogoClick} src="/logo2.png" alt="Logo" className={`block md:hidden ${user ? "w-7" : "w-8"}`} />
            {user && (
                <div className="flex justify-center items-center">
                    <button className="text-white mr-3  text-sm md:text-lg"
                    onClick={handleGptSearch}
                    >
                        {isGptSearch ? "Home" :  
                        <>
                            <i className="fa-solid fa-magnifying-glass mr-1"></i>
                            <span>GPT Search</span>
                        </>
                         }
                    </button>
                    <div 
                        className="relative"
                    >
                        <div 
                            className="flex items-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleClick}
                        >
                            <img
                                src={user.photoURL}
                                alt="User"
                                className="w-6 h-6 md:w-8 md:h-8 mr-2 rounded"
                            />
                            {dropDown ? <i className="fa-solid fa-caret-down text-white hidden md:block"></i> : 
                        <i className="fa-solid fa-caret-up text-white hidden md:block"></i>}
                        </div>
                        
                        {dropDown && (
                            <div
                                className="absolute top-[30px] right-0 mr-2 md:mr-0 w-[150px] md:w-[200px] md:pt-5 "
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div 
                                    className="py-2 text-center bg-blue-500 bg-opacity-70 text-white"
                                >
                                    <p className="md:pb-2 text-sm md:text-lg">Hello, {user.displayName}</p>
                                    <button onClick={handleSignOut} className="hover:underline text-sm md:text-lg">
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
