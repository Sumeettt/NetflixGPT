import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const [dropDown, setDropDown] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

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

    return (
        <div className="absolute top-0 px-24 w-screen flex justify-between items-center bg-gradient-to-b from-black z-10">
            <img src="/logo.png" alt="logo" className="w-44" />
            {user && (
                <div 
                    className="flex justify-between items-center h-10 relative"
                >
                    <div 
                        className="flex items-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={user.photoURL}
                            alt="user"
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
            )}
        </div>
    );
};

export default Header;
