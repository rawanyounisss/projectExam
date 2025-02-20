import React, { useEffect, useState } from "react";
import { articles } from "../../Articles";
import "./SearchComponent.css";
const SearchComponent = () => {
  const [wordSearched, setWordSearched] = useState("");

  let articlesWithWordSearched = articles.filter(
    (article) =>
      article.title
        .toLocaleLowerCase()
        .includes(wordSearched.toLocaleLowerCase()) ||
      article.parag
        .toLocaleLowerCase()
        .includes(wordSearched.toLocaleLowerCase())
  );
  const highlightedWord = (content) => {
    const wordRegex = new RegExp(`(${wordSearched})`, "gi");
    return content.split(wordRegex).map((ele, i) =>
      ele.toLocaleLowerCase() === wordSearched.toLocaleLowerCase() ? (
        <span key={i} className="highlitedWord">
          {ele}
        </span>
      ) : (
        ele
      )
    );
  };

  return (
    <div className="container">
      <h1>Search</h1>
      <div className="searchContainer">
        <input type="text" onChange={(e) => setWordSearched(e.target.value)} />
      </div>
      {wordSearched != "" && (
        <p className="postsNumber">
          <strong> {articlesWithWordSearched.length}</strong>
          {articlesWithWordSearched.length > 1 ? (
            <strong> posts</strong>
          ) : (
            <strong>post </strong>
          )}
          {articlesWithWordSearched.length > 1 ? " were found" : " was found"}
        </p>
      )}
      {wordSearched === ""
        ? articles.map((article) => (
            <div className="articleContainer" key={article.id}>
              <h3 className="articleTitle">{article.title}</h3>
              <i className="articleDate">{article.date}</i>
              <p className="articleParag">{article.parag}</p>
            </div>
          ))
        : articlesWithWordSearched.map((article) => (
            <div className="articleContainer" key={article.id}>
              <h3 className="articleTitle">{highlightedWord(article.title)}</h3>
              <i className="articleDate">{article.date}</i>
              <p className="articleParag">{highlightedWord(article.parag)}</p>
            </div>
          ))}
    </div>
  );
};

export default SearchComponent;
