import "./App.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';
import CommentList from "./Components/CommentList";
import AddComment from "./Components/AddComment";
import { type } from "@testing-library/user-event/dist/type";



// const fetchData = async () => {
//   const res = await fetch('./data.json');
//   const data = await res.json();
//   return data.comments;
// };
const store = () => {
  let comments = localStorage.getItem("comments");
  if (comments) {
    return JSON.parse(localStorage.getItem("comments"));
  } else {
    return [];
  }
};
function App() {
  // const [comments, setComments] = useLocalStorage("comments", null);

  const[comments, setComments] = useState(store);

  const getData = async () => {
    try {
      const res = await fetch("./data.json");
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    localStorage.getItem('comments') !== null ? setComments(JSON.parse(localStorage.getItem('comments'))) : getData();
  }, []);


  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComments = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
  };

  const commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];
    if(type === "comment"){
      updatedComments = updatedComments.filter((comment) => {
        return comment.id !== id;
      })
    }else{
      updatedComments.forEach((comment) => {
        if(comment.id === parentComment){
          comment.replies = comment.replies.filter((reply) => reply.id !== id);
        }
      })
    }

    setComments(updatedComments);
    // const newComments = comments.filter((comment) => {
    //   return comment.id !== id;
    // });
    // setComments(newComments);
  };

  const commentUpdate = (id, type, newContent, parentComment) => {
    let updatedComments = [...comments];
    if(type === "comment"){
      updatedComments.forEach((data) => {
        if(data.id == id){
          data.content = newContent;
        }
      })
    }else{
      updatedComments.forEach((comment) => {
        if(comment.id == parentComment){
          comment.replies.forEach((reply) => {
            if(reply.id == id){
              reply.content = newContent;
            }
          })
        }
      })
    }
    
    setComments(updatedComments);
  }

  const updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if(data.id === id){
        data.replies = replies;
      }
    });
    setComments(updatedComments);
  }

  return (
    <div className="bg-slate-200 min-h-screen pt-3 flex flex-col justify-center items-center w-full">
      <CommentList comments={comments} commentDelete={commentDelete} commentUpdate={commentUpdate} updateReplies={updateReplies}/>
      <AddComment addComments={addComments}/>
    </div>
  );
}

export default App;
