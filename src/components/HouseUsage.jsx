import React from 'react'

function HouseUsage({ row }) {

  const parseDate = (dateString) => {
    // Split the string at the comma and take the first part (if any)
    const datePart = dateString.split(',')[0].trim(); 
    const [day, month, year] = datePart.split('/').map(Number); // Split and convert to numbers
    return new Date(year, month - 1, day); // Month is zero-based in JavaScript
  };

  // Helper function to determine styles for the percentage value
  const getPercentageStyle = (percentage) => {
    return percentage > 0
      ? 'text-red-500 font-bold' // Red and bold if above 0
      : '';
  };

  // Parse dates for this row
  const electricReadingDate = parseDate(row.latestMeterReadingDateElectric);
  const gasReadingDate = parseDate(row.latestMeterReadingDateGas);

  // Calculate values
  const percentageElectric = ((row.electricUsage / row.electricAllowance * 100) - 100).toFixed(2);
  const previousReadElectric = Math.floor((Date.now() - electricReadingDate.getTime()) / (1000 * 60 * 60 * 24));

  const percentageGas = ((row.gasUsage / row.gasAllowance * 100) - 100).toFixed(2);
  const previousReadGas = Math.floor((Date.now() - gasReadingDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
      <div className="bg-white border border-purpleCustom w-full mt-2 rounded-xl">
        {/* House Details Section */}
        <div className='flex justify-between items-center bg-white text-purpleCustom m-3'>
          <h2 className='text-md font-semibold'>{row.address}</h2>
          <div className='text-right text-sm '>
            <h3>{row.bedSize + ' Bedroom'}</h3>
            <h3>End Date: {row.endDate}</h3>
          </div>
        </div>
        <hr className='border-t-1 border-purpleCustom mx-4' />

        {/* Electric Meter Section */}
        <div className="flex justify-end h-full">
          <ul className='grid grid-cols-2 w-1/3 p-3'>
            <li className='text-purpleCustom text-sm ml-2'>Electric Meter ({row.serialElectric})</li>
          </ul>
          <ul className="grid grid-cols-7 gap-4 w-2/3 text-purpleCustom text-xs p-3">
            <li className="flex items-center text-center">{row.initialMeterReadingElectric}</li>
            <li className="flex items-center text-center">{row.latestMeterReadingElectric}</li>
            <li className="flex items-center text-center">{row.latestMeterReadingTypeElectric}</li>
            <li className="flex items-center text-center">{row.electricUsage}</li>
            <li className="flex items-center text-center">{row.electricAllowance}</li>
            <li className={`flex items-center text-center ${getPercentageStyle(percentageElectric)}`}>
              {percentageElectric}%
            </li>
            <li className="flex items-center text-center">{previousReadElectric}</li>
          </ul>
        </div>
        <hr className='border-t-1 border-purpleCustom mx-6' />

        {/* Gas Meter Section */}
        <div className="flex justify-end h-full">
          <ul className='grid grid-cols-2 w-1/3 p-3'>
            <li className='text-purpleCustom text-sm ml-2'>Gas Meter ({row.serialGas})</li>
          </ul>
          <ul className="grid grid-cols-7 gap-4 w-2/3 text-purpleCustom text-xs p-3">
            <li className="flex items-center text-center">{row.initialMeterReadingGas}</li>
            <li className="flex items-center text-center">{row.latestMeterReadingGas}</li>
            <li className="flex items-center text-center">{row.latestMeterReadingTypeGas}</li>
            <li className="flex items-center text-center">{row.gasUsage}</li>
            <li className="flex items-center text-center">{row.gasAllowance}</li>
            <li className={`flex items-center text-center ${getPercentageStyle(percentageGas)}`}>
              {percentageGas}%
            </li>
            <li className="flex items-center text-center">{previousReadGas}</li>
          </ul>
        </div>
      </div>
  );
}

export default HouseUsage;


