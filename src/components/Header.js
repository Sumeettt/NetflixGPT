import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {userIcon} from "../utils/constants";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
            // The onAuthStateChanged side effect in the Body component will be triggered.
            // It will remove the user from the Redux store.
        }).catch((error) => {
            console.log("Sign-out Failed: " + error);
        });
    };

    return (
        <div className="absolute top-0 px-8 w-screen flex justify-between items-center bg-gradient-to-b from-black">
            <img src="/logo.png" alt="logo" className="w-44" />
            {user && (
                <div className="flex justify-between items-center h-10"> 
                    <img
                        src={userIcon}
                        alt="user"
                        className="w-10 h-10"
                    />
                    <button onClick={handleSignOut} className="ml-2 font-medium self-end text-white">
                        (Sign Out)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
