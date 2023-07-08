import React, { useState } from "react";
import replyIcon from "../assets/icons/icon-reply.svg";
import deleteIcon from "../assets/icons/icon-delete.svg";
import editIcon from "../assets/icons/icon-edit.svg";
import IconBtn from "./IconBtn";
import { useLocalStorage } from "usehooks-ts";

const CommentHeader = ({ id, user, createdAt, deleteComment, setEditing }) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useLocalStorage("replyText", "");
  const [replies, setReplies] = useState([]);

  const respond = () => {
    setReplying(true);
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      const newReply = {
        id: generateId(),
        user: user.username,
        createdAt: new Date().toISOString(),
        content: replyText,
        replies: [],
      };

      setReplies((prevReplies) => [newReply, ...prevReplies]);
      setReplyText("");
      setReplying(false);
    }
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 7);
  };

  const timeSinceCreated = (createdAt) => {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const timeDiff = Math.round((currentTime - createdTime) / 1000); // Time difference in seconds

    if (timeDiff < 60) {
      return `${timeDiff} seconds${timeDiff !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDiff / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  const handleDeleteReply = (replyId) => {
    const updatedReplies = replies.filter((reply) => reply.id !== replyId);
    setReplies(updatedReplies);
  };

  const renderReplies = (replies) => {
    return (
      <div className="ml-6 mt-2 ">
        {replies.map((reply) => (
          <div key={reply.id} className="ml-6 mt-2">
            <div className="flex flex-row items-center">
              <img src="./images/image-juliusomo.png" alt="-" width={30} />
              <span className="font-medium mr-2 ml-2">juliusomo</span>
              <span className="font-normal text-slate-400">
                {timeSinceCreated(reply.createdAt)}
              </span>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <p>{reply.content}</p>
              <div className="flex justify-end mt-2">
                {user.username === reply.user && (
                  <button
                    className="text-rose-700 font-medium"
                    onClick={() => handleDeleteReply(reply.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              {reply.replies &&
                reply.replies.length > 0 &&
                renderReplies(reply.replies)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <img src={user.image.png} alt="." className="mr-2" width={30} />
          <span className="font-medium mr-2">{user.username}</span>
          <span className="font-normal text-slate-400">1 week ago</span>
        </div>
        <div className="flex flex-row">
          {user.username === "juliusomo" ? (
            <div className="flex flex-row items-center space-x-4">
              <button
                className="flex flex-row items-center"
                onClick={() => deleteComment(id)}
              >
                <img src={deleteIcon} alt="" className="mr-2" />
                <span className="text-rose-700 font-medium">Delete</span>
              </button>
              <button
                className="flex flex-row items-center"
                onClick={() => setEditing(true)}
              >
                <img src={editIcon} alt="" className="mr-2" />
                <span className="text-violet-900 font-medium">Edit</span>
              </button>
            </div>
          ) : (
            <button className="flex flex-row items-center" onClick={respond}>
              <img src={replyIcon} alt="" className="mr-2" />
              <span className="text-violet-900 font-medium">Reply</span>
            </button>
          )}
        </div>
      </div>
      {replying && (
        <div className="flex flex-row items-center mt-2">
          <input
            type="text"
            value={replyText}
            onChange={handleReplyChange}
            placeholder="Write a reply..."
            className="border border-gray-300 rounded-lg px-2 py-1 w-full h-14 mr-2 "
          />
          <button
            className="bg-violet-700 text-white px-5 py-2 rounded-lg"
            onClick={handleReplySubmit}
          >
            Reply
          </button>
        </div>
      )}
      {replies.length > 0 && renderReplies(replies)}
    </div>
  );
};

export default CommentHeader;
