import React from 'react';
import Comments from './Comments';


const CommentList = ({comments, deleteComment, editComment, updateReplies}) => {
  return (
    <div className = "flex flex-col justify-center items-center">
      {
        comments.map((comment) => {
          return <Comments key={comment.id} {...comment} deleteComment={deleteComment} editComment={editComment} updateReplies={updateReplies}/>
        })
      }
    </div>
  )
}

export default CommentList