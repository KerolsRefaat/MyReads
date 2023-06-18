import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import Book from "./Book";
import { RootState } from "../store/store" // Import RootState from your store
import { BookData } from "../store/slices/booksSlice";
import { booksSliceActions } from "../store/slices/booksSlice";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";


const SearchPage = () => {
  const [userInput, setUserInput] = useState<string>("");
  const dispatch=useDispatch();
  const showSearchPage = useSelector((state: RootState) => state.books.searchedTheBooks);
  const searchBooksHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      BooksAPI.search(event.target.value, 20).then((data: BookData[]) => {
        dispatch(booksSliceActions.searchTheBooks(data));
      });
    } else {
      dispatch(booksSliceActions.searchTheBooks());
    }
    setUserInput(event.target.value);
  };

  console.log(userInput + " kero");

  return (
    <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                  data-testid="searchInput"
                  value={userInput}
                    type="text"
                    placeholder="Search by title or author"
                    onChange={searchBooksHandler}
                    />
                </div>
              </div>
              <div className="search-books-results">
              <ol className="books-grid">
                {showSearchPage.map((b : BookData) => (
                <li key={b.id}>
                <Book book={b} />
                </li>
                 ))}
              </ol>
          </div>
      </div>
  );
};

export default SearchPage;

