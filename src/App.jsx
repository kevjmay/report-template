import React, { useState } from 'react';
import './App.css';
import CSVSubmit from './components/CSVSubmit';
import Modal from './components/Modal';
import Report from './components/Report';
import { useCsvData } from './components/useCsvData'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { csv, loading, error} = useCsvData()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  console.log(csv)

  return (
    <div className="flex justify-center items-center bg-gray-100 p-8">
      <div className='flex justify-center items center border border-gray-300 h-30px rounded-lg p-4'>
        <CSVSubmit />
        <button
          onClick={() => setIsModalOpen(true)}
          className='w-auto text-sm
          mr-4 py-2 px-4 rounded-md
          border-2 border-purpleCustom text-sm font-semibold
          bg-purpleCustom text-white
          hover:bg-purpleCustom appearance-none'
        >
          Preview Report
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Report csvData={csv} />
      </Modal>
    </div>
  );
}

export default App;
