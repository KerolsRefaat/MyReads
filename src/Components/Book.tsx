import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { booksSliceActions } from "../store/slices/booksSlice";
import * as BooksAPI from "../BooksAPI";
import { BookData } from "../store/slices/booksSlice";


export interface BookProps {
  book: BookData;
}

const Book = ({ book }: BookProps) => {
  const dispatch = useDispatch();
  const { imageLinks , shelf = "none", title, authors } = book;

  const [selectedShelf, setSelectedShelf] = useState<string>(shelf);

  const thumbnail =
    imageLinks? imageLinks.thumbnail:
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

  const changeShelfHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newShelf = event.target.value;
    setSelectedShelf(newShelf);
    dispatch(booksSliceActions.updatingBooks({ book, newShelf }));
    BooksAPI.update(book, newShelf);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            defaultValue={selectedShelf}
            onChange={changeShelfHandler}
            data-testid="changeShelf"
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(", ")}</div>
    </div>
  );
};

export default Book;
