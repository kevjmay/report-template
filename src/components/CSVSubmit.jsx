import React from 'react';
import { useCsvData } from './useCsvData';

function CSVSubmit() {
  const { csv, loading, error, uploadCsv } = useCsvData();

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      uploadCsv(file);
    }
  }

  return (
    <div>
      <form>
        <input
          type="file"
          id="file"
          name="file"
          accept=".csv"
          onChange={handleFileUpload}
          className='block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-2 file:border-purpleCustom file:text-sm file:font-semibold
          file:bg-purpleCustom file:text-white
          hover:file:bg-purple-50'
        />
      </form>
    </div>
  );
}

export default CSVSubmit;
