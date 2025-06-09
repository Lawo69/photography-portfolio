'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a file.');

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadToast = toast.loading('Uploading file...');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          imageUrl: data.secure_url,
        }),
      });

      toast.success('Upload complete!', { id: uploadToast });

      // Reset form
      setFile(null);
      setTitle('');
      setCategory('');
      (document.getElementById('upload-form') as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black px-4'>
      <Toaster position="top-center" />
      <form
        id="upload-form"
        onSubmit={handleSubmit}
        className='bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-sm space-y-4'
      >
        <h2 className="text-xl font-semibold text-center">Upload Image</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded px-3 py-2"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border bg-gray-900 rounded px-3 py-2"
          required
        >
          <option value="">Select category</option>
          <option value="product">Product</option>
          <option value="interior">Interior</option>
          <option value="nature">Nature</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white cursor-pointer py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          disabled={uploading}
        >
          {uploading && <ReloadIcon className="animate-spin" />}
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
