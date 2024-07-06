import Login from "./components/Login"
import Browse from "./components/Browse";
import VideoPlayer from "./components/VideoPlayer";
import ErrorVideoNotAvailable from "./components/ErrorVideoNotAvailable";
import Error from "./components/Error";
import Header from './components/Header';
import { Outlet, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {

  const isGptSearch = useSelector(store => store.gpt.showGptSearch);

  return (
    <div>
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
