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

  return (
    <div className="bg-slate-200 min-h-screen pt-3 flex flex-col justify-center items-center">
      <CommentList comments={comments}/>
      <AddComment/>
    </div>
  );
}

export default App;
