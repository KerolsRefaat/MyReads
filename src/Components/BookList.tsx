import { Fragment, useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { BookData, booksSliceActions } from "../store/slices/booksSlice";
import * as BooksAPI from "../BooksAPI";
import "../App.css";


const BookList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data: BookData[] = await BooksAPI.getAll();
      dispatch(booksSliceActions.gettingBooks(data));
      setIsLoading(false);
    };
    fetchData();


  }, [dispatch,isLoading]);

  const books = useSelector((state:RootState)=>state.books.allBooks)
  

  const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (

    (isLoading?(<div className="loader">
            <h3>Loading all the required books.</h3>
      <div className="spin-loader">
      </div>
      </div>):( <Fragment>
      <BookShelf shelf="Currently Reading" books={currentlyReading} />
      <BookShelf shelf="Want To Read" books={wantToRead} />
      <BookShelf shelf="Read" books={read} />
    </Fragment>))
  
  );
};

export default BookList;
