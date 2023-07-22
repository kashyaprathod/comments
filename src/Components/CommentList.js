import React from 'react';
import Comments from './Comments';


const CommentList = ({comment, comments, commentDelete, commentUpdate, updateReplies}) => {
  const delComment = (id, type) => {
    console.log(id);
    // console.log("PARENT: " + comment.id);
    console.log(type);
    if(type === "reply"){
      const replyId = id;
      const parentId = comment.id;
      commentDelete(replyId, type, parentId);
    }else{
      commentDelete(id, type);
    }
  }

  const editComment = (id, type, newContent) => {
    console.log(type);
    if(type === "reply"){
      const replyId = id;
      const parentId = comment.id;
      commentUpdate(replyId, type, newContent, parentId);
    }else{
      commentUpdate(id, type, newContent);
    }
  }
  return (
    <div className = "flex flex-col justify-center items-center">
      {
        comments.map((comment) => {
          return <Comments key={comment.id} {...comment} comment={comment} delComment={delComment} commentDelete={commentDelete} commentUpdate={commentUpdate} editComment={editComment} updateReplies={updateReplies}/>
        })
      }
    </div>
  )
}

export default CommentList