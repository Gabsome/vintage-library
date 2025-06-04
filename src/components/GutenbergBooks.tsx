import React, { useEffect, useState } from 'react';

interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
}

export default function GutenbergBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://gutendex.com/books')
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books from Project Gutenberg...</p>;
  if (error) return <p>Error loading books: {error}</p>;

  return (
    <div>
      <h2>Project Gutenberg Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.authors.map(a => a.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
