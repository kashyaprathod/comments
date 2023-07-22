import React, { useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentList from "./CommentList";
import ReplyContainer from "./ReplyContainer";

const Comments = ({
  id,
  user,
  createdAt,
  comment,
  replyingTo,
  commentDelete,
  delComment,
  content,
  replies,
  editComment,
  commentUpdate,
  updateReplies
}) => {
  const [commentData, setCommentData] = useState(content);
  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);

  const updateText = () => {
    if(replyingTo){
      editComment(id, "reply", commentData)
    }else{
      editComment(id, "comment", commentData);
    }



    // editComment(commentData, id);
    setEditing(false);
  };

  const addReply = (newReply) => {
    const newReplies = [...replies, newReply];
    updateReplies(newReplies, id);
    setReplying(false);
  };

  const deleteComment = (commentId, type) => {
    // const finalType = (type !== "undefined") ? type : "comment";
    delComment(id, type);
  }

  return (
    <>
      <div className="bg-white w-2/4 p-3 mb-2 rounded-xl flex flex-col">
        <div className="">
          <CommentHeader
            replying={replying}
            setReplying = {setReplying}
            user={user}
            createdAt={createdAt}
            id={id}
            comment={comment}
            replyingTo={replyingTo}
            deleteComment={deleteComment}
            editing = {editing}
            setEditing={setEditing}
          />
        </div>
        <div className="min-w-full pt-3 pb-3">
          {!editing ? (
            replyingTo ? 
            <div>
              <span className="font-bold text-violet-500">{"@" + replyingTo + " "}</span> 
              <span className="text-slate-700">{content}</span>
            </div>
            : 
            <span className="text-slate-700">{content}</span>
          ) : (
            <textarea
              className="w-full p-2 h-2/5 rounded-7 border-2 rounded-md border-blue-gray-300"
              onChange={(e) => setCommentData(e.target.value)}
              value={commentData}
            ></textarea>
          )}
          {editing && (
            <button
              className="text-white font-medium bg-violet-900 p-2 rounded-md"
              onClick={updateText}
            >
              UPDATE
            </button>
          )}
        </div>
      </div>
      {replying && <ReplyContainer addReply = {addReply}/>}
      {replies?.length > 0 && <CommentList comment={comment} comments={replies} commentDelete={commentDelete} commentUpdate={commentUpdate}/>}
    </>
  );
};
export default Comments;
