# NetflixGPT


- Create React App
- Configured TailwindCSS
- Header Added
- Routing of App
- Sign In/Sign Up Page
- Form validation
- Firebase Setup
- Implemented Sign-Up/Sign-In logic
- Created Redux Store with userSlice
- Implemented Sign-Out logic
- Implemented Update Profile to add user name while Sign-Up
- Implemented Update Profile to add user photoURL while Sign-Up
- BugFix: trasferred onAuthStateChanged functionality from Body component to Header component for
redirection logic. This will prevent access to /browse page if the user is not logged-in and if the user is logged-in, it will prevent access to login page.


# Features

-   Login/Sign Up
        -   Sign In/Sign up Form
            (redirect to Browse Page on successful authentication)
-   Browse (after authentication)
        -   Header
        -   Main Movie
                -   Trailer in Background
                -   Title & Description
        -   MovieSuggestions
                -   MovieLists * n
-   NetflixGPT
        -   Search Bar
        -   Movie Suggestions