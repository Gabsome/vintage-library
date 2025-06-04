// src/UploadBook.tsx
import { useState, useRef } from 'react';
import { Widget } from '@uploadcare/react-widget';

interface Book {
  id: string;
  title: string;
  fileUrl: string;
}

const UploadBook = () => {
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const widgetRef = useRef<any>(null);

  const handleUploadComplete = (fileInfo: any) => {
    if (!fileInfo) return;

    setUploading(true);

    fileInfo.done(async (file: any) => {
      setFileUrl(file.cdnUrl);
      setUploading(false);
      alert('File uploaded successfully!');
      // Optionally auto-submit after upload:
      // await submitBook(title, file.cdnUrl);
      // clearForm();
    });
  };

  const clearForm = () => {
    setTitle('');
    setFileUrl(null);
    if (widgetRef.current) {
      widgetRef.current.value(null);
    }
  };

  const submitBook = async (bookTitle: string, url: string) => {
    if (!bookTitle || !url) return;

    try {
      // Call your backend API to save book info
      const response = await fetch('/api/books/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: bookTitle, fileUrl: url }),
      });

      if (response.ok) {
        alert('Book info saved successfully!');
        // Add the new book locally to the list with a generated id
        setBooks((prevBooks) => [
          ...prevBooks,
          { id: Date.now().toString(), title: bookTitle, fileUrl: url },
        ]);
        clearForm();
      } else {
        alert('Failed to save book info.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert('Please provide a title.');
      return;
    }
    if (!fileUrl) {
      alert('Please upload a file.');
      return;
    }

    setUploading(true);
    await submitBook(title, fileUrl);
    setUploading(false);
  };

  // Delete a book from local list
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      // TODO: Call backend API to delete book by ID once implemented
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload a Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          disabled={uploading}
        />

        <Widget
          publicKey="cb2ddbdec0cd01373ea6" // replace with your Uploadcare public key
          onChange={handleUploadComplete}
          clearable
          ref={widgetRef}
          disabled={uploading}
        />

        <button
          type="submit"
          disabled={uploading || !title || !fileUrl}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Save Book'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="font-bold mb-2">Your Uploaded Books</h3>
        {books.length === 0 && <p>No books uploaded yet.</p>}
        <ul>
          {books.map((book) => (
            <li
              key={book.id}
              className="mb-3 flex justify-between items-center border p-2 rounded"
            >
              <a
                href={book.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {book.title}
              </a>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadBook;
