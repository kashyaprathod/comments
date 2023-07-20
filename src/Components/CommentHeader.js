import React, { useState } from "react";
import replyIcon from "../assets/icons/icon-reply.svg";
import deleteIcon from "../assets/icons/icon-delete.svg";
import editIcon from "../assets/icons/icon-edit.svg";
import IconBtn from "./IconBtn";
import { useLocalStorage } from "usehooks-ts";

const CommentHeader = ({ id, user, createdAt, deleteComment, setEditing, replying, setReplying }) => {
  const [replyText, setReplyText] = useLocalStorage("replyText", "");
  const [replies, setReplies] = useState([]);

  const showReplyComment = () => {
    setReplying(!replying);
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
            <button className="flex flex-row items-center" onClick={showReplyComment}>
              <img src={replyIcon} alt="" className="mr-2" />
              <span className="text-violet-900 font-medium">Reply</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentHeader;
