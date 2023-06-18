import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import * as BooksAPI from "../BooksAPI";
import { configureStore } from '@reduxjs/toolkit';
import { BookData, booksSlice } from '../store/slices/booksSlice';
import { BrowserRouter as Router } from "react-router-dom";
import Book from '../Components/Book';

jest.mock("../BooksAPI");

const mockStore = configureStore({
    reducer: {
      books: booksSlice.reducer,
    },
});

const book:BookData = {
    id: '1',
    title: 'Test Book',
    authors: ['Test Author'],
    shelf: 'read',
    imageLinks: {
      thumbnail: 'https://test.com/test.jpg',
    },
  };

describe("SearchPage Testing Cases", () => {
  let mockSearch: jest.MockedFunction<typeof BooksAPI.getAll>;

  beforeEach(() => {
    mockSearch = BooksAPI.search as jest.MockedFunction<typeof BooksAPI.getAll>;
    render(
      <Provider store={mockStore}>
        <Router>
          <Book book={book} />
        </Router>
      </Provider>
    );
  });

  test("renders without crashing", () => {
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
     });

  test("calls the search API when the user types in the search box then updates UI", async () => {
   
    fireEvent.change(screen.getByTestId('changeShelf'), {
        target: { value: 'currentlyReading' },
      });
  
      await waitFor(() => {
        expect(BooksAPI.update).toHaveBeenCalledWith(book, 'currentlyReading');
  });
});
});