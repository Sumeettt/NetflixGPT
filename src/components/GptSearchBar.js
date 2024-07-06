import { useRef } from "react";
import openai from "../utils/openAi";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    const searchQuery = searchText.current.value;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: "bill gates" }],
      model: 'gpt-3.5-turbo',
    });
  
  }

  return (
    <div className="absolute pt-[8%] w-screen text-center">
        <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" ref={searchText} className="py-3 w-[40%] mr-4 pl-3 text-xl rounded  outline-none"  placeholder="What would you like to watch today?" />
            <button className="py-3 w-[7%] bg-red-700 text-white text-xl cursor-pointer rounded hover:bg-red-600"
              onClick={handleGptSearchClick}
            >Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar