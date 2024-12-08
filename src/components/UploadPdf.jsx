import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(url, key);

function UploadPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadPdf = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: uploadError } = await supabase.storage
        .from('reportpdf')
        .upload(`${Date.now()}.pdf`, file);

      if (uploadError) {
        throw uploadError;
      }

      console.log('PDF uploaded successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to upload the PDF file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex'>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className='w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-2 file:border-redCustom file:text-sm file:font-semibold
          file:bg-redCustom file:text-white
          hover:file:bg-purple-50'
        />
      <button 
        onClick={uploadPdf} 
        disabled={loading}
        className='w-auto text-sm
          mr-4 py-2 px-4 rounded-md
          border-2 border-redCustom text-sm font-semibold
          bg-redCustom text-white
          hover:bg-redCustom appearance-none'
        >
        {loading ? 'Uploading...' : 'Upload PDF'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default UploadPdf;