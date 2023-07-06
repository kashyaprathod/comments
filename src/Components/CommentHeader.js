import React from 'react';
import replyIcon from '../assets/icons/icon-reply.svg';
import deleteIcon from '../assets/icons/icon-delete.svg';
import editIcon from '../assets/icons/icon-edit.svg';

const CommentHeader = ({id, user, createdAt, deleteComment}) => {
  return (
    <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
            <img src={user.image.png} alt="." className='mr-2' width={30}/>
            <span className='font-medium mr-2'>{user.username}</span>
            <span className='font-normal text-slate-400'>{createdAt}</span>
        </div>
        <div className='flex flex-row'>
          {
            user.username === "juliusomo" ? <div className='flex flex-row items-center space-x-4'>
              <button className='flex flex-row  items-center' onClick={() => deleteComment(id)}><img src={deleteIcon} alt="" className='mr-2'/><span className='text-rose-700 font-medium'>Delete</span></button>
              <button className='flex flex-row  items-center' onClick={() => console.log("")}><img src={editIcon} alt="" className='mr-2'/><span className='text-violet-900 font-medium'>Edit</span></button>
              </div> : 
              <button className='flex flex-row  items-center'><img src={replyIcon} alt="" className='mr-2'/><span className='text-violet-900 font-medium'>Reply</span>
              </button> 
          }         
        </div>
    </div>
  )
}

export default CommentHeader