import React from 'react'

const Chatbox = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCoinDetails = async (prompt) => {
    setLoading(true);

    try {
     
      const response = await api.post("/ai/chat", { prompt });
      const data = response.data;
      const ans={message:data.message,role:"modal"}
      const userMessage={message:prompt,role:"user"}
      setResponses([...responses, userMessage, ans]);
      setLoading(false); 
      console.log("response : ", data)
    } catch (error) {
      setLoading(false);
      console.log("error ", error);
      setError(error.response?.data);
    }
  }
  return (
    <div className='chatbox blur-background large-shadow z-50 bg-[#000518]
    bg-opacity-70 w-[90vw] md:w[]'>
      <div className="h-[13%] pl-3 border-b border-gray-700 flex gap-x-4 items-center">
        <img
          className="rounded-full w-12 h-12"
          src="https://cdn.pixabay.com/photo/2023/05/29/18/53/cyborg-8026949_640.jpg"
        />

        <div>
          <h1 className="text-lg font-semibold">Ai Chat Bot</h1>
          <p className="text-gray-400 text-sm">
            Real Time Crypto Market Data
          </p>
        </div>
      </div>

      <div className="h-[77%]">
      {responses.length ? (
            <div className="flex flex-col py-5 px-5 overflow-y-auto h-full custom-scrollbar">
              {responses.map((item, index) =>
                item.role == "user" ? (
                  <div ref={chatContainerRef} className="self-end" key={index}>
                    <PromptMessage message={item.message} index key={index} />
                  </div>
                ) : (
                  <div
                    ref={chatContainerRef}
                    className="self-start"
                    key={index}
                  >
                    <Message message={item.message} />
                  </div>
                )
              )}
              {loading && <p>fetching data...</p>}
            </div>
          ) : (
        <div className="p-10 gap-5 h-full flex flex-col justify-center items-center">
          <p className=" font-bold text-2xl">
            Welcome to the Crypto Chat Bot
          </p>
          <p className="text-gray-500">inquire about market data.</p>
        </div>
          )}
      </div>
      <div className="h-[10%] bottom-0 px-5">
      <input
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                setResponses([...responses, { message: prompt, role: "user" }]);
                fetchCoinDetails(e.target.value);
                setPrompt("");
              }
            }}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-full rounded-full  border-gray-700 border bg-transparent px-5 w-full outline-none"
            placeholder="give your prompt"
          />
      </div>

    </div>
  )
}

export default Chatbox