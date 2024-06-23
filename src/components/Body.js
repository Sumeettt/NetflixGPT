import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        },
    ]);

    useEffect(() => {
        // onAuthStateChanged is a side effect that is called during Sign-Up, Sign-In, and Sign-Out
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed up/signed in
                console.log(user);
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
            } else {
                // User is signed out
                dispatch(removeUser());
            }
        });
    }, [dispatch]);

    return <RouterProvider router={appRouter} />;
};

export default Body;
