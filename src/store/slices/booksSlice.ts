import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookData {
  id: string;
  shelf?: string;
  imageLinks?:any,
  title?:string,
  authors?:string[]
}

export interface BooksState {
  allBooks: BookData[];
  searchedTheBooks: BookData[];
}

const initialState: BooksState = { allBooks: [], searchedTheBooks: []};

export const booksSlice = createSlice({
  name: "BooksSlice",
  initialState,
  reducers: {
    gettingBooks(state: BooksState, action: PayloadAction<BookData[]>) {
      if (state.allBooks.length === 0) {
        action.payload.forEach((book) => {
          state.allBooks.push(book);
        });
      }
    },
    updatingBooks(
      state: BooksState,
      action: PayloadAction<{ book: BookData; newShelf: string }>
    ) {
      const { book, newShelf } = action.payload;
      const index = state.allBooks.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        state.allBooks[index].shelf = newShelf;
      }
      if (state.searchedTheBooks) {
        state.searchedTheBooks.forEach((searchBook) => {
          if (searchBook.id === book.id) {
            searchBook.shelf = newShelf;
          }
          if (
            searchBook.shelf &&
            !state.allBooks.find((item) => item.id === searchBook.id)
          ) {
            state.allBooks.push(searchBook);
          }
        });
      }
    },
    searchTheBooks(state: BooksState, action: PayloadAction<BookData[] | undefined >) {
      if (action.payload && !("error" in action.payload)) {
        state.searchedTheBooks = action.payload.map((searchBook) => {
          const existingBook = state.allBooks.find(
            (book) => book.id === searchBook.id
          );
          if (existingBook) {
            searchBook.shelf = existingBook.shelf;
          }
          return searchBook;
        });
      } else {
        state.searchedTheBooks = [];
      }

    },
  },
});

export const booksSliceActions = booksSlice.actions;
