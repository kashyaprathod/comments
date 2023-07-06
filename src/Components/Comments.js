import React from 'react';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';


const Comments = ({id, user, createdAt, deleteComment, content, replies}) => {
  return (
    <>
    <div className='bg-white w-2/4 p-3 mb-2 rounded-xl'>
        <CommentHeader user={user} createdAt={createdAt} id={id} deleteComment={deleteComment}/>
        <div className="w-11/12 pt-3 pb-3">
            <span className="text-slate-700">{content}</span>
        </div>
    </div>
    {
        replies?.length > 0 && (
            <CommentList comments={replies}/>
        )
    }
    </>
  )
}
export default Comments