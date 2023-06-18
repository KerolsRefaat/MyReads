import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import BookList from "../Components/BookList";
import * as BooksAPI from "../BooksAPI";
import store from "../store/store";

jest.mock("../BooksAPI");

describe("BookList", () => {
  beforeEach(() => {
    (BooksAPI.getAll as jest.Mock).mockResolvedValue([
      {
        id: "1",
        title: "Test Book 1",
        shelf: "currentlyReading",
      },
      {
        id: "2",
        title: "Test Book 2",
        shelf: "wantToRead",
      },
      {
        id: "3",
        title: "Test Book 3",
        shelf: "read",
      },
    ]);
  });

  test("renders loading message initially", () => {
    render(
      <Provider store={store}>
        <BookList />
      </Provider>
    );
    expect(screen.getByText("Loading all the required books.")).toBeInTheDocument();
  });
});
