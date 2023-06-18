import React from "react";
import { Routes, Link, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import SearchPage from "./Components/SearchPage";
import Header from "./Components/Header";
import { booksSliceActions } from "./store/slices/booksSlice";
import BookList from "./Components/BookList";


const App: React.FC = () => {
  const dispatch = useDispatch();

  const addHandler=()=>{
    dispatch(booksSliceActions.searchTheBooks([]));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
 <div className="list-books-content">
              <Header />
             <BookList />
            
            </div>
             <div className="open-search">
             <Link to="/search">
               <button onClick={addHandler}>Add a book</button>
             </Link>
           </div>
            </div>
           
          }
        ></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;