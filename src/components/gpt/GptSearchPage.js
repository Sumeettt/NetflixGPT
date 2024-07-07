import GptSearchBar from "./GptSearchBar"
import GptMovieSuggestions from "./GptMovieSuggestions"

const GptSearchPage = () => {
  return (
    <div className="w-screen min-h-screen relative bg-gradient-to-b from-black to to-red-600 ">
      <GptSearchBar/>
      <GptMovieSuggestions/>
      <div className="pt-[15%] sm:pt-[12%] xl:pt-[6%]">
        <h1 className="text-white text-center text-2xl xl:text-4xl font-md py-5">Feature Under Construction!</h1>
        <img className="w-[90%]  lg:w-[50%] mx-auto  "  alt="GIF" src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif"/>     
      </div>
    </div>
  )
}

export default GptSearchPage