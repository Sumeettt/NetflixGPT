import { useRef } from "react";
import openai from "../../utils/openAi";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    const searchQuery = searchText.current.value;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: searchQuery }],
      model: 'gpt-3.5-turbo',
    });
  
  }

  return (
    <div className="pt-[15%] sm:pt-[12%] xl:pt-[8%] w-screen text-center hidden">
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <input type="text" ref={searchText} className="py-3 w-[70%] xl:w-[40%] mr-4 pl-3 text-sm xl:text-xl rounded  outline-none "  placeholder="What would you like to watch today?" />
            <button disabled className="py-3 w-[20%] xl:w-[7%] bg-red-700 text-white text-sm xl:text-xl cursor-pointer rounded hover:bg-red-600"
              onClick={handleGptSearchClick}
            >Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar