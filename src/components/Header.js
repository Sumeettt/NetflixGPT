import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    useEffect(() => {
        // onAuthStateChanged is a side effect that is called during Sign-Up, Sign-In, and Sign-Out
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is Signed-Up/Signed-In
                console.log(user);
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ 
                    uid: uid,
                    email:email, 
                    displayName:displayName, 
                    photoURL:photoURL 
                }));
                navigate("/browse")
                
            } else {
                // User is Signed-Out
                dispatch(removeUser());
                navigate("/");
            }
        });

        //unscubscribe when component unmounts
        return () => unsubscribe();
    }, []);


    const handleSignOut = () => {
        signOut(auth).then(() => {
            // The onAuthStateChanged side effect will be triggered.
            // It will remove the user from the Redux store and redirect to login page.
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
                        src={user.photoURL}
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
