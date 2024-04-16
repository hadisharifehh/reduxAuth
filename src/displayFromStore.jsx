/**
 * import { useSelector } from "react-redux";

function DisplayFromStore() {
  const articles = useSelector((state) => state.articlesOne);
  return (
    <div>
      <h2>Articles:</h2>
      {articles.map((article, index) => (
        <div key={index}>
          <div>{article.title}</div>
          <div>{article.content}</div>
        </div>
      ))}
    </div>
  );
}

export default DisplayFromStore;

 */
