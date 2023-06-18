import Book from './Book';
import { BookData } from '../store/slices/booksSlice';

interface BookShelfProps {
  books: BookData[];
  shelf: string;
}

const BookShelf = ({ books, shelf }: BookShelfProps) => {
  return (
    <div className="bookshelf" data-testid={shelf}>
      <h2 className="bookshelf-title">{shelf}</h2>
      {books.length===0? (<p data-testid="noBooksAdded"> No Books added in {shelf} shelf yet.</p>):( <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          ))}
        </ol>
      </div>)}
     
    </div>
  );
};


export default BookShelf;
