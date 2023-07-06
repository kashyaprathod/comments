import "./App.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from 'usehooks-ts';
import CommentList from "./Components/CommentList";
import AddComment from "./Components/AddComment";



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
  const [currentUser, setCurrentUser] = useState();

  const getData = async () => {
    try {
      const res = await fetch("./data.json");
      const data = await res.json();
      setComments(data.comments);
      setCurrentUser(data.currentUser);
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

  const deleteComment = (id) => {
    const newComments = comments.filter((comment) => {
      return comment.id !== id;
    });
    setComments(newComments);
  };

  const editComment = (content, id) => {
    const updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if(data.id == id){
        data.content = content;
      }
    })
    setComments(updatedComments);
  }

  return (
    <div className="bg-slate-200 min-h-screen pt-3 flex flex-col justify-center items-center">
      <CommentList comments={comments} deleteComment={deleteComment} editComment={editComment}/>
      <AddComment addComments={addComments} user = {currentUser}/>
    </div>
  );
}

export default App;
