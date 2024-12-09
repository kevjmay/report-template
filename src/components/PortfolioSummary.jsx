import React from 'react'
import { useCsvData } from './useCsvData';

const currentDate = new Date();
const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
console.log(formattedDate);

function PortfolioSummary() {

  const { csv, loading, error } = useCsvData()

  if (loading) return <p>Loading CSV data...</p>;

  // If there's an error, display an error message
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Ensure there's data in the CSV
  if (!csv || csv.length === 0) return <p>No data available.</p>;

  const agentName = csv[0].name

  return (
    <div className='text-redCustom bg-white p-6 rounded-b-xl shadow-lg'>
      <div className='flex justify-between p-2'>
        <h1 className='text-3xl font-semibold font-sans'>Portfolio Summary</h1>
        <div className='text-right'>
          <h2 className='text-2xl font-semibold font-sans'>{agentName}</h2>
          <h3 className='font-semibold font-sans'>Download created: {formattedDate}</h3>
        </div>
      </div>
      <hr className='border-t-1 border-redCustom my-2'/>
      <p className='text-sm mt-4 font-sans'>
        This document contains the total Electric and Gas usage overview made
        by your portfolio against the total allowance outlined by us for the same period.
      </p>
    </div> 
  )
}

export default PortfolioSummary