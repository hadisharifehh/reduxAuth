import { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticleOne } from "./Redux/reducers/articleSliceOne";
import { addArticleTwo } from "./Redux/reducers/articleSliceTwo";

function DispatchToStore() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleTwo, setTitleTwo] = useState("");
  const [contentTwo, setContentTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addArticleOne({ title, content }));
    setTitle("");
    setContent("");
  };
  const handleSubmitTwo = (e) => {
    e.preventDefault();
    dispatch(addArticleTwo({ titleTwo, contentTwo }));
    setTitleTwo("");
    setContentTwo("");
  };
  return (
    <div>
      <h1>Article Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            cols={100}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <h1>Article Form two</h1>
      <form onSubmit={handleSubmitTwo}>
        <div>
          <label>Title:</label>
          <input
            type='text'
            value={titleTwo}
            onChange={(e) => setTitleTwo(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            cols={100}
            rows={10}
            value={contentTwo}
            onChange={(e) => setContentTwo(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default DispatchToStore;
