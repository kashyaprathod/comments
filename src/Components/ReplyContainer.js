import React from 'react'
import { useState } from 'react'

const ReplyContainer = ({addReply}) => {
    const [reply, setReply] = useState("");

    const clickHandler = () => {
        if (reply === "" || reply === " ") return;
        const newReply = {
            d: Math.floor(Math.random() * 100) + 5,
            content: reply,
            createdAt: "1 Month Ago",
            user: {
                image: {
                png: "./images/image-juliusomo.png",
                },
            username: "juliusomo",
            },
            replies: [],
        };

        addReply(newReply);
        setReply("");
    };
  return (
    <div className="bg-white w-2/4 p-3 mb-2 rounded-xl flex flex-row h-full">
      <div>
        <img src="./images/image-juliusomo.png" alt="-" width={30} />
      </div>

      <textarea
        className="mx-3 h-full min-h-100 w-5/6 resize-none rounded-7 border-2 rounded-md border-blue-gray-300 px-3 py-2 font-sans text-sm focus:outline-none focus:shadow-outline focus:border-blue-300 "
        onChange={(e) => {setReply(e.target.value)}}
      />

      <button
        type="submit"
        className="bg-violet-900 rounded-lg py-2 px-5 h-1/3 text-white"
        onClick={clickHandler}
      >
        REPLY
      </button>
    </div>
  )
}

export default ReplyContainer