const GptSearchBar = () => {
  return (
    <div className="absolute pt-[8%] w-screen text-center">
        <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="py-3 w-[40%] mr-4 pl-3 text-xl rounded  outline-none"  placeholder="What would you like to watch today?" />
            <button className="py-3 w-[7%] bg-red-700 text-white text-xl cursor-pointer rounded hover:bg-red-600">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar