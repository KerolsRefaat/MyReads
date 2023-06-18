import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import SearchPage from "../Components/SearchPage"
import * as BooksAPI from "../BooksAPI";
import { configureStore } from '@reduxjs/toolkit';
import { booksSlice } from '../store/slices/booksSlice';
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../BooksAPI");

const mockStore = configureStore({
    reducer: {
      books: booksSlice.reducer,
    },
});

describe("SearchPage Testing Cases", () => {
  let mockSearch: jest.MockedFunction<typeof BooksAPI.search>;

  beforeEach(() => {
    mockSearch = BooksAPI.search as jest.MockedFunction<typeof BooksAPI.search>;
    render(
      <Provider store={mockStore}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    );
  });

  test("renders without crashing", () => {
    expect(screen.getByTestId("searchInput")).toBeInTheDocument();
  });

  test("calls the search API when the user types in the search box then updates UI", async () => {
    const mockData = [{ id: "1", title: "React Book", authors: ["Kerols Refaat"] }];
    mockSearch.mockResolvedValueOnce(mockData);

    fireEvent.change(screen.getByTestId("searchInput"), { target: { value: "React" } });

    await waitFor(() => expect(mockSearch).toHaveBeenCalledWith("React", 20));
    expect(screen.getByText("React Book")).toBeInTheDocument();
    expect(screen.getByText("Kerols Refaat")).toBeInTheDocument();
  });
});
