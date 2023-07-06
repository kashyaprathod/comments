import React from 'react';
import Comments from './Comments';


const CommentList = ({comments}) => {
  return (
    <div className = "flex flex-col justify-center items-center">
      {
        comments.map((comment) => {
          return <Comments key={comment.id} {...comment}/>
        })
      }
    </div>
  )
}

export default CommentList