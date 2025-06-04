// src/UploadBook.tsx
import { useState } from 'react';
import { Widget } from '@uploadcare/react-widget';

const UploadBook = () => {
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadComplete = (fileInfo: any) => {
    if (fileInfo) {
      setUploading(true);
      fileInfo.done((file: any) => {
        setFileUrl(file.cdnUrl);
        setUploading(false);
        alert('File uploaded successfully!');
      });
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

    // TODO: send { title, fileUrl } to your backend API here
    try {
      const response = await fetch('/api/books/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, fileUrl }),
      });
      if (response.ok) {
        alert('Book info saved successfully!');
        setTitle('');
        setFileUrl(null);
      } else {
        alert('Failed to save book info.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
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
        />

        <Widget
          publicKey="cb2ddbdec0cd01373ea6" // replace with your Uploadcare public key
          onChange={handleUploadComplete}
          clearable
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          {uploading ? 'Uploading...' : 'Save Book'}
        </button>
      </form>
    </div>
  );
};

export default UploadBook;
