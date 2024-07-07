import Login from "./components/Login"
import Browse from "./components/Browse";
import VideoPlayer from "./components/VideoPlayer";
import ErrorVideoNotAvailable from "./components/error/ErrorVideoNotAvailable";
import Error from "./components/error/Error";
import Header from './components/Header';
import { Outlet, createBrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="h-screen w-screen bg-black">
      <Header/>
      <Outlet/>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path : "/",
    element: <App/>,
    children : [
      {
        path: "/",
        element : <Login/>
      },
      {
        path: "/browse",
        element: <Browse/>
      },
      {
        path: "/watch/:movieId",
        element: <VideoPlayer/>
      },
      {
        path: "/error",
        element: <ErrorVideoNotAvailable/>
      }
    ], 
    errorElement : <Error/>
  }
]);



export default App;
